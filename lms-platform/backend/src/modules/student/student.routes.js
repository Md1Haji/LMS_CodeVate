const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth");
const authorize = require("../../middleware/authorize");
const ctrl = require("./student.controller");

router.use(protect, authorize("student", "admin"));

router.get("/courses/browse", ctrl.browseCourses);
router.post("/courses/:id/enroll", ctrl.enroll);
router.get("/my-courses", ctrl.getMyCourses);
router.post("/assignments/:id/submit", ctrl.submitAssignment);
router.post("/courses/:id/review", ctrl.reviewCourse);

module.exports = router;
