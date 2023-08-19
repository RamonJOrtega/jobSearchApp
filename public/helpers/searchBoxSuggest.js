const suggest = (searchString, charArray, e) => {

    console.log('hello');
    
    let category = [];
    let categoryList = [];
    for (let i = 0; i < charArray.length; i ++) {
        if (charArray[i] !== ','){
            category.push(charArray[i])
        } else {
            category = category.join('');
            categoryList.push(category);
            category = [];
        }     
    }
    ///////////////////////////////////////////////////////////////////////////////////////// 
    let catagoriesStartingWithArray = [];   
    for (let i = 0; i < categoryList.length; i ++) {   
        const categoryName = categoryList[i];
        const categoryNameLowerCase = categoryName.toLowerCase();
        if (categoryNameLowerCase.startsWith(searchString) && (searchString.length >0 )) {
            catagoriesStartingWithArray.push(categoryName); 
        } 
    }
    /////////////////////////////////////////////////////////////////////////////////////////
    const resultMax = 4;
    for (let i = 0; i < resultMax; i++) {
        if (catagoriesStartingWithArray[i]) {
            // var resultBox = document.getElementById(`res${i}`);
            // resultBox.value = catagoriesStartingWithArray[i]; 
            var jobBox = document.getElementById(`job${i}`);
            jobBox.value = catagoriesStartingWithArray[i]; 
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
        for(let i = 0 ; i < catagoriesStartingWithArray.length; i++) {
            if (searchString.toLowerCase() == catagoriesStartingWithArray[i].toLowerCase()) {
                const page = catagoriesStartingWithArray[0];
                window.location.replace(`/category/${page}`);
            }
        }
    }
}
export default suggest