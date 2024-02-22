const mongoose = require('mongoose');

// Define Task schema
const trackSchema = new mongoose.Schema({
    addCount: {
        type: Number,
        defaultValue: 0,
        required: true
    },
    updateCount: {
        type: Number,
        defaultValue: 0,
        required: true
    },
},
    {
        timestamps: true,
    }

);

// Create Task model
const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
