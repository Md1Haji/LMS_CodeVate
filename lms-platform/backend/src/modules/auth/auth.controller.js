const User = require("../../models/User");
const { generateToken, setTokenCookie } = require("../../utils/generateToken");

// POST /api/auth/register
// Public registration always creates a "student" account by default.
// Instructor/tutor accounts are provisioned by an admin (see admin.controller.js)
// so random visitors can't grant themselves teaching permissions.
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({ name, email, password, role: "student" });
    const token = generateToken(user._id, user.role);
    setTokenCookie(res, token);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
// Common login for every role - the frontend routes users to the right
// dashboard based on the `role` returned here.
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!user.isActive) {
      return res.status(403).json({ message: "This account has been deactivated" });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken(user._id, user.role);
    setTokenCookie(res, token);

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
};
