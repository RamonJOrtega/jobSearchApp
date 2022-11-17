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

const listCompanies = (array) => {
    companyArray=[];
    for (let i = 0; i < array.length; i++) {
        companyArray[i] = array[i].company_name;
    }
    // to make unique
    //companyArray = [... new Set(companyArray)]
    return companyArray;
}

module.exports = { companyFrequency, listCompanies }