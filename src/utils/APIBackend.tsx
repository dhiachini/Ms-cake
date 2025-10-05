import axios, { type AxiosInstance } from "axios";


const APIBackend: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5050",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

APIBackend.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

APIBackend.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default APIBackend;
