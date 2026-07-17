const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth");
const authorize = require("../../middleware/authorize");
const ctrl = require("./tutor.controller");

router.use(protect, authorize("tutor", "admin"));

router.get("/courses", ctrl.getAssignedCourses);
router.get("/courses/:id/submissions", ctrl.getPendingSubmissions);
router.patch("/submissions/:id/feedback", ctrl.giveFeedback);

module.exports = router;
