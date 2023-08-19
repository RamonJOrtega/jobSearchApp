const {
    getFirstColFrmTwoColArray,
    listCompanies,
    companyFrequency,
    sortFreqLargeToSmall,
    findCompanyJobs,
    findAllJobs
} = require('./public/helpers/sortingFunctions.js');

const { axiosGet } = require('./public/helpers/axiosHelpers.js');

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
    console.log(jobList)
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
    const uniqueCompanyArray = [... new Set(verboseCompanyArray)];
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

app.listen(port, () => {console.log(`server confidently listening to ${port}`)});

module.exports = app