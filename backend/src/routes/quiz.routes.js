const express = require("express");

const {
  createQuiz,
  getCourseQuizzes,
  getQuizById,
  attemptQuiz,
  getMyQuizAttempts,
  addQuestionToBank,
} = require("../controllers/quiz.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");

const router = express.Router();

router.post("/", protect, authorize("instructor"), createQuiz);
router.get("/course/:courseId", protect, getCourseQuizzes);
router.get("/attempts/my", protect, authorize("student"), getMyQuizAttempts);
router.get("/:id", protect, getQuizById);
router.post("/:id/attempt", protect, authorize("student"), attemptQuiz);

router.post(
  "/question-bank",
  protect,
  authorize("instructor"),
  addQuestionToBank
);

module.exports = router;