const mongoose = require('mongoose');

// Connection URL
const mongoURI = process.env.MONGODB_URL;

module.exports.connectToMongoDB=async()=> {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}


