import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Real hero slides data for electronics
  const heroSlides = [
    {
      title: "Latest Samsung 85\" QLED TV",
      subtitle: "Experience cinema-quality picture with 4K Neo QLED technology and smart features",
      image: "https://www.lg.com/images/refrigerators/global/how-it-works/real-life/lfcs27596s.jpg",
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
      image: "https://gscs.lge.com/downloadFile?fileId=ZjGFOHi7xKZKGFEzUgSFhw",
      background: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
      ctaText: "Shop Fridges",
      ctaLink: "/products/fridge"
    }
  ];

  // Real electronics products with actual images and details
  const realProducts = [
    // TVs
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
      image: "https://images.samsung.com/is/image/samsung/p6pim/us/qn75qn85dbfxza/gallery/us-qled-4k-qn85db-qn75qn85dbfxza-537581369?$650_519_PNG$",
      inStock: true,
      isNew: true,
      features: ["4K Neo QLED", "Smart TV", "HDR10+"]
    },
    {
      id: 2,
      name: "LG 65\" OLED C3 Smart TV",
      brand: "LG",
      category: "TV",
      price: 1499,
      originalPrice: 1799,
      discount: 17,
      rating: 4.9,
      reviewCount: 892,
      image: "https://www.lg.com/us/images/tvs/md07513259/gallery/medium01.jpg",
      inStock: true,
      isFeatured: true,
      features: ["OLED Display", "webOS", "Dolby Vision"]
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
      image: "https://electronics.sony.com/image/4dae2ad8e1b96b7e5f5e5a7c32e99a0b?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
      inStock: true,
      features: ["XR OLED", "Google TV", "BRAVIA CORE"]
    },

    // Mobile Phones
    {
      id: 4,
      name: "iPhone 15 Pro Max 256GB",
      brand: "Apple",
      category: "Mobile",
      price: 1199,
      originalPrice: 1299,
      discount: 8,
      rating: 4.8,
      reviewCount: 3421,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-naturaltitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1693009279040",
      inStock: true,
      isNew: true,
      features: ["A17 Pro Chip", "Titanium Design", "48MP Camera"]
    },
    {
      id: 5,
      name: "Samsung Galaxy S24 Ultra 512GB",
      brand: "Samsung",
      category: "Mobile",
      price: 1299,
      originalPrice: 1419,
      discount: 8,
      rating: 4.7,
      reviewCount: 2156,
      image: "https://images.samsung.com/us/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-titanium-violet-back-mo.jpg?imwidth=480",
      inStock: true,
      isFeatured: true,
      features: ["S Pen Included", "200MP Camera", "5G Ready"]
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
      image: "https://lh3.googleusercontent.com/yJO-zva_hZiPGcEikk7w8VNSJw7NM2lH5TRzlcvNvS6RlLcTrBk7xrxkLZf8Mj_J0Gl1VkKbYhqj=w1000",
      inStock: true,
      features: ["Tensor G3", "Magic Eraser", "Night Sight"]
    },

    // Refrigerators
    {
      id: 7,
      name: "LG 28 Cu.Ft French Door Refrigerator",
      brand: "LG",
      category: "Fridge",
      price: 2199,
      originalPrice: 2599,
      discount: 15,
      rating: 4.5,
      reviewCount: 743,
      image: "https://gscs.lge.com/downloadFile?fileId=ZjGFOHi7xKZKGFEzUgSFhw",
      inStock: true,
      isNew: true,
      features: ["InstaView Door", "Smart Cooling", "Energy Star"]
    },
    {
      id: 8,
      name: "Samsung 26 Cu.Ft Side-by-Side Refrigerator",
      brand: "Samsung",
      category: "Fridge",
      price: 1799,
      originalPrice: 2099,
      discount: 14,
      rating: 4.4,
      reviewCount: 892,
      image: "https://images.samsung.com/is/image/samsung/p6pim/us/rs28a500nsr-aa/gallery/us-side-by-side-refrigerator-rs28a500nsr-aa-rperspective-silver-408758675?$650_519_PNG$",
      inStock: true,
      features: ["Twin Cooling Plus", "Ice & Water", "Digital Inverter"]
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
      image: "https://www.whirlpool.com/-/media/Whirlpool-NA/Images/products/111317/111317-4.png?la=en&hash=C8F9E1E8B9A8F7E8D8C8B8A8F7E8D8C8B8A8F7E8",
      inStock: true,
      features: ["FreshFlow Technology", "LED Lighting", "Adjustable Shelves"]
    },

    // Smart Watches
    {
      id: 10,
      name: "Apple Watch Series 9 GPS 45mm",
      brand: "Apple",
      category: "Watch",
      price: 429,
      originalPrice: 459,
      discount: 7,
      rating: 4.8,
      reviewCount: 2847,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-45mm-midnight-aluminum-sport-band-midnight-pdp-image-position-1__en-us?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=1694507270866",
      inStock: true,
      isFeatured: true,
      features: ["S9 SiP", "Always-On Display", "Health Tracking"]
    },
    {
      id: 11,
      name: "Samsung Galaxy Watch6 Classic 47mm",
      brand: "Samsung",
      category: "Watch",
      price: 379,
      originalPrice: 429,
      discount: 12,
      rating: 4.6,
      reviewCount: 1456,
      image: "https://images.samsung.com/is/image/samsung/p6pim/us/sm-r960nzkaxar/gallery/us-galaxy-watch6-classic-47mm-sm-r960nzkaxar-thumb-538316045?$344_344_PNG$",
      inStock: true,
      features: ["Rotating Bezel", "Sleep Tracking", "5ATM Water Resistant"]
    },
    {
      id: 12,
      name: "Garmin Venu 3 GPS Smartwatch",
      brand: "Garmin",
      category: "Watch",
      price: 449,
      originalPrice: 499,
      discount: 10,
      rating: 4.7,
      reviewCount: 987,
      image: "https://static.garmin.com/en/products/010-02784-11/v/cf-lg.jpg",
      inStock: true,
      features: ["GPS Tracking", "Health Snapshot", "14-Day Battery"]
    }
  ];

  // Categories data for electronics
  const categories = [
    { name: "TVs", icon: "📺", count: 45, color: "#667eea", path: "/tv" },
    { name: "Mobile", icon: "📱", count: 120, color: "#ff6b6b", path: "/mobile" },
    { name: "Fridge", icon: "🧊", count: 28, color: "#4ecdc4" },
    { name: "Watch", icon: "⌚", count: 35, color: "#45b7d1" },
    { name: "Laptops", icon: "💻", count: 85, color: "#96ceb4" },
    { name: "Cameras", icon: "📷", count: 54, color: "#54a0ff" }
  ];

  // Flash sale timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // Timer effect
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
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Load products effect
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeaturedProducts(realProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setCartCount(0);
    setWishlistCount(0);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    if (!product.inStock) return;
    
    setCartCount(prev => prev + 1);
    // Show success message or toast
    console.log('Added to cart:', product.name);
  };

  // Handle wishlist
  const handleWishlist = (product) => {
    setWishlistCount(prev => prev + 1);
    console.log('Added to wishlist:', product.name);
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
      >
        ⭐
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
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search for electronics, brands, more." 
                className="search-input"
              />
              <button className="search-btn">
                🔍
              </button>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="nav-actions">
            {/* Navigation Icons */}
            <div className="nav-icons">
              <Link to="/cart" className="nav-icon">
                <span>🛒</span>
                <span className="cart-count">3</span>
              </Link>
              <Link to="/wishlist" className="nav-icon">
                <span>❤️</span>
                <span className="wishlist-count">1</span>
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
                  <i className="fas fa-user-plus"></i>
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
                    <Link to="/products" className="btn-secondary">
                      View All Products
                      <i className="fas fa-external-link-alt"></i>
                    </Link>
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
                style={{ '--category-color': category.color }}
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
                      <button 
                        className="overlay-btn"
                        onClick={() => handleWishlist(product)}
                        title="Add to Wishlist"
                      >
                        <i className="fas fa-heart"></i>
                      </button>
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

                    {/* Pricing */}
                    <div className="product-pricing">
                      <span className="current-price">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="discount-badge">
                          Save ${(product.originalPrice - product.price).toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button 
                      className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      <i className="fas fa-shopping-cart"></i>
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="products-footer">
            <Link to="/products" className="btn-view-all">
              View All Electronics
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
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
                <p>Free delivery on orders over $199</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
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
              <div className="feature-icon">📞</div>
              <div className="feature-content">
                <h3>24/7 Support</h3>
                <p>Round-the-clock tech support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <p>&copy; 2024 BuyTronics. All rights reserved. | Powered by cutting-edge technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
