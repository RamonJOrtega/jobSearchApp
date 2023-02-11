import React, { useState } from "react";
import searchBoxSuggest from "../../../helpers/searchBoxSuggest"

function Navbar(props) {
    
    
    const [searchValue, setSearchValue] = React.useState("")

    return (
        <div className="topnav" oninput="" >
            
            <a className="active" href="/">Home</a> 

            <main className="topnav"> 
                <div className="flex-container-column">

                    <input list="results" id="srch" placeholder="search company name"
                    onkeyup={searchBoxSuggest(getElementById('srch').value.toString().toLowerCase(),  {companyList} , event)}>

                    <datalist id="results" >
                        <option id="res0" name="res0" placeholder="result0" ></option>
                        <option id="res1" name="res1" placeholder="result1" ></option>                
                        <option id="res2" name="res2" placeholder="result2" ></option>            
                        <option id="res3" name="res3" placeholder="result3" ></option>
                    </datalist>

                </div>
            </main> 
        </div>
    )
}

export default Navbar