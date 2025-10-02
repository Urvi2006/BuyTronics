// src/pages/Wishlist.js
import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:8080/api';

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

async function apiGet(path) {
  const res = await fetch(API_BASE + path, { headers: authHeaders() });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body || {})
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [addedId, setAddedId] = useState(null);

  const load = async () => {
    try {
      setError('');
      const data = await apiGet('/wishlist');
      setItems(data.items || []);
    } catch (e) {
      setError(e.message || 'Failed to load wishlist');
    }
  };

  useEffect(() => { load(); }, []);

  const removeFromWishlist = async (productId) => {
    try {
      setItems(prev => prev.filter(p => p.productId !== productId));
      await apiPost('/wishlist/remove', { productId });
    } catch (e) {
      setError(e.message || 'Failed to remove from wishlist');
      load();
    }
  };

  const addToCartFromWishlist = async (productId) => {
    try {
      await apiPost('/cart/add', { productId, qty: 1 });
      // Optionally remove from wishlist after adding
      await apiPost('/wishlist/remove', { productId });
      setItems(prev => prev.filter(p => p.productId !== productId));
      setAddedId(productId);
      setTimeout(() => setAddedId(null), 1500);
    } catch (e) {
      setError(e.message || 'Failed to add to cart');
    }
  };

  if (error) return <div style={{ padding: 16, color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <h1>Wishlist</h1>
      {items.length === 0 && <p>Your wishlist is empty.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
        {items.map(p => (
          <div key={p.productId} style={{ border: '1px solid #eee', padding: 12 }}>
            <img src={p.image || ''} alt={p.name || 'Item'} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
            <div style={{ marginTop: 8, fontWeight: 600 }}>{p.name}</div>
            <div>₹{p.price}</div>

            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
                onClick={() => addToCartFromWishlist(p.productId)}
                style={{
                  background: addedId === p.productId ? '#28a745' : '#0d6efd',
                  color: '#fff', border: 0, padding: '6px 10px', borderRadius: 4
                }}
              >
                {addedId === p.productId ? 'Added!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => removeFromWishlist(p.productId)}
                style={{ background: '#fff', color: '#dc3545', border: '1px solid #dc3545', padding: '6px 10px', borderRadius: 4 }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
