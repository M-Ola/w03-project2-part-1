const express = require("express");
const router = express.Router();
router.use("/", require("./swagger"));
const passport = require("passport");

/* router.get("/", (req, res) => {
  res.send("Hello World");
}); */ 

router.use("/blogs", require("./blogs"));
router.use("/comments", require("./comments"));


router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});








module.exports = router;




