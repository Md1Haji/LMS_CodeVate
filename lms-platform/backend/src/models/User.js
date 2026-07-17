const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// One collection for all people in the system, differentiated by `role`.
// Role-specific extra fields live in `profile` so we don't need 4 separate
// login systems - auth stays common, dashboards branch on role.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: {
      type: String,
      enum: ["admin", "instructor", "tutor", "student"],
      default: "student",
      required: true,
    },
    avatarUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },

    // Role-specific profile data
    profile: {
      bio: { type: String, default: "" },
      phone: { type: String, default: "" },
      // instructor / tutor specific
      subjects: [{ type: String }],
      qualifications: [{ type: String }],
      rating: { type: Number, default: 0, min: 0, max: 5 },
      // student specific
      grade: { type: String, default: "" },
      enrolledCoursesCount: { type: Number, default: 0 },
    },

    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Achievement" }],
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.index({ role: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
