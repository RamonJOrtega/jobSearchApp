const {
    getFirstColFrmTwoColArray,
    listCompanies,
    companyFrequency,
    sortFreqLargeToSmall,
    findCompanyJobs,
} = require('./helpers/sortingFunctions.js');
const { axiosGet } = require('./helpers/axiosHelpers.js');

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
app.use(express.static('./public'));
app.use(expressLayouts);

app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');

const jobURL = 'https://4dayweek.io/api';

app.get('/', async (request, response) => {
    const apiJobResp = await axiosGet(jobURL);
    const verboseCompanyArray = listCompanies(apiJobResp.jobs);
    const uniqueCompanyArray = [... new Set(verboseCompanyArray)];
    const sortedUniqueCompanyArray = sortFreqLargeToSmall(companyFrequency(verboseCompanyArray));
    const companyList = getFirstColFrmTwoColArray(sortedUniqueCompanyArray);
    
    response.render('jobsHome', {
        title: '4-Day Work Week Careers',
        jobCount: apiJobResp.jobs.length,
        companyCount: uniqueCompanyArray.length,
        companyFreq: sortedUniqueCompanyArray,
        companyList: companyList
    });
    
});    

app.get('/company/:company', async (request, response) => {
    const apiJobResp = await axiosGet(jobURL);
    const verboseCompanyArray = listCompanies(apiJobResp.jobs);
    const uniqueCompanyArray = [... new Set(verboseCompanyArray)];
    const sortedUniqueCompanyArray = sortFreqLargeToSmall(companyFrequency(verboseCompanyArray));
    const companyList = getFirstColFrmTwoColArray(sortedUniqueCompanyArray);
    const company = (request.params.company);
    const jobsArray = findCompanyJobs(company,apiJobResp.jobs);
   
    response.render('company', {
        title: company,
        jobs: jobsArray,
        companyFreq: sortedUniqueCompanyArray,
        companyList: companyList
    });
}); 

app.listen(process.env.PORT || 3000, () => {console.log('server confidently listening')});

module.exports = app