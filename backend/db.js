const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use MONGO_CONN from your .env file
        const mongoURI = process.env.MONGO_CONN;
        
        if (!mongoURI) {
            throw new Error('MONGO_CONN environment variable is not defined');
        }
        
        console.log('🔗 Attempting to connect to MongoDB Atlas...');
        
        const conn = await mongoose.connect(mongoURI, {
            // These options help with MongoDB Atlas connections
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        
        // More specific error messages
        if (error.message.includes('authentication failed')) {
            console.error('🔐 Check your MongoDB username and password');
        } else if (error.message.includes('network')) {
            console.error('🌐 Check your internet connection and MongoDB Atlas network access');
        }
        
        process.exit(1);
    }
};

module.exports = connectDB;
