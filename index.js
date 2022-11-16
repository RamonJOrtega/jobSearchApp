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
    sortedFreqArray = freqArray.sort((a,b) => b[1]-a[1]);
    return sortedFreqArray;
}

app.get('/', async (request, response) => {
    const jobURL = 'https://4dayweek.io/api';
    const apiJobResp = await axiosGet(jobURL);
    verboseCompanyArray = listCompanies(apiJobResp.jobs)
    uniqueCompanyArray = [... new Set(verboseCompanyArray)]
    response.render('jobs', {
        title: '4-Day Work Week Careers',
        jobCount: apiJobResp.jobs.length,
        companyCount: uniqueCompanyArray.length,
        companyFreq: companyFrequency(verboseCompanyArray)
     });
    });    

app.get('/number/:int', async (request, response) => {
    
    response.render('number', {
    title: 'placeholder'

    });

});

app.listen(port, () => {
    console.log(`listening to the smooth sounds of port ${port}`);
});