// src/api/SummaryApi.js
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api';

async function request(path, method = 'GET', body) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    // credentials: 'include', // uncomment if using cookie-based auth
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }

  const type = res.headers.get('content-type') || '';
  return type.includes('application/json') ? res.json() : null;
}

export const SummaryApi = {
  // Cart
  getCart: () => request('/cart', 'GET'),
  addToCart: (productId, quantity = 1) =>
    request('/cart/add', 'POST', { productId, quantity }),
  updateCart: (productId, quantity) =>
    request('/cart/update', 'POST', { productId, quantity }),
  removeFromCart: (productId) =>
    request('/cart/remove', 'POST', { productId }),

  // Wishlist
  getWishlist: () => request('/wishlist', 'GET'),
  addToWishlist: (productId) =>
    request('/wishlist/add', 'POST', { productId }),
  removeFromWishlist: (productId) =>
    request('/wishlist/remove', 'POST', { productId }),
};

export default SummaryApi;
