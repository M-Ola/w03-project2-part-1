
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated. Please log in with GitHub." });
}

module.exports = { isAuthenticated };
