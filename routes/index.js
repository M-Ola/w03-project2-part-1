const express = require("express");
const router = express.Router();
const passport = require("passport");

// API routes
router.use("/blogs", require("./blogs"));
router.use("/comments", require("./comments"));

// Swagger docs
router.use("/", require("./swagger"));

/**
 * ================
 * LOGIN WITH GITHUB
 * ================
 */

// Start GitHub login
router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Home route — check login status
router.get("/", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.send(`Logged in as ${req.user.username}`);
  }

  // If not logged in → start GitHub login
  res.redirect("/login");
});

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true, // IMPORTANT: GitHub OAuth uses session
  }),
  (req, res) => {
    res.redirect("/"); // Redirect home after login
  }
);

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.send("Logged out");
    });
  });
});




module.exports = router;
