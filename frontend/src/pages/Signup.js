import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log('📝 Attempting signup...', formData.name, formData.email);

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('📥 Response status:', response.status);
            const data = await response.json();
            console.log('📥 Response data:', data);

            if (response.ok) {
                console.log('✅ Registration successful:', data);
                alert(`Welcome to BuyTronics, ${formData.name}! 🎉 Please login to continue.`);
                
                // Navigate to login page
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed');
                console.error('❌ Registration failed:', data.message);
            }
        } catch (error) {
            setError('Network error. Please try again.');
            console.error('💥 Registration error:', error);
        }
        setLoading(false);
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="brand-header">
                    <Link to="/" className="brand-link">
                        <span className="brand-icon">⚡</span>
                        <span className="brand-name">BuyTronics</span>
                    </Link>
                </div>

                <h1 className="signup-title">Join BuyTronics</h1>
                <p className="signup-subtitle">Create your account and start shopping!</p>
                
                {error && <div className="error-message">❌ {error}</div>}
                
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="name">
                            <strong>👤 Full Name</strong>
                        </label>
                        <input  
                            type="text" 
                            id="name"  
                            name="name" 
                            placeholder="Enter your full name" 
                            autoComplete="name"  
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            <strong>📧 Email Address</strong>
                        </label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <strong>🔒 Password</strong>
                        </label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password (min 6 characters)"
                            autoComplete="new-password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            minLength="6"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Creating Account...
                            </>
                        ) : (
                            <>🚀 Create Account</>
                        )}
                    </button>

                    <div className="divider">
                        <span>or</span>
                    </div>

                    <p className="login-link">Already have an account?</p>
                    
                    <Link to="/login" className="btn btn-secondary">
                        🔓 Login to Your Account
                    </Link>

                    <div className="home-link">
                        <Link to="/">← Back to Home</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
