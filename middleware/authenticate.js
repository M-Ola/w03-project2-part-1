//const jwt = require("jsonwebtoken");
 

function isAuthenticated(req, res, next) {
  // Passport adds this helper
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // Not logged in → block access
  res.status(401).json({ error: "Unauthorized. Please log in with GitHub." });
}

module.exports = { isAuthenticated };






