require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");

// Module routes - each folder below is owned by a different team member
const authRoutes = require("./src/modules/auth/auth.routes");
const adminRoutes = require("./src/modules/admin/admin.routes");
const tutorRoutes = require("./src/modules/tutor/tutor.routes");
const instructorRoutes = require("./src/modules/instructor/instructor.routes");
const studentRoutes = require("./src/modules/student/student.routes");

const app = express();

connectDB();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Basic rate limiting on auth routes to slow down brute force attempts
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/auth", authLimiter, authRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/student", studentRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));

app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`LMS API running on port ${PORT}`));
