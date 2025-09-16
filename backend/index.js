const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');

// Load environment variables FIRST - before any other imports that might use them
require('dotenv').config();

console.log('🔍 Environment Variables Debug:');
console.log('PORT:', process.env.PORT);
console.log('MONGO_CONN:', process.env.MONGO_CONN ? '✅ Loaded' : '❌ Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Loaded' : '❌ Missing');

// If JWT_SECRET is missing, show detailed info
if (!process.env.JWT_SECRET) {
    console.error('❌ CRITICAL: JWT_SECRET is not defined!');
    console.error('📁 Current working directory:', process.cwd());
    console.error('📁 Looking for .env file at:', process.cwd() + '/.env');
    
    // Check if .env file exists
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(process.cwd(), '.env');
    
    if (fs.existsSync(envPath)) {
        console.log('✅ .env file found');
        console.log('📄 .env file contents:');
        const envContent = fs.readFileSync(envPath, 'utf8');
        console.log(envContent.split('\n').map(line => 
            line.includes('MONGO_CONN') ? 'MONGO_CONN=***HIDDEN***' : line
        ).join('\n'));
    } else {
        console.error('❌ .env file NOT FOUND at:', envPath);
    }
}

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'E-commerce API is running!',
        timestamp: new Date().toISOString(),
        env_check: {
            port: !!process.env.PORT,
            mongo: !!process.env.MONGO_CONN,
            jwt: !!process.env.JWT_SECRET
        }
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('💥 Unhandled error:', error);
    res.status(500).json({
        message: 'Internal server error',
        error: error.message
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Test URL: http://localhost:${PORT}`);
});
