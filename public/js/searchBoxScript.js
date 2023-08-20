const suggest = (jobOrCompanyFlag,searchString, charactersArray, e) => {
    //EJS passes the jobs or companys as a bunch of characters, so we need to recombine them into an array of word categories
    //categories can be jobs or company names
    let category = [];
    let categoryList = [];
    for (let i = 0; i < charactersArray.length; i ++) {
        if (charactersArray[i] !== ','){
            category.push(charactersArray[i])
        } else {
            category = category.join('');
            categoryList.push(category);
            category = [];
        }     
    }
    // Create an array of jobs or company names that start with the search string///////////
    let categoriesStartingWithArray = [];   
    for (let i = 0; i < categoryList.length; i ++) {   
        const categoryName = categoryList[i];
        const categoryNameLowerCase = categoryName.toLowerCase();
        if (categoryNameLowerCase.startsWith(searchString) && (searchString.length >0 )) {
            categoriesStartingWithArray.push(categoryName); 
        } 
    }
    // Populate the data list result box by getting the id of each data list option/////////
    const resultMax = 4;
    for (let i = 0; i < resultMax; i++) {
        if (jobOrCompanyFlag === 'company' &&categoriesStartingWithArray[i]) {
            var resultBox = document.getElementById(`res${i}`);
            resultBox.value = categoriesStartingWithArray[i]; 
        }
        if (jobOrCompanyFlag === 'job' && categoriesStartingWithArray[i]) { 
            var jobBox = document.getElementById(`job${i}`);
            jobBox.value = categoriesStartingWithArray[i]; 
        }
    }
    //Get the keycode of each keystroke as the searchboxes are populated by the user//////////
    let keynum = 0;
    if(window.event) {
        keynum = e.keyCode;
    } else if (e.which) {
        keynum = e.which;
    } 
    //Convert the search string to lower case to compare strings and categores. If keycode is `ENTER` then go to page/
    if (keynum == 13){
        for(let i = 0 ; i < categoriesStartingWithArray.length; i++) {
            if (searchString.toLowerCase() == categoriesStartingWithArray[i].toLowerCase()) {
                const page = categoriesStartingWithArray[0];
                window.location.replace(`/company/${page}`);
            }
        }
    }
}