const mongoose = require("mongoose");

// Owned/taught by an instructor; tutors can be assigned as supporting staff.
const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnailUrl: { type: String, default: "" },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    price: { type: Number, default: 0 },

    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tutors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    modules: [
      {
        title: { type: String, required: true },
        lessons: [
          {
            title: { type: String, required: true },
            contentUrl: { type: String },
            durationMinutes: { type: Number, default: 0 },
          },
        ],
      },
    ],

    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
