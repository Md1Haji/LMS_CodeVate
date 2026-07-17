const Course = require("../../models/Course");
const Submission = require("../../models/Submission");
const Assignment = require("../../models/Assignment");

// GET /api/tutor/courses - courses this tutor has been assigned to support
exports.getAssignedCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ tutors: req.user._id }).populate("instructor", "name email");
    res.json({ courses });
  } catch (err) {
    next(err);
  }
};

// GET /api/tutor/courses/:id/submissions - submissions pending review for a course
exports.getPendingSubmissions = async (req, res, next) => {
  try {
    const course = await Course.findOne({ _id: req.params.id, tutors: req.user._id });
    if (!course) return res.status(403).json({ message: "You are not assigned to this course" });

    const assignments = await Assignment.find({ course: course._id }).select("_id");
    const submissions = await Submission.find({
      assignment: { $in: assignments.map((a) => a._id) },
      status: "submitted",
    }).populate("student", "name email");

    res.json({ submissions });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/tutor/submissions/:id/feedback - tutors can give feedback, final grade signed off by instructor
exports.giveFeedback = async (req, res, next) => {
  try {
    const { feedback } = req.body;
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { feedback },
      { new: true }
    );
    if (!submission) return res.status(404).json({ message: "Submission not found" });
    res.json({ submission });
  } catch (err) {
    next(err);
  }
};
