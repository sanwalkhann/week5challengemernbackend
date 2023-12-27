// server.js

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./config/passport"); // Assuming you have a passport configuration
const cors = require("cors");
const { connectDB } = require("./config/db");
const categoryRoutes = require("./Model/categories");

// Importing passport configurations and other necessary modules
require("./config/passport");
require("./auth");
require("dotenv").config();

const app = express();

// Enable CORS for the specified origin
app.use(
  cors({
    origin: "https://hackathonweekfivesanwal.vercel.app",
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(bodyParser.json());
app.use(passport.initialize());

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", require("./Routes/auth"));
app.use("/tasks", require("./Routes/routes"));
app.use("/categories", categoryRoutes);

// Route for checking authentication status
app.get("/auth/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Route for handling Google authentication
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Redirect after successful authentication
    res.redirect("/dashboard");
  },
  (err, req, res, next) => {
    // Handle authentication failure
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
