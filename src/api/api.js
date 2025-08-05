import axios from 'axios';

const API_URL = 'https://ecommerce-api-1-c0uz.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');
        
        const { data } = await axios.post(`${API_URL}/user/refresh`, { refreshToken });
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    
    return Promise.reject({
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status,
    });
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/user/register', data),
  login: (data) => api.post('/user/login', data),
  adminLogin: (data) => api.post('/user/admin-login', data),
  logout: () => api.get('/user/logout'),
  forgotPassword: (email) => api.post('/user/forgot-password-token', { email }),
  resetPassword: (token, password) => api.put(`/user/reset-password/${token}`, { password }),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/edit-user', data),
  updatePassword: (password) => api.put('/user/password', { password }),
  saveAddress: (address) => api.put('/user/save-address', { address }),
  getWishlist: () => api.get('/user/wishlist'),
  addToWishlist: (prodId) => api.post('/user/wishlist', { prodId }),
  removeFromWishlist: (prodId) => api.delete('/user/wishlist', { data: { prodId } }),
  getAllUsers: () => api.get('/user/all-users'),
  getUser: (id) => api.get(`/user/${id}`),
  deleteUser: (id) => api.delete(`/user/${id}`),
  blockUser: (id) => api.put(`/user/block-user/${id}`),
  unblockUser: (id) => api.put(`/user/unblock-user/${id}`),
};

// Product API
export const productAPI = {
  getProducts: (params = {}) => api.get('/product', { params }),
  getProduct: (id) => api.get(`/product/${id}`),
  createProduct: (data) => api.post('/product', data),
  updateProduct: (id, data) => api.put(`/product/${id}`, data),
  deleteProduct: (id) => api.delete(`/product/${id}`),
  rateProduct: (data) => api.put('/product/rating', data),
  toggleWishlist: (prodId) => api.put('/product/wishlist', { prodId }),
};

// Category API
export const categoryAPI = {
  getCategories: () => api.get('/category'),
  createCategory: (title) => api.post('/category', { title }),
  getCategory: (id) => api.get(`/category/${id}`),
  updateCategory: (id, title) => api.put(`/category/${id}`, { title }),
  deleteCategory: (id) => api.delete(`/category/${id}`),
};

// Brand API
export const brandAPI = {
  getBrands: () => api.get('/brand'),
  createBrand: (title) => api.post('/brand', { title }),
  getBrand: (id) => api.get(`/brand/${id}`),
  updateBrand: (id, title) => api.put(`/brand/${id}`, { title }),
  deleteBrand: (id) => api.delete(`/brand/${id}`),
};

// Color API
export const colorAPI = {
  getColors: () => api.get('/color'),
  createColor: (title) => api.post('/color', { title }),
  getColor: (id) => api.get(`/color/${id}`),
  updateColor: (id, title) => api.put(`/color/${id}`, { title }),
  deleteColor: (id) => api.delete(`/color/${id}`),
};

// Coupon API
export const couponAPI = {
  getCoupons: () => api.get('/coupon'),
  createCoupon: (data) => api.post('/coupon', data),
  getCoupon: (id) => api.get(`/coupon/${id}`),
  updateCoupon: (id, data) => api.put(`/coupon/${id}`, data),
  deleteCoupon: (id) => api.delete(`/coupon/${id}`),
};

// Cart & Order API
export const cartAPI = {
  updateCart: (cart) => api.post('/user/cart', { cart }),
  getCart: () => api.get('/user/get-cart'),
  emptyCart: () => api.delete('/user/empty-cart'),
  applyCoupon: (coupon) => api.post('/user/cart/applycoupon', { coupon }),
  createCashOrder: (data) => api.post('/user/cart/cash-order', data),
  getOrders: () => api.get('/user/get-orders'),
  getAllOrders: () => api.get('/user/getallorders'),
  updateOrderStatus: (orderId, status) => api.put('/user/update-order-status', { orderId, status }),
};

export default api;