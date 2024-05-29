const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const dbURI = 'mongodb://localhost:27017/restaurant';

// Connect to MongoDB
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Define a schema for users
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

// Create a model for users
const User = mongoose.model('User', userSchema);

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to Our Restaurant');
});

// Route for user signup
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.send('User signed up successfully');
});

// Route for user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.send('Login successful');
    } else {
        res.send('Invalid username or password');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
