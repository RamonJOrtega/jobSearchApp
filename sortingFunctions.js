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
    return freqArray;
}
const sortFreqLargeToSmall = (freqArray) => {
    return freqArray.sort((a,b) => b[1]-a[1]);
}

const findCompanyJobs = (company, jobObject) => {
    let jobArray = [];
    for (let i=0; i < jobObject.length; i++) {
        if (company == jobObject[i].company_name) {
        jobArray.push([
            jobObject[i].title, 
            jobObject[i].company.country,
            jobObject[i].company.remote_level,
            jobObject[i].company.logo_url,
            jobObject[i].url
        ]);
        } 
    }
    console.log(jobArray);
    return jobArray;
}

export default {
    listCompanies,
    companyFrequency,
    sortFreqLargeToSmall,
    findCompanyJobs
}


