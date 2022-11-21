import {
    listCompanies,
    companyFrequency,
    sortFreqLargeToSmall,
    findCompanyJobs
} from './helpers/sortingFunctions.js';
import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import { axiosGet } from './helpers/axiosHelpers.js'

const app = express();

app.use(express.static('./public/css'));
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