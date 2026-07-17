const mongoose = require("mongoose");

// Join table between a student and a course, tracking progress.
const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },
    completedLessons: [{ type: String }],
    status: { type: String, enum: ["active", "completed", "dropped"], default: "active" },
    enrolledAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
