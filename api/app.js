import { getFirstColFrmTwoColArray, listCompanies, companyFrequency,
    sortFreqLargeToSmall, findCompanyJobs} from '../helpers/sortingFunctions.js';
import express from 'express';
import { axiosGet } from '../helpers/axiosHelpers.js';

const app = express();
const jobURL = 'https://4dayweek.io/api';

console.log("in api")


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

 export default app