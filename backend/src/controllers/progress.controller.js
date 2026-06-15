const Enrollment = require("../models/Enrollment.model");
const QuizAttempt = require("../models/QuizAttempt.model");
const Submission = require("../models/Submission.model");

const getMyProgress = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user.id,
    });

    const quizzes = await QuizAttempt.find({
      student: req.user.id,
    });

    const coding = await Submission.find({
      student: req.user.id,
    });

    res.status(200).json({
      success: true,
      analytics: {
        enrolledCourses: enrollments.length,
        completedCourses: enrollments.filter(
          (e) => e.status === "completed"
        ).length,
        quizzesAttempted: quizzes.length,
        codingSubmissions: coding.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getMyProgress,
};