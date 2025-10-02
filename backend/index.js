// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDB = require('./db');

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// ADD HEALTH ROUTES HERE (before other routes and before error handler)
app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }));
app.get('/health', (req, res) => res.json({ ok: true, ts: Date.now(), note: 'no-prefix' }));

// Routes
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Root test route (already in your file)
app.get('/', (req, res) => {
  res.json({
    message: 'E-commerce API is running!',
    timestamp: new Date().toISOString(),
    env_check: { port: !!process.env.PORT, mongo: !!process.env.MONGO_CONN, jwt: !!process.env.JWT_SECRET }
  });
});

// Error handler (keep this after routes)
app.use((error, req, res, next) => {
  console.error('💥 Unhandled error:', error);
  res.status(500).json({ message: 'Internal server error', error: error.message });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Test URL: http://localhost:${PORT}`);
});
