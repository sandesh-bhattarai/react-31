import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance  = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    timeoutErrorMessage: "Server Timed out...",
    // method: "get, post, put, patch, delete",
    headers: {
        "Content-Type": "application/json"
    },
    responseType: "json",
    responseEncoding: "utf-8"
})

// axiosInstance.interceptors.request.use()

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (exception) => {
        if(+exception.status === 401) {
            // redirect to login page notify 
            // refresh ===> 401 
            toast.error("Please login first");
            localStorage.removeItem("token")
            localStorage.removeItem("refresh")
            window.location.href = "/login"
        } else if(+exception.status === 403) {
            // 
            toast.warning("You do nnot have permission to access")
            window.location.href = "/"
        } else {
            throw exception?.response;
        }
    }
);

export default axiosInstance;