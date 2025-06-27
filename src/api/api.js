// import axios from "axios";

// const api = axios.create({
//   // baseURL: "https://hoj-api.vercel.app/",
//   baseURL: "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (req) => {
//     // Add authorization header
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;

//     if (error.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refreshToken");
//       const res = await api.post("/api/token/refresh/", {
//         refresh_token: refreshToken,
//       });
//       if (res.status === 201) {
//         localStorage.setItem("accessToken", res.data.access);
//         localStorage.setItem("refreshToken", res.data.refresh);
//         api.defaults.headers.common["Authorization"] =
//           "Bearer " + localStorage.getItem("accessToken");
//         console.log("token refreshed");
//         return axios(originalRequest);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Error handler
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       // Redirect to login page
//       return Promise.reject({
//         message: "Unauthorized. Please log in again.",
//         originalError: error,
//       });
//     } else if (error.response.status === 404) {
//       return Promise.reject({
//         message: `${error.config.url} not found`,
//         originalError: error,
//       });
//     } else {
//       return Promise.reject({
//         message: "An error occurred. Please try again later.",
//         originalError: error,
//       });
//     }
//   }
// );

// export default api;







// api.js
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5001/api",
  baseURL: "https://ecommerce-api-1-c0uz.onrender.com/api",
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
          "http://localhost:5000/api/user/refresh",
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