import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful login
      const mockUser = {
        id: 1,
        name: formData.email.split('@')[0],
        email: formData.email
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Success animation
      setIsLoading(false);
      
      // Redirect to home
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (error) {
      setIsLoading(false);
      setErrors({ submit: 'Login failed. Please try again.' });
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login coming soon!`);
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@buytronics.com',
      password: 'demo123',
      rememberMe: false
    });
  };

  return (
    <div className="login-container">
      {/* Background Elements */}
      <div className="login-bg">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="floating-icons">
          <div className="floating-icon icon-1">⚡</div>
          <div className="floating-icon icon-2">📱</div>
          <div className="floating-icon icon-3">💻</div>
          <div className="floating-icon icon-4">🎧</div>
        </div>
      </div>

      {/* Login Card */}
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <Link to="/" className="back-home">
            <span className="back-icon">←</span>
            <span className="brand-logo">
              <span className="brand-icon">⚡</span>
              BuyTronics
            </span>
          </Link>
        </div>

        {/* Welcome Section */}
        <div className="login-welcome">
          <h1 className="welcome-title">Welcome Back!</h1>
          <p className="welcome-subtitle">
            Sign in to your account to continue shopping amazing electronics
          </p>
        </div>

        {/* Social Login */}
        <div className="social-login">
          <button 
            type="button"
            className="social-btn google-btn"
            onClick={() => handleSocialLogin('Google')}
          >
            <span className="social-icon"><i class="fa-brands fa-google"></i></span>
            Continue with Google
          </button>
          
          <button 
            type="button"
            className="social-btn facebook-btn"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <span className="social-icon"><i class="fa-brands fa-facebook"></i></span>
            Continue with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="login-divider">
          <span className="divider-text">or sign in with email</span>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              {errors.submit}
            </div>
          )}

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <span className="error-text">
                <span className="error-icon">⚠️</span>
                {errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'hide' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <span className="error-text">
                <span className="error-icon">⚠️</span>
                {errors.password}
              </span>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              Remember me
            </label>
            
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Signing In...
              </>
            ) : (
              <>
                <span className="btn-icon">🚀</span>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p className="signup-prompt">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Help Section */}
        <div className="help-section">
          <p className="help-text">Need help?</p>
          <div className="help-links">
            <Link to="/contact" className="help-link">Contact Support</Link>
            <span className="help-divider">•</span>
            <Link to="/help" className="help-link">Help Center</Link>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {isLoading && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="success-icon">✅</div>
            <h3>Welcome Back!</h3>
            <p>Redirecting to dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;