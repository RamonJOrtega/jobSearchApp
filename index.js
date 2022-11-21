import {
    listCompanies,
    companyFrequency,
    sortFreqLargeToSmall,
    findCompanyJobs
} from '.sortingFunctions.js';
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

// GET route for profile page
app.get('/', async (request, response) => {
    const apiJobResp = await axiosGet(jobURL);
    verboseCompanyArray = sort.listCompanies(apiJobResp.jobs);
    uniqueCompanyArray = [... new Set(verboseCompanyArray)];
    sortedUniqueCompanyArray = sort.sortFreqLargeToSmall(sort.companyFrequency(verboseCompanyArray));
    response.render('jobsHome', {
        title: '4-Day Work Week Careers',
        jobCount: apiJobResp.jobs.length,
        companyCount: uniqueCompanyArray.length,
        companyFreq: sortedUniqueCompanyArray,
     });
    });    

app.get('/company/:company', async (request, response) => {
    const apiJobResp = await axiosGet(jobURL);
    verboseCompanyArray = sort.listCompanies(apiJobResp.jobs);
    uniqueCompanyArray = [... new Set(verboseCompanyArray)];
    company = (request.params.company);
    jobsArray = sort.findCompanyJobs(company,apiJobResp.jobs);
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