require("dotenv").config({})
const { connectToMongoDB } = require("./config/dbConfig");
connectToMongoDB()


const express = require('express');
const cors = require('cors')
const taskRouter = require("./routes/task.routes");
const Track = require("./models/track.model");


const app = express();
const PORT = process.env.PORT || 5000;
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// Middleware to track hits to API endpoints and update counts
app.use(async (req, res, next) => {
    try {
        if (req.method === 'POST') {
            await Track.findOneAndUpdate({}, { $inc: { addCount: 1 } }, { upsert: true });
        } else if (req.method === 'PUT') {
            await Track.findOneAndUpdate({}, { $inc: { updateCount: 1 } }, { upsert: true });
        }
        next();
    } catch (error) {
        console.error('Error updating track counts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.use(cors({
    origin: true
}))

// Routes
app.get("/", (req, res) => {
    res.send('Application running!')
})

app.use("/api/v1", taskRouter)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
