import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';

export default function Products() {
  const { dispatch } = useApp();
  const [products] = useState([
    { id: 1, name: 'iPhone 15', price: 79999, image: 'https://via.placeholder.com/200' },
    { id: 2, name: 'MacBook Air', price: 114999, image: 'https://via.placeholder.com/200' },
    { id: 3, name: 'AirPods Pro', price: 24999, image: 'https://via.placeholder.com/200' },
    { id: 4, name: 'Samsung Galaxy S24', price: 89999, image: 'https://via.placeholder.com/200' },
  ]);

  const addToCart = (p) => {
    const payload = {
      product_id: p.id,
      product_name: p.name,
      product_image: p.image,
      price: p.price,
      quantity: 1
    };
    dispatch({ type: 'ADD_TO_CART', payload });
    alert('Added to cart!');
  };

  const addToWishlist = (p) => {
    const payload = {
      product_id: p.id,
      product_name: p.name,
      product_image: p.image,
      price: p.price
    };
    dispatch({ type: 'ADD_TO_WISHLIST', payload });
    alert('Added to wishlist!');
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Products</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
          {products.map(product => (
            <div key={product.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
              <img 
                src={product.image} 
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1rem' }}
              />
              <h3 style={{ marginBottom: '0.5rem' }}>{product.name}</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#007bff', marginBottom: '1rem' }}>
                ₹{product.price.toLocaleString()}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => addToCart(product)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => addToWishlist(product)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  ♥ Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
