const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./config/passport");
const cors = require("cors");
const { connectDB } = require("./config/db");
const categoryRoutes = require("./Model/categories");
require("./config/passport");
require('./auth')
require('dotenv').config();

const app = express();
// to handler cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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

app.get('/auth/google',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  },
  (err, req, res, next) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);
