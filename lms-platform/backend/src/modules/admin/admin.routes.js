const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth");
const authorize = require("../../middleware/authorize");
const ctrl = require("./admin.controller");

// Every route here requires a valid session AND the "admin" role
router.use(protect, authorize("admin"));

router.get("/dashboard", ctrl.getDashboardStats);

router.get("/users", ctrl.listUsers);
router.post("/users", ctrl.createUser);
router.patch("/users/:id", ctrl.updateUser);
router.delete("/users/:id", ctrl.deleteUser);

router.get("/courses", ctrl.listCourses);
router.patch("/courses/:id", ctrl.updateCourse);
router.delete("/courses/:id", ctrl.deleteCourse);

router.get("/achievements", ctrl.listAchievements);
router.post("/achievements", ctrl.createAchievement);
router.patch("/achievements/:id", ctrl.updateAchievement);
router.delete("/achievements/:id", ctrl.deleteAchievement);

router.get("/reviews", ctrl.listReviews);
router.delete("/reviews/:id", ctrl.deleteReview);

module.exports = router;
