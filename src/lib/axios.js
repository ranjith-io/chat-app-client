import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API  || "http://localhost:5001/api",

    withCredentials: true,
    rejectUnauthorized: false,
});