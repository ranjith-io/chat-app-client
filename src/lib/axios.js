import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: import.meta.VITE_API  || "http://localhost:5001/api",

    withCredentials: true,
});