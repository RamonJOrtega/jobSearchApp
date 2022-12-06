const suggest = (searchString, e) => {
                   
    const resultMax = 4;
    let companiesStartingWithArray = [];
    const companyList= document.getElementsByClassName("company");                  
    for (let i = 0; i < companyList.length; i ++) {
        const companyLink = companyList[i];
        const companyNameRaw = companyLink.innerText;
        const companyName = companyNameRaw.toLowerCase();
        if (companyName.startsWith(searchString) && (searchString.length >0 )) {
            companiesStartingWithArray.push(companyNameRaw); 
        } 
    }
    console.log(companyList);
    console.log(companiesStartingWithArray);
    for (let i = 0; i < resultMax; i++) {
        var resultBox = document.getElementById(`res${i}`);
        resultBox.value = companiesStartingWithArray[i]; 
        if (companiesStartingWithArray[i]) {resultBox.style.display = "block"} 
        else (resultBox.style.display = "none")
    }
    let keynum = 0;
    if(window.event) {
        keynum = e.keyCode
    } else if (e.which) {
        keynum = e.which;
    } 
    console.log(keynum);

    if (keynum == 13){
        for(let i = 0 ; i < companiesStartingWithArray.length; i++) {
        if (searchString.toLowerCase() == companiesStartingWithArray[i].toLowerCase()) {
            const page = companiesStartingWithArray[0];
            window.location.replace(`/company/${page}`);
        }
        }
    }
   
}