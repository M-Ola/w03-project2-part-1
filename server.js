// server.js
require("dotenv").config();
const express = require("express");
const mongodb = require("./data/database");
const passport = require("./config/passport");
const session = require("express-session");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on Render
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://your-app.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Mount routes (includes /login, /github/callback, /logout, /api-docs, etc.)
app.use("/", require("./routes"));

// Start server after DB init
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`✅ Database connected. Node running on port ${port}`);
    });
  }
});
