const express = require("express");
const mongodb = require("./data/database");
const app = express();
const passport = require("./config/passport");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());


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


app.use(passport.initialize());
app.use(passport.session());


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


app.use("/", require("./routes"));


app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true, 
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
