const express = require("express");
const router = express.Router();
const passport = require("passport");

// API routes
router.use("/blogs", require("./blogs"));
router.use("/comments", require("./comments"));

// Swagger docs
router.use("/api-docs", require("./swagger"));


// Start GitHub OAuth
router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Home route — check login status
router.get("/", (req, res) => {
  if (req.isAuthenticated?.()) {
    return res.send(`Logged in as ${req.user.username}`);
  }

  // Not logged in → go to login
  return res.redirect("/login");
});

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true
  }),
  (req, res) => {
    return res.redirect("/");
  }
);

// Logout
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
