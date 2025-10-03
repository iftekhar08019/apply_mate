import axios from "axios";
const axiosSecure = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type":"application/json"
    }
})

export default axiosSecure;
