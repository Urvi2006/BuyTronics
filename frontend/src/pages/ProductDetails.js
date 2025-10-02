// src/pages/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import './ProductDetails.css';
import './Category.css';

// Add these imports:
import { SummaryApi } from '../api/SummaryApi';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState(state?.product || null);
  const [comments, setComments] = useState([
    { user: 'Aarav', text: 'Great product, fast delivery!', rating: 5 },
    { user: 'Meera', text: 'Good value for money.', rating: 4 },
  ]);

  // Cart hook and local loading
  const { refreshCartCount } = useCart();
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!product) {
      setProduct({
        id,
        name: 'Product',
        price: 9999,
        mrp: 12999,
        rating: 4.3,
        image: '/assets/placeholder.webp',
        offer: '10% OFF',
        description: 'High quality product with excellent performance.',
      });
    }
  }, [id, product]);

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const addComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments(prev => [{ user: 'You', text: newComment.trim(), rating: Number(newRating) }, ...prev]);
    setNewComment('');
    setNewRating(5);
  };

  const addToCart = async () => {
    if (!product) return;
    try {
      setAdding(true);
      const pid = product._id || product.id || product.productId;
      await SummaryApi.addToCart(pid, 1);
      await refreshCartCount();
    } catch (e) {
      alert('Add to cart failed: ' + e.message);
    } finally {
      setAdding(false);
    }
  };

  if (!product) return null;

  return (
    <div className="product-details-page">
      <div className="container">
        <div className="pd-breadcrumbs">
          <Link to="/">Home</Link> / <span>{product.name}</span>
        </div>

        <div className="pd-hero">
          <div className="pd-image">
            <img src={product.image} alt={product.name} />
            {product.offer && <span className="badge-offer">{product.offer}</span>}
          </div>
          <div className="pd-info">
            <h1 className="pd-title">{product.name}</h1>
            <div className="pd-rating">
              ⭐ {Number(product.rating || 0).toFixed(1)} / 5
            </div>
            <div className="pd-price-row">
              <span className="pd-price">₹{Number(product.price || 0).toLocaleString()}</span>
              {product.mrp && <span className="pd-mrp">₹{Number(product.mrp).toLocaleString()}</span>}
            </div>
            <p className="pd-desc">{product.description || 'Top-notch build, premium features, and long-lasting performance.'}</p>
            <div className="pd-cta">
              <button className="btn btn-secondary">Buy Now</button>
              <button className="btn btn-primary" onClick={addToCart} disabled={adding}>
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
            <ul className="pd-highlights">
              <li>Free delivery</li>
              <li>7-day replacement</li>
              <li>1-year warranty</li>
            </ul>
          </div>
        </div>

        <div className="pd-reviews">
          <h2>Customer Reviews</h2>
          <form className="review-form" onSubmit={addComment}>
            <select value={newRating} onChange={(e) => setNewRating(e.target.value)}>
              {[5,4,3,2,1].map(v => <option key={v} value={v}>{v} Star{v>1?'s':''}</option>)}
            </select>
            <input
              type="text"
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <ul className="review-list">
            {comments.map((c, idx) => (
              <li key={idx} className="review-item">
                <div className="review-head">
                  <strong>{c.user}</strong>
                  <span>⭐ {c.rating}</span>
                </div>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
