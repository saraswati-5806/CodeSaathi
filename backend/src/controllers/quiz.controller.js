const Quiz = require("../models/Quiz.model");
const QuizAttempt = require("../models/QuizAttempt.model");
const QuestionBank = require("../models/QuestionBank.model");
const Course = require("../models/Course.model");

const createQuiz = async (req, res) => {
  try {
    const {
      title,
      description,
      course,
      questions,
      timeLimitMinutes,
      passingScore,
      startAt,
      endAt,
      isPublished,
    } = req.body;

    if (!title || !course || !questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Title, course and questions are required",
      });
    }

    const courseExists = await Course.findById(course);

    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (courseExists.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only course instructor can create quiz",
      });
    }

    const quiz = await Quiz.create({
      title,
      description,
      course,
      instructor: req.user.id,
      questions,
      timeLimitMinutes,
      passingScore,
      startAt,
      endAt,
      isPublished,
      quizType: "manual",
    });

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Quiz creation failed",
      error: error.message,
    });
  }
};

const getCourseQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      course: req.params.courseId,
      isPublished: true,
    })
      .populate("course", "title")
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quizzes.length,
      quizzes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quizzes",
      error: error.message,
    });
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("course", "title")
      .populate("instructor", "name email");

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    const safeQuiz = quiz.toObject();
    safeQuiz.questions = safeQuiz.questions.map((q) => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options,
      marks: q.marks,
    }));

    res.status(200).json({
      success: true,
      quiz: safeQuiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz",
      error: error.message,
    });
  }
};

const attemptQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers array is required",
      });
    }

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    const now = new Date();

    if (quiz.startAt && now < new Date(quiz.startAt)) {
      return res.status(403).json({
        success: false,
        message: "Quiz has not started yet",
      });
    }

    if (quiz.endAt && now > new Date(quiz.endAt)) {
      return res.status(403).json({
        success: false,
        message: "Quiz has ended",
      });
    }

    let correctAnswers = 0;

    const evaluatedAnswers = answers.map((answer) => {
      const question = quiz.questions[answer.questionIndex];

      const isCorrect =
        question &&
        question.correctOptionIndex === answer.selectedOptionIndex;

      if (isCorrect) correctAnswers += 1;

      return {
        questionIndex: answer.questionIndex,
        selectedOptionIndex: answer.selectedOptionIndex,
        isCorrect,
      };
    });

    const totalQuestions = quiz.questions.length;
    const score =
      totalQuestions === 0
        ? 0
        : Math.round((correctAnswers / totalQuestions) * 100);

    const status = score >= quiz.passingScore ? "passed" : "failed";

    const attempt = await QuizAttempt.create({
      quiz: quiz._id,
      student: req.user.id,
      answers: evaluatedAnswers,
      totalQuestions,
      correctAnswers,
      score,
      status,
      submittedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Quiz submitted successfully",
      result: {
        score,
        correctAnswers,
        totalQuestions,
        status,
        passingScore: quiz.passingScore,
      },
      attempt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Quiz attempt failed",
      error: error.message,
    });
  }
};

const getMyQuizAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({
      student: req.user.id,
    })
      .populate("quiz", "title course")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      attempts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz attempts",
      error: error.message,
    });
  }
};

const addQuestionToBank = async (req, res) => {
  try {
    const {
      course,
      topic,
      difficulty,
      questionText,
      options,
      correctOptionIndex,
      explanation,
      marks,
    } = req.body;

    if (!course || !topic || !questionText || !options) {
      return res.status(400).json({
        success: false,
        message: "Course, topic, question and options are required",
      });
    }

    const courseExists = await Course.findById(course);

    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (courseExists.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only course instructor can add questions",
      });
    }

    const question = await QuestionBank.create({
      instructor: req.user.id,
      course,
      topic,
      difficulty,
      questionText,
      options,
      correctOptionIndex,
      explanation,
      marks,
      source: "manual",
    });

    res.status(201).json({
      success: true,
      message: "Question added to question bank",
      question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Question bank creation failed",
      error: error.message,
    });
  }
};

module.exports = {
  createQuiz,
  getCourseQuizzes,
  getQuizById,
  attemptQuiz,
  getMyQuizAttempts,
  addQuestionToBank,
};