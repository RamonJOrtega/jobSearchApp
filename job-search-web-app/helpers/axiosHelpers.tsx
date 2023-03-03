import axios from "axios";


const axiosGet = async (url:string) => {
    console.log('The URL call is \n', url);
    try {
        const response = await axios.get(url);
        return response.data;
    }
        catch (err) { 
            console.log("Axios Error: " + err);     
        }
}

export default axiosGet