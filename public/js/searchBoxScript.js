const suggest = (searchString, companyCharactersArray, e) => {
    
    let company = [];
    let companyList = [];
    for (let i = 0; i < companyCharactersArray.length; i ++) {
        if (companyCharactersArray[i] !== ','){
            company.push(companyCharactersArray[i])
        } else {
            company = company.join('');
            companyList.push(company);
            company = [];
        }     
    }
    ///////////////////////////////////////////////////////////////////////////////////////// 
    let companiesStartingWithArray = [];   
    for (let i = 0; i < companyList.length; i ++) {   
        const companyName = companyList[i];
        const companyNameLowerCase = companyName.toLowerCase();
        if (companyNameLowerCase.startsWith(searchString) && (searchString.length >0 )) {
            companiesStartingWithArray.push(companyName); 
        } 
    }
    /////////////////////////////////////////////////////////////////////////////////////////
    const resultMax = 4;
    for (let i = 0; i < resultMax; i++) {
        if (companiesStartingWithArray[i]) {
            var resultBox = document.getElementById(`res${i}`);
            resultBox.value = companiesStartingWithArray[i]; 
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////
    let keynum = 0;
    if(window.event) {
        keynum = e.keyCode;
    } else if (e.which) {
        keynum = e.which;
    } 
    /////////////////////////////////////////////////////////////////////////////////////////
    if (keynum == 13){
        for(let i = 0 ; i < companiesStartingWithArray.length; i++) {
            if (searchString.toLowerCase() == companiesStartingWithArray[i].toLowerCase()) {
                const page = companiesStartingWithArray[0];
                window.location.replace(`/company/${page}`);
            }
        }
    }
}