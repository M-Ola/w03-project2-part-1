const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.use("/", require("./swagger"));
// Feature routes
router.use("/blogs", require("./blogs"));
router.use("/comments", require("./comments"));

// GitHub login (redirects to GitHub)
router.get("/login", passport.authenticate("github"));

// GitHub callback (GitHub redirects here after login)
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    /* #swagger.tags = ['Auth']
       #swagger.summary = 'GitHub OAuth callback'
       #swagger.description = 'Completes GitHub login and returns a JWT token'
       #swagger.responses[200] = {
         description: 'JWT issued after successful login',
         schema: { token: 'string' }
       }
    */

    const payload = {
      id: req.user._id,
      username: req.user.username,
    };

    // Sign token
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // Return token as JSON (Swagger can use this)
    res.json({ token });

    // Successful login
    //res.redirect("/"); // or wherever you want to send the user
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
