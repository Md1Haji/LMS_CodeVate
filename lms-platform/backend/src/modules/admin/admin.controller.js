const User = require("../../models/User");
const Course = require("../../models/Course");
const Achievement = require("../../models/Achievement");
const Enrollment = require("../../models/Enrollment");
const Review = require("../../models/Review");

// GET /api/admin/dashboard - top-level platform stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalStudents,
      totalInstructors,
      totalTutors,
      totalCourses,
      publishedCourses,
      draftCourses,
      totalEnrollments,
      activeEnrollments,
      recentUsers,
      revenueAgg,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "instructor" }),
      User.countDocuments({ role: "tutor" }),
      Course.countDocuments(),
      Course.countDocuments({ status: "published" }),
      Course.countDocuments({ status: "draft" }),
      Enrollment.countDocuments(),
      Enrollment.countDocuments({ status: "active" }),
      User.find().select("name email role createdAt").sort({ createdAt: -1 }).limit(5),
      Enrollment.aggregate([
        { $lookup: { from: "courses", localField: "course", foreignField: "_id", as: "course" } },
        { $unwind: "$course" },
        { $group: { _id: null, total: { $sum: "$course.price" } } },
      ]),
    ]);

    res.json({
      totalStudents,
      totalInstructors,
      totalTutors,
      totalCourses,
      publishedCourses,
      draftCourses,
      totalEnrollments,
      activeEnrollments,
      recentUsers,
      estimatedRevenue: revenueAgg[0]?.total || 0,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/users - list/filter all users
exports.listUsers = async (req, res, next) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (search) filter.$or = [{ name: new RegExp(search, "i") }, { email: new RegExp(search, "i") }];

    const users = await User.find(filter)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);
    res.json({ users, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/users - admin provisions instructor/tutor/admin accounts
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/admin/users/:id - update role, active status etc.
exports.updateUser = async (req, res, next) => {
  try {
    const { role, isActive, name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...(role && { role }), ...(isActive !== undefined && { isActive }), ...(name && { name }) },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/users/:id
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User removed" });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/courses - list/filter every course on the platform
exports.listCourses = async (req, res, next) => {
  try {
    const { status, category, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) filter.title = new RegExp(search, "i");

    const courses = await Course.find(filter)
      .populate("instructor", "name email")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Course.countDocuments(filter);
    res.json({ courses, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/admin/courses/:id - admin override (status, price, thumbnail, etc.)
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("instructor", "name email");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ course });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/courses/:id
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    await Enrollment.deleteMany({ course: course._id });
    res.json({ message: "Course removed" });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/achievements - manage the platform achievements shown on the public landing page
exports.listAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ achievements });
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/achievements
exports.createAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.create(req.body);
    res.status(201).json({ achievement });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/admin/achievements/:id
exports.updateAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!achievement) return res.status(404).json({ message: "Achievement not found" });
    res.json({ achievement });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/achievements/:id
exports.deleteAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) return res.status(404).json({ message: "Achievement not found" });
    res.json({ message: "Achievement removed" });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/reviews - moderate reviews left on courses
exports.listReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate("student", "name email")
      .populate("course", "title")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ reviews });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/reviews/:id
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review removed" });
  } catch (err) {
    next(err);
  }
};
