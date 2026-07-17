const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth");
const authorize = require("../../middleware/authorize");

// All tutor routes require authentication and tutor role
router.use(protect, authorize("tutor", "admin"));

// TODO: Implement tutor endpoints

module.exports = router;
