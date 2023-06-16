

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

const port = 8001;
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
    }, (err, renderedHtml) => {
        if (err) {
          console.error(`Error rendering EJS file: ${err}`);
          response.status(500).send('Internal Server Error');
          return;
        }
    
        // Write the rendered HTML to a temporary file
        const tempHtmlFilePath = 'temp.html';
        fs.writeFile(tempHtmlFilePath, renderedHtml, 'utf8', (err) => {
          if (err) {
            console.error(`Error writing temporary HTML file: ${err}`);
            response.status(500).send('Internal Server Error');
            return;
          }
    
          // Send the temporary HTML file as the response
          response.sendFile(tempHtmlFilePath, (err) => {
            if (err) {
              console.error(`Error sending HTML file: ${err}`);
              response.status(500).send('Internal Server Error');
            }
    
            // Delete the temporary HTML file after sending
            fs.unlink(tempHtmlFilePath, (err) => {
              if (err) {
                console.error(`Error deleting temporary HTML file: ${err}`);
              }
            });
          });
        });
      })
    
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

function convertEjsToHtml(ejsFilePath, data, outputHtmlFilePath) {
  // Read the EJS file
  fs.readFile(ejsFilePath, 'utf8', (err, ejsTemplate) => {
    if (err) {
      console.error(`Error reading EJS file: ${err}`);
      return;
    }

    // Render the EJS template with the provided data
    const renderedHtml = ejs.render(ejsTemplate, data);

    // Write the rendered HTML to the output file
    fs.writeFile(outputHtmlFilePath, renderedHtml, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing HTML file: ${err}`);
        return;
      }
      console.log(`HTML file "${outputHtmlFilePath}" has been created.`);
    });
  });
}

module.exports = app