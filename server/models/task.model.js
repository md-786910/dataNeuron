const mongoose = require('mongoose');

// Define Task schema
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
}

);

// Create Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
