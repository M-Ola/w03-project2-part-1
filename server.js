const express = require("express");
const mongodb = require("./data/database");
const app = express();
const passport = require("./config/passport");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());

/* -------------------------
   SESSION CONFIG
------------------------- */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

/* -------------------------
   PASSPORT CONFIG
------------------------- */
app.use(passport.initialize());
app.use(passport.session());

/* -------------------------
   CORS CONFIG (FIXED)
------------------------- */
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

/* -------------------------
   ROUTES
------------------------- */
app.use("/", require("./routes"));

/* -------------------------
   GITHUB CALLBACK
------------------------- */
app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true, // IMPORTANT FIX
  }),
  (req, res) => {
    res.redirect("/");
  }
);

/* -------------------------
   START SERVER
------------------------- */
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected. Node running on port ${port}`);
    });
  }
});
