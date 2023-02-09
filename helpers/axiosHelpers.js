const axios = require('axios')

const axiosGet = async (url) => {
    console.log('The URL call is \n', url);
    try {
        const response = await axios.get(url);
        return response.data;
    }
        catch (err) { 
            console.log("Axios Error: " + err);     
        }
}

module.exports = { axiosGet };