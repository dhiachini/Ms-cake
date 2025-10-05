import axios from "axios";

// Create an Axios instance
const APIBackend = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5050", // set your base URL
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
APIBackend.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
APIBackend.interceptors.response.use(
  (response) => response.data, // Simplify response data
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.warn("Unauthorized — redirecting to login...");
        // You could log out user or redirect here
      } else if (status === 403) {
        console.error("Forbidden — insufficient permissions.");
      } else if (status >= 500) {
        console.error("Server error. Please try again later.");
      }
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default APIBackend;
