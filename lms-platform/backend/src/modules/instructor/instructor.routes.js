const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth");
const authorize = require("../../middleware/authorize");

// All instructor routes require authentication and instructor role
router.use(protect, authorize("instructor", "admin"));

// TODO: Implement instructor endpoints

module.exports = router;
