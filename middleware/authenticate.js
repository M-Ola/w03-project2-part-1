const jwt = require("jsonwebtoken");
/* function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated. Please log in with GitHub." });
}

module.exports = { isAuthenticated };
 */

// middleware/authenticate.js


function verifyToken(req, res, next) {
  // Skip JWT check in development/local
  if (process.env.NODE_ENV !== "production") {
    return next();
  }

  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token." });
      }
      req.user = user; // Attach decoded payload to request
      next();
    });
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(500).json({ error: "Internal server error during authentication." });
  }
}


module.exports = { verifyToken };
