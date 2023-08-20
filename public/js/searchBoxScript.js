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
    let categoriesContainingSearchArray = [];   
    for (let i = 0; i < categoryList.length; i ++) {   
        const categoryName = categoryList[i];
        const categoryNameLowerCase = categoryName.toLowerCase();
        if (categoryNameLowerCase.includes(searchString) && (searchString.length >0 )) {
            categoriesContainingSearchArray.push(categoryName); 
        } 
    }
    // Populate the data list result box by getting the id of each data list option/////////
    const resultMax = 4;
    for (let i = 0; i < resultMax; i++) {
        if (jobOrCompanyFlag === 'company' &&categoriesContainingSearchArray[i]) {
            var resultBox = document.getElementById(`res${i}`);
            resultBox.value = categoriesContainingSearchArray[i]; 
        }
        if (jobOrCompanyFlag === 'job' && categoriesContainingSearchArray[i]) { 
            var jobBox = document.getElementById(`job${i}`);
            jobBox.value = categoriesContainingSearchArray[i]; 
        }
    }
    //Get the keycode of each keystroke as the searchboxes are populated by the user//////////
    let keynum = 0;
    if(window.event) {
        keynum = e.keyCode;
    } else if (e.which) {
        keynum = e.which;
    } 
    // If keycode is `ENTER` then go to page
    if (keynum == 13){
        for(let i = 0 ; i < categoriesContainingSearchArray.length; i++) {
            //Company suggestions need to exactly match what is in the list
            if (jobOrCompanyFlag === 'company' && searchString.toLowerCase() == categoriesContainingSearchArray[i].toLowerCase()) {
                const page = categoriesContainingSearchArray[0];
                window.location.replace(`/company/${page}`);
            }
            //Job suggestions don't need to exactly 
            if (jobOrCompanyFlag === 'job') {
                const page = searchString;
                window.location.replace(`/jobs/${page}`);
            }
        }
    }
}