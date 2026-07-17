const Course = require("../../models/Course");
const Assignment = require("../../models/Assignment");
const Submission = require("../../models/Submission");
const Enrollment = require("../../models/Enrollment");

// GET /api/instructor/courses - courses owned by the logged-in instructor
exports.getMyCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).sort({ createdAt: -1 });
    res.json({ courses });
  } catch (err) {
    next(err);
  }
};

// POST /api/instructor/courses
exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create({ ...req.body, instructor: req.user._id });
    res.status(201).json({ course });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/instructor/courses/:id
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, instructor: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!course) return res.status(404).json({ message: "Course not found or not owned by you" });
    res.json({ course });
  } catch (err) {
    next(err);
  }
};

// POST /api/instructor/courses/:id/tutors - assign a tutor to help with a course
exports.assignTutor = async (req, res, next) => {
  try {
    const { tutorId } = req.body;
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, instructor: req.user._id },
      { $addToSet: { tutors: tutorId } },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: "Course not found or not owned by you" });
    res.json({ course });
  } catch (err) {
    next(err);
  }
};

// POST /api/instructor/assignments
exports.createAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ assignment });
  } catch (err) {
    next(err);
  }
};

// GET /api/instructor/courses/:id/roster
exports.getCourseRoster = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.id }).populate("student", "name email");
    res.json({ enrollments });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/instructor/submissions/:id/grade
exports.gradeSubmission = async (req, res, next) => {
  try {
    const { score, feedback } = req.body;
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { score, feedback, gradedBy: req.user._id, status: "graded" },
      { new: true }
    );
    if (!submission) return res.status(404).json({ message: "Submission not found" });
    res.json({ submission });
  } catch (err) {
    next(err);
  }
};
