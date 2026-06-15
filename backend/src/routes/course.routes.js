const express = require("express");

const {
  createCourse,
  getCourses,
  getCourseById,
  addLecture,
  enrollCourse,
  getMyEnrollments,
} = require("../controllers/course.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");

const router = express.Router();

router.get("/", getCourses);
router.get("/my-enrollments", protect, authorize("student"), getMyEnrollments);
router.get("/:id", getCourseById);

router.post("/", protect, authorize("instructor"), createCourse);
router.post("/:id/lectures", protect, authorize("instructor"), addLecture);
router.post("/:id/enroll", protect, authorize("student"), enrollCourse);

module.exports = router;