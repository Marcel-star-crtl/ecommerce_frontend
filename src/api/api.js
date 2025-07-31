import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  // baseURL: "https://ecommerce-api-1-c0uz.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        
        const response = await axios.post(
          // "https://ecommerce-api-1-c0uz.onrender.com/user/refresh",
          "http://localhost:5001/user/refresh",
          { refreshToken }
        );
        
        const { token, refreshToken: newRefreshToken } = response.data;
        
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", newRefreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject({
      message: error.response?.data?.message || 
             error.message || 
             "An error occurred. Please try again later.",
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

export default api;