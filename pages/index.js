import { getFirstColFrmTwoColArray, listCompanies, companyFrequency,
        sortFreqLargeToSmall, findCompanyJobs} from './helpers/sortingFunctions.js';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { axiosGet } from './helpers/axiosHelpers.js';
import next from 'next';

//import { nextConfig } from '../next.config';

//next.config.js
// export default {
//     future: {webpack5: true,},
//     webpack(config) {
//       config.resolve.fallback = {...config.resolve.fallback, fs: false, net: false};
//       return config;
//     },
//   };

    const app = express();
    app.use(express.static('./public'));
    app.use(expressLayouts);
    app.set('layout', './layouts/full-width');
    app.set('view engine', 'ejs');

    const port = 3001;
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

    app.listen(port, () => {console.log(`confidently listening to port ${port}`)});

    export default app