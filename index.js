import {
    listCompanies,
    companyFrequency,
    sortFreqLargeToSmall,
    findCompanyJobs
} from '.sortingFunctions.js';
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const { name } = require('ejs');
const { axiosGet } = require('./helpers/axiosHelpers')
const {companyFrequency, listCompanies } = require('./helpers/utils.js')

app.use(express.static(__dirname + '/public/css'));
app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');

const port = 8001;
const jobURL = 'https://4dayweek.io/api';

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