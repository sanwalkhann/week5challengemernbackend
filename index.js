const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./config/passport");

const cors = require("cors");
const { connectDB } = require("./config/db");
require("./config/passport");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

connectDB();

// Routes
app.use("/auth", require("./Routes/auth"));
app.use("/tasks", require("./Routes/routes"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
