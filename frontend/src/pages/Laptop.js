import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Laptop.css';

// Adjust these imports to match your actual file structure and casing
import macbookAirM2 from '../components/products/Laptop/mac-laptop.png';
import acerSwift from '../components/products/Laptop/acer-laptop.png';
import hpPavilion from '../components/products/Laptop/hp.png';
import asur1 from '../components/products/Laptop/asur-gamming.png';
import  asur2 from '../components/products/Laptop/asur-laptop.png';
import asur3 from '../components/products/Laptop/asur.png';

// Optional placeholder for products without images
const placeholder = 'https://placehold.co/600x400?text=Laptop';

// Helpers
function calcDiscount(mrp, price) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
function formatINR(n) {
  try { return n.toLocaleString('en-IN'); } catch { return String(n); }
}

// Star display (simple text stars for CSS coloring)
function Stars({ rating = 4.3 }) {
  const val = Math.max(0, Math.min(5, rating));
  const filled = Math.round(val);
  return (
    <span className="stars" aria-label={`${val} out of 5`}>
      {'★★★★★'.slice(0, filled)}{'☆☆☆☆☆'.slice(0, 5 - filled)}
    </span>
  );
}

const initialProducts = [
  { id: 'lap-1',  name: 'MacBook Air M2 (8GB/256GB)',   price: 99990,  mrp: 114990, rating: 4.7, ratingCount: 1489, offer: 'No Cost EMI', image: macbookAirM2 },
  { id: 'lap-2',  name: 'Acer Swift 3 OLED (16GB/512GB)', price: 74990,  mrp: 89990,  rating: 4.5, ratingCount: 823,  offer: 'Bank Offer', image: acerSwift },
  { id: 'lap-3',  name: 'HP Pavilion 14 (12th Gen i5)',  price: 52990,  mrp: 78990,  rating: 4.4, ratingCount: 2110, offer: 'Exchange Offer', image: hpPavilion },
  { id: 'lap-4',  name: 'ASUS ROG Strix G15 (RTX 4060)', price: 129990, mrp: 149990, rating: 4.6, ratingCount: 305,  offer: 'Game Pass 3M', image: asur1 },
  { id: 'lap-5',  name: 'Dell XPS 13 Plus (OLED)',       price: 154990, mrp: 179990, rating: 4.3, ratingCount: 97,   offer: 'Bank Cashback', image: asur2 }
];

export default function Laptop() {
  const navigate = useNavigate();
  const [products] = useState(initialProducts);
  const [wishlist, setWishlist] = useState({});
  const [loadingIds, setLoadingIds] = useState({});
  const [modal, setModal] = useState(null); // product or null
  const [toasts, setToasts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const items = useMemo(
    () => products.map(p => ({ ...p, discount: calcDiscount(p.mrp, p.price) })),
    [products]
  );

  const filtered = useMemo(() => {
    switch (activeFilter) {
      case 'Under60':
        return items.filter(p => p.price <= 60000);
      case 'Gaming':
        return items.filter(p => /ROG|Katana|Victus|RTX/i.test(p.name));
      case 'OLED':
        return items.filter(p => /OLED/i.test(p.name));
      case 'Thin':
        return items.filter(p => /Air|Swift|IdeaPad|Zenbook|XPS/i.test(p.name));
      default:
        return items;
    }
  }, [items, activeFilter]);

  const addToast = (msg) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500);
  };
  const toggleWish = (id) =>
    setWishlist(w => ({ ...w, [id]: !w[id] }));

  const addToCart = async (product) => {
    setLoadingIds(s => ({ ...s, [product.id]: true }));
    await new Promise(r => setTimeout(r, 500)); // simulate async or call your cart context
    setLoadingIds(s => ({ ...s, [product.id]: false }));
    addToast(`${product.name} added to cart`);
  };
  const buyNow = async (product) => {
    await addToCart(product);
    navigate('/checkout'); // ensure route exists
  };

  return (
    <div className="page">
      {/* Hero */}
      <div className="hero hero--laptop">
          <div className="hero__content">
            <h1>Power your day with the latest laptops</h1>
            <p>Up to 25% off on top brands. No cost EMI and exchange available.</p>
            <a className="btn-hero btn-secondary" href="#laptop-list">Shop Deals</a>
          </div>
          <div className="hero-image">
            <img src={asur3} alt="ASUS Laptop" loading="lazy" />
          </div>
       </div>
    


      {/* Section header */}
      <div className="section-header">
        <div>
          <h2 className="laptop-list">Trending Laptops</h2>
          <p className="muted">Fresh deals, free delivery and exchange offers — updated daily.</p>
        </div>
        <div className="filters">
          <button
            className={`chip${activeFilter === 'All' ? ' chip--active' : ''}`}
            onClick={() => setActiveFilter('All')}
          >
            All
          </button>
          <button
            className={`chip${activeFilter === 'Under60' ? ' chip--active' : ''}`}
            onClick={() => setActiveFilter('Under60')}
          >
            Under ₹60k
          </button>
          <button
            className={`chip${activeFilter === 'Gaming' ? ' chip--active' : ''}`}
            onClick={() => setActiveFilter('Gaming')}
          >
            Gaming
          </button>
          <button
            className={`chip${activeFilter === 'Thin' ? ' chip--active' : ''}`}
            onClick={() => setActiveFilter('Thin')}
          >
            Thin & Light
          </button>
          <button
            className={`chip${activeFilter === 'OLED' ? ' chip--active' : ''}`}
            onClick={() => setActiveFilter('OLED')}
          >
            OLED
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid">
        {filtered.map(p => (
          <article key={p.id} className="card">
            {p.discount >= 20 && <div className="ribbon">Deal of the Day</div>}

            <button
              className={`wish ${wishlist[p.id] ? 'is-active' : ''}`}
              onClick={() => toggleWish(p.id)}
              aria-label="Add to wishlist"
              title="Add to wishlist"
            >
              ♥
            </button>

            <div className="image-wrap">
              <img
                src={p.image || placeholder}
                alt={p.name}
                loading="lazy"
                onError={(e) => { e.currentTarget.src = placeholder; }}
              />
              <button className="quick" onClick={() => setModal(p)}>Quick View</button>
              {p.offer && <span className="badge">{p.offer}</span>}
            </div>

            <div className="content">
              <h3 className="title">{p.name}</h3>

              <div className="rating">
                <Stars rating={p.rating} />
                <span className="rating__text">{(p.rating || 4.3).toFixed(1)}</span>
                {p.ratingCount && <span className="muted">({formatINR(p.ratingCount)})</span>}
              </div>

              <div className="price">
                <span className="price__final">₹{formatINR(p.price)}</span>
                {p.mrp && p.mrp > p.price && (
                  <>
                    <span className="price__mrp">₹{formatINR(p.mrp)}</span>
                    <span className="price__off">{p.discount}% off</span>
                  </>
                )}
              </div>

              <div className="chips">
                <span className="chip chip--muted">Free Delivery</span>
                <span className="chip chip--muted">No Cost EMI</span>
                <span className="chip chip--muted">Exchange</span>
              </div>

              <div className="actions">
                <button
                  className="btn btn--ghost"
                  onClick={() => addToCart(p)}
                  disabled={!!loadingIds[p.id]}
                >
                  {loadingIds[p.id] ? 'Adding…' : 'Add to Cart'}
                </button>
                <button
              className={`wish ${wishlist[p.id] ? 'is-active' : ''}`}
              onClick={() => toggleWish(p.id)}
              aria-label="Add to wishlist"
              title="Add to wishlist"
            >
              ♥
            </button>
                <button
                  className="btn btn--primary"
                  onClick={() => buyNow(p)}
                  disabled={!!loadingIds[p.id]}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </article>
        ))}

        {/* Optional skeletons if filtered < 8 */}
        {filtered.length < 8 && Array.from({ length: 8 - filtered.length }).map((_, i) => (
          <div key={`sk-${i}`} className="card skeleton">
            <div className="image-wrap" />
            <div className="content">
              <div className="s-row" />
              <div className="s-row short" />
              <div className="s-row tiny" />
              <div className="s-btns" />
            </div>
          </div>
        ))}
      </div>

      {/* Benefits strip */}
      <div className="benefits">
        <div className="benefit">
          <span>🚚</span>
          <div>
            <div className="benefit__title">Free Delivery</div>
            <div className="muted">On orders above ₹499</div>
          </div>
        </div>
        <div className="benefit">
          <span>🔁</span>
          <div>
            <div className="benefit__title">Easy Exchange</div>
            <div className="muted">Get up to ₹20,000 off</div>
          </div>
        </div>
        <div className="benefit">
          <span>💳</span>
          <div>
            <div className="benefit__title">No Cost EMI</div>
            <div className="muted">Up to 12 months</div>
          </div>
        </div>
        <div className="benefit">
          <span>🛡️</span>
          <div>
            <div className="benefit__title">1-Year Warranty</div>
            <div className="muted">Brand authorized</div>
          </div>
        </div>
      </div>

      {/* Quick view modal */}
      {modal && (
        <div className="modal" role="dialog" aria-modal="true" onClick={() => setModal(null)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <img src={modal.image || placeholder} alt={modal.name} />
            <div className="modal__side">
              <h3>{modal.name}</h3>
              <div className="price">
                <span className="price__final">₹{formatINR(modal.price)}</span>
                {modal.mrp && modal.mrp > modal.price && (
                  <>
                    <span className="price__mrp">₹{formatINR(modal.mrp)}</span>
                    <span className="price__off">{calcDiscount(modal.mrp, modal.price)}% off</span>
                  </>
                )}
              </div>
              <p className="muted">Ships in 24 hours. 10-day replacement. 1-year brand warranty.</p>
              <div className="actions">
                <button className="btn btn--ghost" onClick={() => addToCart(modal)}>Add to Cart</button>
                <button className="btn btn--primary" onClick={() => buyNow(modal)}>Buy Now</button>
              </div>
            </div>
            <button className="modal__close" onClick={() => setModal(null)} aria-label="Close">×</button>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className="toasts">
        {toasts.map(t => <div key={t.id} className="toast">{t.msg}</div>)}
      </div>
    </div>
  );
}
