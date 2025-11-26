const express = require("express");
const mongodb = require("./data/database");
const app = express();
const passport = require("./config/passport")
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallbackSecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS with cookies
app.use(
  cors({
    origin: "https://your-app.onrender.com", // or localhost during dev
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

// Mount routes (Swagger, blogs, comments, auth, etc.)
app.use("/", require("./routes"));

// Start server after DB init
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected. Node running on port ${port}`);
    });
  }
});
