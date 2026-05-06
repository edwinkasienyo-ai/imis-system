const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token ❌" });
  }

  try {
    const decoded = jwt.verify(token, "imis_secret");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token ❌" });
  }
};

// ROLE BASED ACCESS
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied ❌",
      });
    }
    next();
  };
};