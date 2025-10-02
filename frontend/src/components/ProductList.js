// src/components/ProductList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SummaryApi } from '../api/SummaryApi';
import { useCart } from '../context/CartContext';
import '../pages/Category.css';

function StarRating({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return '★';
    if (i === full && half) return '☆'; // swap with half-star if available
    return '☆';
  });
  return (
    <span className="rating">
      {stars.join(' ')} <span className="rating-value">({value.toFixed(1)})</span>
    </span>
  );
}

export default function ProductList({ title, products }) {
  const navigate = useNavigate();
  const { refreshCartCount } = useCart();
  const [busy, setBusy] = useState(''); // 'cart-id' or 'wish-id'

  const getPid = (p) => p.id || p._id || p.productId;

  const addToCart = async (p) => {
    const pid = getPid(p);
    try {
      setBusy('cart-' + pid);
      await SummaryApi.addToCart(pid, 1); // id/qty payload for Option A
      await refreshCartCount();
      // optional: toast success
    } catch (e) {
      alert('Add to Cart failed: ' + (e?.message || ''));
    } finally {
      setBusy('');
    }
  };

  const addToWishlist = async (p) => {
    const pid = getPid(p);
    try {
      setBusy('wish-' + pid);
      if (SummaryApi.addToWishlist) {
        await SummaryApi.addToWishlist(pid); // id payload
        // optional: toast success or refresh wishlist context if you have one
      } else {
        alert('Wishlist API not implemented');
      }
    } catch (e) {
      alert('Add to Wishlist failed: ' + (e?.message || ''));
    } finally {
      setBusy('');
    }
  };

  const buyNow = async (p) => {
    await addToCart(p);
    const pid = getPid(p);
    navigate(`/product/${pid}`, { state: { product: p } });
  };

  const hero = products?.[0];

  return (
    <div className="category-page">
      <div className="container">

        {/* Hero banner with real product image and CTAs */}
        {hero && (
          <section
            className="hero-banner"
            onClick={() => navigate(`/product/${getPid(hero)}`, { state: { product: hero } })}
          >
            <img className="hero-img" src={hero.image} alt={hero.name} />
            <div className="hero-overlay" />
            <div className="hero-content">
              <span className="badge badge-hot">Limited Time • Hot Deal</span>
              <h1 className="hero-title">{title}</h1>
              <p className="hero-sub">{hero.name}</p>
              <div className="hero-cta">
                <button
                  className="btn btn-secondary"
                  onClick={(e) => { e.stopPropagation(); addToCart(hero); }}
                  disabled={busy === 'cart-' + getPid(hero)}
                >
                  {busy === 'cart-' + getPid(hero) ? 'Adding…' : 'Add to Cart'}
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={(e) => { e.stopPropagation(); addToWishlist(hero); }}
                  disabled={busy === 'wish-' + getPid(hero)}
                >
                  {busy === 'wish-' + getPid(hero) ? 'Adding…' : '♡ Wishlist'}
                </button>
              </div>
            </div>
          </section>
        )}

        <h1 className="category-title">{title}</h1>

        {/* Offer chips row */}
        <div className="chip-row">
          <span className="chip">Top Rated</span>
          <span className="chip">Best Value</span>
          <span className="chip">New Arrivals</span>
        </div>

        <div className="product-grid">
          {products.map((p) => {
            const pid = getPid(p);
            const cartBusy = busy === 'cart-' + pid;
            const wishBusy = busy === 'wish-' + pid;

            return (
              <div className="product-card" key={pid}>
                <div
                  className="product-media"
                  onClick={() => navigate(`/product/${pid}`, { state: { product: p } })}
                >
                  <img src={p.image} alt={p.name} />
                  {p.offer && <span className="badge-offer">{p.offer}</span>}
                  <button
                    className="icon-wish"
                    title="Wishlist"
                    onClick={(e) => { e.stopPropagation(); addToWishlist(p); }}
                    disabled={wishBusy}
                  >
                    {wishBusy ? '…' : '♡'}
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-name" title={p.name}>{p.name}</h3>
                  <div className="price-row">
                    <span className="price">₹{p.price.toLocaleString()}</span>
                    {p.mrp && p.mrp > p.price && <span className="mrp">₹{p.mrp.toLocaleString()}</span>}
                  </div>
                  <StarRating value={p.rating || 4.5} />
                  <div className="cta-row">
                    <button className="btn btn-secondary" onClick={() => buyNow(p)}>
                      Buy Now
                    </button>
                    <button className="btn btn-primary" onClick={() => addToCart(p)} disabled={cartBusy}>
                      {cartBusy ? 'Adding…' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {products.length === 0 && <p>No products found.</p>}
        </div>
      </div>
    </div>
  );
}
