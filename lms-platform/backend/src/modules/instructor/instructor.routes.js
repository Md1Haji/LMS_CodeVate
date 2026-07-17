const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth");
const authorize = require("../../middleware/authorize");
const ctrl = require("./instructor.controller");

router.use(protect, authorize("instructor", "admin"));

router.get("/courses", ctrl.getMyCourses);
router.post("/courses", ctrl.createCourse);
router.patch("/courses/:id", ctrl.updateCourse);
router.post("/courses/:id/tutors", ctrl.assignTutor);
router.get("/courses/:id/roster", ctrl.getCourseRoster);
router.post("/assignments", ctrl.createAssignment);
router.patch("/submissions/:id/grade", ctrl.gradeSubmission);

module.exports = router;
