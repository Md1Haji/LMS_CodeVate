const mongoose = require("mongoose");

// Powers the public landing page's "our achievements" / feature-comparison section
// and per-user badges (e.g. "Top Tutor", "Course Completion Streak").
const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String, default: "" },
    category: { type: String, enum: ["platform", "student", "instructor", "tutor"], default: "platform" },
    metricValue: { type: String }, // e.g. "50,000+ learners", "4.8/5 average rating"
    displayOnLanding: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);
