import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from './context/AppContext';

export default function Header() {
  const { state } = useApp();
  
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#007bff' }}>
          BuyTronics
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
          <Link to="/products" style={{ textDecoration: 'none', color: '#333' }}>Products</Link>
          <Link to="/wishlist" style={{ textDecoration: 'none', color: '#333' }}>
            Wishlist ({state.wishlist.length})
          </Link>
          <Link to="/cart" style={{ textDecoration: 'none', color: '#333' }}>
            Cart ({state.cart.reduce((total, item) => total + item.quantity, 0)})
          </Link>
        </div>
      </div>
    </nav>
  );
}
