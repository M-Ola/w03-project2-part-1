/* const express = require("express");
const router = express.Router();
const passport = require("passport");

// Swagger docs
router.use("/", require("./swagger"));

// Feature routes
router.use("/blogs", require("./blogs"));
router.use("/comments", require("./comments"));

// Custom login route
router.get("/login", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.send(`Logged in as ${req.user.username}`);
  } else {
    // No session → redirect to GitHub OAuth
    res.redirect("/auth/github");
  }
});

// GitHub OAuth
router.get("/auth/github", passport.authenticate("github"));

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login", session: true }),
  (req, res) => {
    res.redirect("/"); // or /api-docs
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});

module.exports = router;




 */

const express = require("express");
const router = express.Router();
const passport = require("passport");

// Feature routes
router.use("/blogs", require("./blogs"));
router.use("/comments", require("./comments"));

// Swagger docs
router.use("/", require("./swagger"));

// Custom login route
router.get("/login", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.send(`Logged in as ${req.user.username}`);
  } else {
    // No session → redirect to GitHub OAuth
    res.redirect("/auth/github");
  }
});

// GitHub OAuth
router.get("/auth/github", passport.authenticate("github"));

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login", session: true }),
  (req, res) => {
    // After successful login, redirect reviewers straight to Swagger UI
    res.redirect("/api-docs");
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      // ✅ Instead of redirecting, send a clear message
      res.send("Logged out");
    });
  });
});

module.exports = router;
