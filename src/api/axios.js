import axios from "axios";
import { API_URL } from "../utils/constants";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies in requests
});

// Request interceptor - add token from cookies
api.interceptors.request.use(
  (config) => {
    // Token is stored in cookies, axios will automatically include it with withCredentials
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if not already on login page to prevent redirect loops
      if (window.location.pathname !== "/login") {
        // Token is cleared by backend (HTTP-only cookie)
        // Redux auth state will be cleared by the redirect
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
