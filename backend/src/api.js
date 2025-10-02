import axios from 'axios';

const api = axios.create({
  baseURL: '/api' // proxied to http://localhost:8080/api
  // withCredentials: true // uncomment if your auth uses cookies
});

// If you use JWT Authorization header:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProducts = (params = {}) => api.get('/products', { params }).then(r => r.data);
export const addToCart = (productId, quantity = 1) =>
  api.post('/cart/add', { productId, quantity }).then(r => r.data);
export const addToWishlist = (productId) =>
  api.post('/wishlist/add', { productId }).then(r => r.data);
export const getCart = () => api.get('/cart').then(r => r.data);
export const getWishlist = () => api.get('/wishlist').then(r => r.data);
