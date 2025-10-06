import axios from "axios";
const axiosSecure = axios.create({
   baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type":"application/json"
    }
})

export default axiosSecure;
