const { axiosGet } = require('./public/helpers/axiosHelpers.js');

const {
    getFirstColFrmTwoColArray,
    listCompanies,
    companyFrequency,
    sortFreqLargeToSmall,
    findCompanyJobs,
    findAllJobs,
    findAllJobsAndAttributes
} = require('./public/helpers/sortingFunctions.js');


const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
app.use(express.static('./public'));
app.use(expressLayouts);

app.set('layout', 'layouts/full-width');
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
const jobURL = 'https://4dayweek.io/api';

app.get('/', async (request, response) => {
    const apiJobResp = await axiosGet(jobURL);    
    const verboseCompanyArray = listCompanies(apiJobResp.jobs);
    const uniqueCompanyArray = [... new Set(verboseCompanyArray)];
    const sortedUniqueCompanyArray = sortFreqLargeToSmall(companyFrequency(verboseCompanyArray));
    const companyList = getFirstColFrmTwoColArray(sortedUniqueCompanyArray);
    const jobList = findAllJobs(apiJobResp.jobs);

    response.render('jobsHome', {
        title: '4-Day Work Week Careers',
        jobCount: apiJobResp.jobs.length,
        companyCount: uniqueCompanyArray.length,
        companyFreq: sortedUniqueCompanyArray,
        companyList: companyList,
        jobList: jobList
    });
});    

app.get('/company/:company', async (request, response) => {
    const apiJobResp = await axiosGet(jobURL);
    const verboseCompanyArray = listCompanies(apiJobResp.jobs);
    const sortedUniqueCompanyArray = sortFreqLargeToSmall(companyFrequency(verboseCompanyArray));
    const companyList = getFirstColFrmTwoColArray(sortedUniqueCompanyArray);
    const company = (request.params.company);
    const companyJobsArray = findCompanyJobs(company,apiJobResp.jobs);
    const jobList = findAllJobs(apiJobResp.jobs);
   
    response.render('company', {
        title: company,
        jobs: companyJobsArray,
        companyFreq: sortedUniqueCompanyArray,
        companyList: companyList,
        jobList: jobList
    });
}); 

app.get('/jobs/:jobsKeywords', async (request, response) => {
    const apiJobResp = await axiosGet(jobURL);
    const verboseCompanyArray = listCompanies(apiJobResp.jobs);
    const sortedUniqueCompanyArray = sortFreqLargeToSmall(companyFrequency(verboseCompanyArray));
    const companyList = getFirstColFrmTwoColArray(sortedUniqueCompanyArray);
    const searchString = request.params.jobsKeywords;
    const jobList = findAllJobs(apiJobResp.jobs);
    const jobListAndAttributes = findAllJobsAndAttributes(searchString, apiJobResp.jobs);
   
    response.render('jobsKeywords', {
        title: 'Jobs by Keywords',
        searchString: searchString,
        jobList: jobList,
        companyList:companyList,
        jobsAndAttributes: jobListAndAttributes
    });
}); 

app.listen(port, () => {console.log(`server confidently listening to port ${port}`)});

module.exports = app