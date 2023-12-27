const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./config/passport");
const cors = require("cors");
const { connectDB } = require("./config/db");
const categoryRoutes = require("./Model/categories");
require("./config/passport");
require('./auth')
// Load environment variables from a .env file if available
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(passport.initialize());

connectDB();

// Routes
app.use("/auth", require("./Routes/auth"));
app.use("/tasks", require("./Routes/routes"));
app.use('/categories', categoryRoutes);

// Route to check authentication
app.get('/auth/check', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true });
    } else {
        res.json({ isAuthenticated: false });
    }
});

// Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('http://localhost:3000/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);
