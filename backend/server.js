// backend/server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // Add route import
const clothRoutes = require('./routes/prodClothesRoutes');
const artRoutes = require('./routes/prodArtRoutes');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes); // Add authentication routes
app.use('/api/clothes', clothRoutes);
app.use('/api/art', artRoutes );


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
