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
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());

connectDB();

app.use("/auth", require("./Routes/auth"));
app.use("/tasks", require("./Routes/routes"));
app.use("/categories", categoryRoutes);

app.get("/auth/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  },
  (err, req, res, next) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
