const Course = require("../../models/Course");
const Enrollment = require("../../models/Enrollment");
const Assignment = require("../../models/Assignment");
const Submission = require("../../models/Submission");
const Review = require("../../models/Review");

// GET /api/student/courses/browse - publicly published courses available to enroll
exports.browseCourses = async (req, res, next) => {
  try {
    const { category, level, search } = req.query;
    const filter = { status: "published" };
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) filter.title = new RegExp(search, "i");

    const courses = await Course.find(filter).populate("instructor", "name");
    res.json({ courses });
  } catch (err) {
    next(err);
  }
};

// POST /api/student/courses/:id/enroll
exports.enroll = async (req, res, next) => {
  try {
    const existing = await Enrollment.findOne({ student: req.user._id, course: req.params.id });
    if (existing) return res.status(409).json({ message: "Already enrolled in this course" });

    const enrollment = await Enrollment.create({ student: req.user._id, course: req.params.id });
    res.status(201).json({ enrollment });
  } catch (err) {
    next(err);
  }
};

// GET /api/student/my-courses
exports.getMyCourses = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate("course");
    res.json({ enrollments });
  } catch (err) {
    next(err);
  }
};

// POST /api/student/assignments/:id/submit
exports.submitAssignment = async (req, res, next) => {
  try {
    const { fileUrl } = req.body;
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    const isLate = new Date() > assignment.dueDate;
    const submission = await Submission.create({
      assignment: assignment._id,
      student: req.user._id,
      fileUrl,
      status: isLate ? "late" : "submitted",
    });
    res.status(201).json({ submission });
  } catch (err) {
    next(err);
  }
};

// POST /api/student/courses/:id/review
exports.reviewCourse = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.create({ course: req.params.id, student: req.user._id, rating, comment });

    const stats = await Review.aggregate([
      { $match: { course: review.course } },
      { $group: { _id: "$course", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);
    if (stats.length) {
      await Course.findByIdAndUpdate(review.course, {
        ratingAverage: stats[0].avg,
        ratingCount: stats[0].count,
      });
    }

    res.status(201).json({ review });
  } catch (err) {
    next(err);
  }
};
