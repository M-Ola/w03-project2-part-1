const express = require("express");
const router = express.Router();
const passport = require("passport");


router.use("/", require("./swagger"));
// Feature routes
router.use("/blogs", require("./blogs"));
router.use("/comments", require("./comments"));

// GitHub login (redirects to GitHub)
router.get("/login", passport.authenticate("github", { scope: ["user:email"] }));

// GitHub callback (GitHub redirects here after login)
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful login
    res.redirect("/"); // or wherever you want to send the user
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
});





module.exports = router;




