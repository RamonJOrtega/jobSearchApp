export const sendData = (e) => {
    console.log(e);
}

export const suggestCompany = (companyArray, searchString) => {
    let companiesStartingWithArray = [];
    for (let i = 0; i < companyArray.length; i ++) {
        if (companyArray[i].startsWith(searchString)) {
            companiesStartingWithArray[i] = companyArray[i];
        }
    }
    return companiesStartingWithArray
}