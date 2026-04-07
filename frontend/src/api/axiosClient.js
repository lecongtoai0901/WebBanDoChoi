import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5149";

const axiosClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
});

// tự động gắn token
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosClient;