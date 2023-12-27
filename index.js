const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./config/passport");
const cors = require("cors");
const { connectDB } = require("./config/db");
const categoryRoutes = require("./Model/categories");
require("./config/passport");
require("./auth");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3500",
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(bodyParser.json());
app.use(passport.initialize());

connectDB();

app.use("/auth", require("./Routes/auth"));
app.use("/tasks", require("./Routes/routes"));
app.use("/categories", categoryRoutes);

// Your existing route for checking authentication

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
