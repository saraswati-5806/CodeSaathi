const User = require("../models/User.model");
const XP = require("../models/XP.model");
const { awardXP } = require("../services/xp.service");

const getLeaderboard = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("name email xp badges streak")
      .sort({ "xp.total": -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      leaderboard: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard",
      error: error.message,
    });
  }
};

const getMyXP = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email xp badges streak");

    const history = await XP.find({ student: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      profile: user,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch XP profile",
      error: error.message,
    });
  }
};

const awardDemoXP = async (req, res) => {
  try {
    const { event, xpEarned, reference } = req.body;

    const updatedUser = await awardXP({
      studentId: req.user.id,
      event: event || "study_workspace",
      xpEarned: Number(xpEarned || 25),
      reference: reference || "manual-demo",
    });

    res.status(200).json({
      success: true,
      message: "XP awarded successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to award XP",
      error: error.message,
    });
  }
};

module.exports = {
  getLeaderboard,
  getMyXP,
  awardDemoXP,
};