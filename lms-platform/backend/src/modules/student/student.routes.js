const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth");
const authorize = require("../../middleware/authorize");

// All student routes require authentication and student role
router.use(protect, authorize("student", "admin"));

// TODO: Implement student endpoints

module.exports = router;
