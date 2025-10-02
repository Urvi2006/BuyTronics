// src/components/ProductCard.js
import React, { useState } from 'react';
import { SummaryApi } from '../api/SummaryApi';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { refreshCartCount } = useCart();
  const [loading, setLoading] = useState(false);

  const add = async () => {
    try {
      setLoading(true);
      const pid = product._id || product.id || product.productId;
      await SummaryApi.addToCart(pid, 1);
      await refreshCartCount();
    } catch (e) {
      alert('Add to cart failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <button className="btn btn-primary" disabled={loading} onClick={add}>
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
