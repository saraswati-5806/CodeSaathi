const LiveClass = require("../models/LiveClass.model");
const Course = require("../models/Course.model");

const createLiveClass = async (req, res) => {
  try {
    const { course, title, description, scheduledAt, durationMinutes, meetingLink } = req.body;

    if (!course || !title || !scheduledAt || !meetingLink) {
      return res.status(400).json({
        success: false,
        message: "Course, title, scheduled date and meeting link are required",
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
        message: "Only course instructor can schedule live class",
      });
    }

    const liveClass = await LiveClass.create({
      course,
      instructor: req.user.id,
      title,
      description,
      scheduledAt,
      durationMinutes,
      meetingLink,
    });

    res.status(201).json({
      success: true,
      message: "Live class scheduled successfully",
      liveClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Live class creation failed",
      error: error.message,
    });
  }
};

const getUpcomingLiveClasses = async (req, res) => {
  try {
    const liveClasses = await LiveClass.find({
      status: { $in: ["scheduled", "live"] },
    })
      .populate("course", "title category difficulty")
      .populate("instructor", "name email")
      .sort({ scheduledAt: 1 });

    res.status(200).json({
      success: true,
      count: liveClasses.length,
      liveClasses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch live classes",
      error: error.message,
    });
  }
};

const updateLiveClassStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["scheduled", "live", "completed", "cancelled"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid live class status",
      });
    }

    const liveClass = await LiveClass.findById(req.params.id);

    if (!liveClass) {
      return res.status(404).json({
        success: false,
        message: "Live class not found",
      });
    }

    if (liveClass.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only instructor can update this live class",
      });
    }

    liveClass.status = status;
    await liveClass.save();

    res.status(200).json({
      success: true,
      message: "Live class status updated",
      liveClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update live class",
      error: error.message,
    });
  }
};

module.exports = {
  createLiveClass,
  getUpcomingLiveClasses,
  updateLiveClassStatus,
};