const Course = require("../models/Course.model");
const Lecture = require("../models/Lecture.model");
const Enrollment = require("../models/Enrollment.model");

const createCourse = async (req, res) => {
  try {
    const { title, description, thumbnail, category, difficulty } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      thumbnail,
      category,
      difficulty,
      instructor: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Course creation failed",
      error: error.message,
    });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate("instructor", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email role")
      .populate("modules.lectures");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

const addLecture = async (req, res) => {
  try {
    const { title, description, videoUrl, notesUrl, duration, order, moduleTitle } = req.body;
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only course instructor can add lectures",
      });
    }

    const lecture = await Lecture.create({
      course: courseId,
      title,
      description,
      videoUrl,
      notesUrl,
      duration,
      order,
    });

    if (course.modules.length === 0) {
      course.modules.push({
        title: moduleTitle || "Module 1",
        order: 1,
        lectures: [lecture._id],
      });
    } else {
      course.modules[0].lectures.push(lecture._id);
    }

    await course.save();

    res.status(201).json({
      success: true,
      message: "Lecture added successfully",
      lecture,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lecture creation failed",
      error: error.message,
    });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const alreadyEnrolled = await Enrollment.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(409).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }

    const enrollment = await Enrollment.create({
      student: req.user.id,
      course: courseId,
    });

    course.enrollmentCount += 1;
    await course.save();

    res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Enrollment failed",
      error: error.message,
    });
  }
};

const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate("course")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollments",
      error: error.message,
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  addLecture,
  enrollCourse,
  getMyEnrollments,
};