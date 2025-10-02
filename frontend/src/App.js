// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TVs from './pages/TVs';
import Mobile from './pages/Mobile';
import Fridge from './pages/Fridge';
import Watch from './pages/Watch';
import Laptop from './pages/Laptop';
import Camera from './pages/Camera';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

// Import Navbar component (new)
import Navbar from './components/Navbar';

function App() {
  console.log('🚀 BuyTronics App loaded');

  return (
    <Router>
      <div className="App">
        {/* Place Navbar above Routes so it shows on every page */}
        <Navbar />

        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Signup />} />

          {/* Category Routes */}
          <Route path="/tv" element={<TVs />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/fridge" element={<Fridge />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/laptops" element={<Laptop />} />
          <Route path="/cameras" element={<Camera />} />

          {/* Product Details */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Cart and Wishlist */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
