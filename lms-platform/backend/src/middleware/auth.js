const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verifies JWT (from httpOnly cookie or Authorization header) and attaches req.user
const protect = async (req, res, next) => {
  try {
    let token;
    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authenticated. Please log in." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Account not found or deactivated" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
};

module.exports = { protect };
