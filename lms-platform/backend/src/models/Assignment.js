const mongoose = require("mongoose");

// Created by instructor/tutor for a course, graded submissions live in Submission.
const assignmentSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    maxScore: { type: Number, default: 100 },
    attachmentUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
