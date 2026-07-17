require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Achievement = require("../models/Achievement");

// Run with: npm run seed  (creates one account per role + sample achievements)
(async () => {
  await connectDB();

  await User.deleteMany({ email: { $regex: "@lms.local$" } });

  const users = await User.create([
    { name: "Site Admin", email: "admin@lms.local", password: "Password123!", role: "admin" },
    { name: "Ada Instructor", email: "instructor@lms.local", password: "Password123!", role: "instructor" },
    { name: "Theo Tutor", email: "tutor@lms.local", password: "Password123!", role: "tutor" },
    { name: "Sam Student", email: "student@lms.local", password: "Password123!", role: "student" },
  ]);

  await Achievement.create([
    { title: "12,400+ active learners", description: "Learners currently active on the platform", category: "platform", displayOnLanding: true, displayOrder: 1 },
    { title: "860+ published courses", description: "Live courses across all categories", category: "platform", displayOnLanding: true, displayOrder: 2 },
  ]);

  console.log("Seeded users:", users.map((u) => `${u.email} / Password123!`));
  await mongoose.disconnect();
  process.exit(0);
})();
