import React from "react";
import Navbar from "./Navbar";
import HomeContent from "./HomeContent";
import CompanyContent from "./CompanyContent";
import Footer from "./Footer";


function JobSearchApp() {
    return (
        <div> 
            <HomeContent />
            <CompanyContent />
            <Footer />
        </div>
    )
}

export default JobSearchApp