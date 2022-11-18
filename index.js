const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const { name } = require('ejs');
app.use(express.static(__dirname + '/public/css'));
app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');

const port = 8001;
const jobURL = 'https://4dayweek.io/api';

const axiosGet = async (url) => {
    console.log('The URL call is \n', url);
    try {
        const response = await axios.get(url);
        return response.data;
    }
        catch (err) { 
            console.log("Axios Error: " + err);     
        }
}

const listCompanies = (array) => {
    companyArray=[];
    for (let i = 0; i < array.length; i++) {
        companyArray[i] = array[i].company_name;
    }
    // to make unique
    //companyArray = [... new Set(companyArray)]
    return companyArray;
}
 
const companyFrequency = (jobArray) => {
    let counter = {};
    for (element of jobArray) {
        if (counter[element]) {
            counter[element] += 1;
        } else {
            counter[element] = 1;
        }
    };
    const freqArray = Object.entries(counter);
    return freqArray;
}
const sortFreqLargeToSmall = (freqArray) => {
    return freqArray.sort((a,b) => b[1]-a[1]);
}

const findCompanyJobs = (company, jobObject) => {
    let jobArray = [];
    for (let i=0; i < jobObject.length; i++) {
        if (company == jobObject[i].company_name) {
        jobArray.push([
            jobObject[i].title, 
            jobObject[i].company.country,
            jobObject[i].company.remote_level,
            jobObject[i].company.logo_url,
            jobObject[i].url
        ]);
        } 
    }
    console.log(jobArray);
    return jobArray;
}



// GET route for profile page
app.get('/', async (request, response) => {
    const apiJobResp = await axiosGet(jobURL);
    verboseCompanyArray = listCompanies(apiJobResp.jobs);
    uniqueCompanyArray = [... new Set(verboseCompanyArray)];
    sortedUniqueCompanyArray = sortFreqLargeToSmall(companyFrequency(verboseCompanyArray));
    response.render('jobsHome', {
        title: '4-Day Work Week Careers',
        jobCount: apiJobResp.jobs.length,
        companyCount: uniqueCompanyArray.length,
        companyFreq: sortedUniqueCompanyArray,
     });
    });    

app.get('/company/:company', async (request, response) => {
    const apiJobResp = await axiosGet(jobURL);
    verboseCompanyArray = listCompanies(apiJobResp.jobs);
    uniqueCompanyArray = [... new Set(verboseCompanyArray)];
    company = (request.params.company);
    jobsArray = findCompanyJobs(company,apiJobResp.jobs);
    //locationsArray = findJobLocations
   
    response.render('company', {
        title: company,
        jobs: jobsArray,
        //locations: locationsArray
    });

});

app.listen(port, () => {
    console.log(`confidently listening to port ${port}`);
});