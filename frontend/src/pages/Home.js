import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import image1 from '../banner/img5.webp';
import image4 from '../banner/SAMSUNG Q Series 163 cm (65 inch) QLED Ultra HD (4K) Smart Tizen TV (65Q7FN) 1.webp'
import img2 from '../components/products/fridge/LG 185 L Direct Cool Single Door 5 Star Refrigerator with Base Drawer (Blue Charm, GL-D201ABCU) 1.webp';
import image3 from '../components/products/mobile/SAMSUNG Galaxy A10s (Black, 32 GB) (3 GB RAM) 1.webp'
import img5 from '../components/products/watches/boAt Cosmos Pro 1.webp';
import image6 from '../banner/Sony.png';
import  img12 from '../components/products/watches/boAt Storm Pro Call 4.webp';
import image8 from '../components/products/tv/SAMSUNG Series 8 123 cm (49 inch) Ultra HD (4K) LED Smart Tizen TV (49NU8000) 1.webp';
import img9 from '../components/products/mobile/SAMSUNG Galaxy F23 5G (Aqua Blue, 128 GB) (6 GB RAM) 1.webp';
import img10  from '../components/products/fridge/Whirlpool 190 L Direct Cool Single Door 4 Star Refrigerator (Sapphire Abyss, 205 IMPC PRM 4S INV Sapphire Abyss) 2.webp';

import { SummaryApi } from '../api/SummaryApi';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';


function Home() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { refreshCartCount, cartCount } = useCart();
  const { state, dispatch  } = useApp();
  const wishlistCount = state.wishlist.length;
    const [addingId, setAddingId] = useState(null);
    const [wishId, setWishId] = useState(null);

    const resolveId = (p) => p._id || p.id || p.productId;

    const handleAddToCart = async (product) => {
      if (!product?.inStock) return;
      const productId = resolveId(product);
      try {
        setAddingId(productId);
        await SummaryApi.addToCart(productId, 1);
        await refreshCartCount();
      } catch (e) {
        alert('Failed to add to cart: ' + (e?.message || ''));
      } finally {
        setAddingId(null);
      }
    };

    const handleAddToWishlist = async (product) => {
      const productId = resolveId(product);
      try {
        setWishId(productId);
        await SummaryApi.addToWishlist(productId);
        setTimeout(() => setWishId(null), 800);
      } catch (e) {
        alert('Failed to add to wishlist: ' + (e?.message || ''));
        setWishId(null);
      }
    };

  
  const [q, setQ] = useState('');

  const heroSlides = [
    {
      title: "Latest Samsung 85\" QLED TV",
      subtitle: "Experience cinema-quality picture with 4K Neo QLED technology and smart features",
      image: image4,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      ctaText: "Shop TVs",
      ctaLink: "/products/tv"
    },
    {
      title: "iPhone 15 Pro Max 256GB",
      subtitle: "The most advanced iPhone with titanium design, A17 Pro chip, and professional camera system",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-naturaltitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1693009279040",
      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
      ctaText: "Shop Phones",
      ctaLink: "/products/mobile"
    },
    {
      title: "LG French Door Refrigerator",
      subtitle: "Smart cooling technology with InstaView door-in-door and energy efficient design",
      image: img2,
      background: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
      ctaText: "Shop Fridges",
      ctaLink: "/products/fridge"
    }
  ];

const realProducts = [
     {
      id: 5,
      name: "LG 65\" OLED C3 Smart TV",
      brand: "LG",
      category: "TV",
      price: 1499,
      originalPrice: 1799,
      discount: 17,
      rating: 4.9,
      reviewCount: 892,
      image: image8,
      inStock: true,
      isFeatured: true,
      features: ["OLED Display", "webOS", "Dolby Vision"]
    },
    {
      id: 2,
      name: "LG 28 Cu.Ft French Door Refrigerator",
      brand: "LG",
      category: "Fridge",
      price: 2199,
      originalPrice: 2599,
      discount: 15,
      rating: 4.5,
      reviewCount: 743,
      image: img2,
      inStock: true,
      isNew: true,
      features: ["InstaView Door", "Smart Cooling", "Energy Star"]
    }, {
      id: 12,
      name: "Garmin Venu 3 GPS Smartwatch",
      brand: "Garmin",
      category: "Watch",
      price: 449,
      originalPrice: 499,
      discount: 10,
      rating: 4.7,
      reviewCount: 987,
      image: img12,
      inStock: true,
      features: ["GPS Tracking", "Health Snapshot", "14-Day Battery"]
    },
    {
      id: 1,
      name: "Samsung 75\" Neo QLED 4K Smart TV",
      brand: "Samsung",
      category: "TV",
      price: 1799,
      originalPrice: 2199,
      discount: 18,
      rating: 4.8,
      reviewCount: 1247,
      image: image4,
      inStock: true,
      isNew: true,
      features: ["4K Neo QLED", "Smart TV", "HDR10+"]
    },
   
{
      id: 4,
      name: "Apple Watch Series 9 GPS 45mm",
      brand: "Apple",
      category: "Watch",
      price: 429,
      originalPrice: 459,
      discount: 7,
      rating: 4.8,
      reviewCount: 2847,
      image: img5,
      inStock: true,
      isFeatured: true,
      features: ["S9 SiP", "Always-On Display", "Health Tracking"]
    },
     
     {
      id: 3,
      name: "Sony 55\" BRAVIA XR A80L OLED TV",
      brand: "Sony",
      category: "TV",
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      rating: 4.7,
      reviewCount: 634,
      image: image6,
      inStock: true,
      features: ["XR OLED", "Google TV", "BRAVIA CORE"]
    },
      
    {
      id: 6,
      name: "Google Pixel 8 Pro 256GB",
      brand: "Google",
      category: "Mobile",
      price: 899,
      originalPrice: 999,
      discount: 10,
      rating: 4.6,
      reviewCount: 1834,
      image: img9,
      inStock: true,
      features: ["Tensor G3", "Magic Eraser", "Night Sight"]
    },
    {
      id: 9,
      name: "Whirlpool 25 Cu.Ft French Door Refrigerator",
      brand: "Whirlpool",
      category: "Fridge",
      price: 1599,
      originalPrice: 1899,
      discount: 16,
      rating: 4.3,
      reviewCount: 567,
      image: img10,
      inStock: true,
      features: ["FreshFlow Technology", "LED Lighting", "Adjustable Shelves"]
    },{
      id: 3,
      name: "Samsung Galaxy S24 Ultra 512GB",
      brand: "Samsung",
      category: "Mobile",
      price: 1299,
      originalPrice: 1419,
      discount: 8,
      rating: 4.7,
      reviewCount: 2156,
      image:image3,
      isFeatured: true,
      features: ["S Pen Included", "200MP Camera", "5G Ready"]
    }
   
  ];








const allProducts = React.useMemo(() => {
  const base = Array.isArray(realProducts) ? realProducts : [];

  return [
    ...base,
    {
      id: 'mobile-iphone-15pm-256',
      name: 'Apple iPhone 15 Pro Max 256GB',
      brand: 'Apple',
      category: 'Mobile',
      price: 0,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-naturaltitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1693009279040',
      inStock: true,
    },
    {
      id: 'watch-boat-cosmos-pro',
      name: 'boAt Cosmos Pro',
      brand: 'boAt',
      category: 'Watch',
      price: 0,
      image: img5,
      inStock: true,
    },
    {
      id: 'watch-boat-storm-pro-call',
      name: 'boAt Storm Pro Call',
      brand: 'boAt',
      category: 'Watch',
      price: 0,
      image: img12,
      inStock: true,
    },
    {
      id: 'mobile-samsung-a10s',
      name: 'Samsung Galaxy A10s (3GB/32GB)',
      brand: 'Samsung',
      category: 'Mobile',
      price: 0,
      image: image3,
      inStock: true,
    },
    {
      id: 'mobile-samsung-f23',
      name: 'Samsung Galaxy F23 5G (6GB/128GB)',
      brand: 'Samsung',
      category: 'Mobile',
      price: 0,
      image: img9,
      inStock: true,
    },
    {
      id: 'tv-samsung-49nu8000',
      name: 'Samsung Series 8 49" 4K LED Smart TV (49NU8000)',
      brand: 'Samsung',
      category: 'TV',
      price: 0,
      image: image8,
      inStock: true,
    },
    {
      id: 'fridge-lg-185l',
      name: 'LG 185L Single Door 5 Star Refrigerator',
      brand: 'LG',
      category: 'Fridge',
      price: 0,
      image: img2,
      inStock: true,
    },
    {
      id: 'fridge-whirlpool-190l',
      name: 'Whirlpool 190L Single Door 4 Star Refrigerator',
      brand: 'Whirlpool',
      category: 'Fridge',
      price: 0,
      image: img10,
      inStock: true,
    },
  ];
}, [realProducts]);








   const results = React.useMemo(() => {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return allProducts.filter(p => {
    const hay = [
      p.name,
      p.brand,
      p.category,
      Array.isArray(p.features) ? p.features.join(' ') : ''
    ].filter(Boolean).join(' ').toLowerCase();
    return hay.includes(term);
  });
}, [q, allProducts]);



const navigate = useNavigate();
const categories = [
    { name: "TVs",  icon: "📺", count: 14, color: "#7a8ee7ff", path: "/tv" },
    { name: "Mobile", icon: "📱", count: 12, color: "#ff6b6b", path: "/mobile" },
    { name: "Fridge", icon: "🧊", count: 8, color: "#4ecdc4",  path: "/fridge" },
    { name: "Watch",    icon: "⌚", count: 5,  color: "#45b7d1",   path: "/watch" },
  { name: "Laptops",  icon: "💻", count: 8,  color: "#96ceb4",   path: "/laptops" },
  { name: "Cameras",  icon: "📷", count: 14, color: "#54a0ff",   path: "/cameras" },
];
const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  }); // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  // Hero slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);// Load products effect 
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeaturedProducts(realProducts);
      setIsLoading(false);
    };
    loadProducts();
  }, []);// Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);
   const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    dispatch({ type: 'CLEAR_ALL' });
    try { await refreshCartCount(); } catch {}
  };


  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
      >⭐
      </span>
    ));
  };
  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="product-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
      <div className="skeleton-text"></div>
    </div>
  );
  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          {/* Brand */}
          <Link to="/" className="nav-brand">
            <div className="brand-logo">
              <span className="brand-icon">⚡</span>
              <span className="brand-name">BuyTronics</span>
            </div>
          </Link>



          {/* Search Bar */}
            <div className="nav-center">
              <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Search for electronics, brands, more."
                  className="search-input"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
                <button className="search-btn" type="submit" aria-label="Search">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
           </div>






          {/* Navigation Actions */}
          <div className="nav-actions">
            {/* Navigation Icons */}
            <div className="nav-icons">
              <Link to="/cart" className="nav-icon">
                <span>🛒</span>
                <span className="cart-count">{cartCount ?? 0}</span>
              </Link>


              <Link to="/wishlist" className="nav-icon">
                <span>❤️</span>
                <span className="wishlist-count">{wishlistCount}</span>
              </Link>
            </div>
        

            {/* Auth Buttons or User Menu */}
            {!isAuthenticated ? (
              <div className="auth-buttons">
                <Link to="/login" className="nav-btn login-btn">
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </Link>
                <Link to="/signup" className="nav-btn signup-btn">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="user-menu">
                <div className="user-avatar">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-dropdown">
                  <span className="user-name">
                    {user?.name || 'User'}
                  </span>
                  <div className="dropdown-content">
                    <Link to="/profile" className="dropdown-item">
                      <i className="fas fa-user"></i>
                      Profile
                    </Link>
                    <Link to="/orders" className="dropdown-item">
                      <i className="fas fa-box"></i>
                      Orders
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      <i className="fas fa-cog"></i>
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

    


    
{/* Page Body below your nav */}
{/* Page Body below your nav */}
<div className="container">
  {q ? (
    <>
      {/* Search Results */}
      <h2 className="mt-3">Search results for “{q}”</h2>
      <div className="grid">
        {results.length > 0 ? results.map(p => (
          <article key={resolveId(p)} className="card">
            <div className="image-wrap">
              <img src={p.image} alt={p.name} loading="lazy" />
            </div>
            <div className="content">
              <h3 className="title">{p.name}</h3>
              {/* Actions */}
              <div className="actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(p)}
                  disabled={!p.inStock || addingId === resolveId(p)}
                >
                  {addingId === resolveId(p) ? 'Adding…' : p.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => handleAddToWishlist(p)}
                  disabled={wishId === resolveId(p)}
                >
                  {wishId === resolveId(p) ? 'Adding…' : 'Wishlist'}
                </button>
              </div>
            </div>
          </article>
        )) : (
          <p>No items found. Try keywords like “tv”, “mobile”, “fridge”.</p>
        )}
      </div>
    </>
  ) : (
    <>
      {/* Your normal Home sections go here (hero, featured, etc.) */}
      

      
 


      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ background: slide.background }}
            >
              <div className="hero-content">
                <div className="hero-text">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <div className="hero-actions">
                    <Link to={slide.ctaLink} className="btn-primary">
                      {slide.ctaText}
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                    <button className="hero-button-style">Buy Now</button>
                  </div>
                </div>
                <div className="hero-image">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="hero-product-image"
                  />
                </div>
              </div>
            </div>
          ))}
          
          {/* Slider Controls */}
          <div className="slider-controls">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Quick Categories */}
<section className="quick-categories">
  <div className="container">
    <div className="categories-row">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-item"
          style={{ '--category-color': category.color, cursor: 'pointer' }}
          onClick={() => navigate(category.path)}
          role="button"
          aria-label={`Go to ${category.name}`}
        >
          <div className="category-icon">{category.icon}</div>
          <span>{category.name}</span>
          <small>({category.count} items)</small>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Flash Sale Banner */}
      <section className="flash-sale-banner">
        <div className="sale-content">
          <div className="sale-info">
            <h2 className="sale-title">⚡ Flash Sale</h2>
            <p className="sale-subtitle">Up to 70% off on electronics - Limited time only!</p>
          </div>
          <div className="sale-timer">
            <div className="timer-item">
              <div className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="timer-label">Hours</div>
            </div>
            <div className="timer-item">
              <div className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="timer-label">Minutes</div>
            </div>
            <div className="timer-item">
              <div className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="timer-label">Seconds</div>
            </div>
          </div>
          <Link to="/flash-sale" className="sale-btn">
            Shop Flash Sale
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Electronics</h2>
          <p className="section-subtitle">
            Discover the latest and greatest in electronics technology
          </p>
        </div>

        {isLoading ? (
          <div className="products-loading">
            <div className="loading-grid">
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-img"
                  />

                  {/* Product Badges */}
                  <div className="product-badges">
                    {product.isNew && <span className="product-badge new">New</span>}
                    {product.isFeatured && <span className="product-badge featured">Featured</span>}
                    {product.discount > 0 && (
                      <span className="product-badge discount">{product.discount}% OFF</span>
                    )}
                    {!product.inStock && (
                      <span className="product-badge out-of-stock">Out of Stock</span>
                    )}
                  </div>

                  {/* Product Overlay */}
                  <div className="product-overlay">
                    <Link 
                      to={`/products/${product.id}`}
                      className="overlay-btn"
                      title="Quick View"
                    >
                      <i className="fas fa-eye"></i>
                    </Link>
                  </div>
                </div>

                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>

                  {/* Product Features */}
                  <div className="product-features">
                    {product.features?.slice(0, 2).map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="product-rating">
                    <div className="stars">
                      {renderStars(product.rating)}
                    </div>
                    <span className="rating-text">
                      {product.rating} ({product.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Pricing (unchanged) */}
                  {/* ...your pricing block if any... */}

                  {/* Actions: single Add to Cart + Red Heart */}
                  <div className="product-actions" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button
                      className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(product)}
                      disabled={
                        !product.inStock || addingId === (product._id || product.id || product.productId)
                      }
                    >
                      <i className="fas fa-shopping-cart"></i>
                      {addingId === (product._id || product.id || product.productId)
                        ? 'Adding...'
                        : product.inStock
                        ? 'Add to Cart'
                        : 'Out of Stock'}
                    </button>

                    <button
                      className="like-btn"
                      onClick={() => handleAddToWishlist(product)}
                      title="Add to Wishlist"
                      aria-label="Add to Wishlist"
                      disabled={wishId === (product._id || product.id || product.productId)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #ddd',
                        borderRadius: 6,
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#dc3545'
                      }}
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <div className="feature-content">
                <h3>Free Shipping</h3>
                <p>Free delivery on orders over 199 Rs.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i class="fa-solid fa-lock"></i></div>
              <div className="feature-content">
                <h3>Secure Payment</h3>
                <p>100% secure payment processing</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <div className="feature-content">
                <h3>Warranty Support</h3>
                <p>Extended warranty on all electronics</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i class="fa-solid fa-phone"></i></div>
              <div className="feature-content">
                <h3>24/7 Support</h3>
                <p>Round-the-clock tech support</p>
              </div>
            </div>
          </div>
        </div>
      </section>


</>
  )}
</div>


      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated with BuyTronics</h2>
            <p>Get the latest deals on electronics and be the first to know about new arrivals</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                required
              />
              <button type="submit">Subscribe Now</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-brand">
                <span className="brand-icon">⚡</span>
                BuyTronics
              </div>
              <p>Your trusted destination for cutting-edge electronics and innovative technology solutions.</p>
              <div className="social-links">
                <button className="social-link"><i className="fab fa-facebook-f"></i></button>
                <button className="social-link"><i className="fab fa-twitter"></i></button>
                <button className="social-link"><i className="fab fa-instagram"></i></button>
                <button className="social-link"><i className="fab fa-youtube"></i></button>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Categories</h4>
              <ul>
                <li><Link to="/products/tv">Smart TVs</Link></li>
                <li><Link to="/products/mobile">Smartphones</Link></li>
                <li><Link to="/products/fridge">Refrigerators</Link></li>
                <li><Link to="/products/watch">Smart Watches</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Customer Care</h4>
              <ul>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/shipping">Shipping & Delivery</Link></li>
                <li><Link to="/returns">Returns & Refunds</Link></li>
                <li><Link to="/warranty">Warranty Support</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>About BuyTronics</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 BuyTronics. All rights reserved. | Made  by Urvi Kasbe</p>
          </div>
        </div>
      </footer>
    </div>
  
  );
}

export default Home;
