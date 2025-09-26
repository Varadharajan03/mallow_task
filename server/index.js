const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// --- Import Route Files ---
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env file
dotenv.config();

// Establish connection to the MongoDB database
connectDB();

const app = express();

// --- Middleware Setup ---
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// --- API Routes ---
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);

// --- Global Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});

