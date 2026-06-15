const CodingChallenge = require("../models/CodingChallenge.model");
const Submission = require("../models/Submission.model");
const { runCodeAgainstTests } = require("../services/judge0.service");

const createChallenge = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      category,
      tags,
      testCases,
      starterCode,
      solution,
      hints,
      xpReward,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const challenge = await CodingChallenge.create({
      title,
      description,
      difficulty,
      category,
      tags,
      testCases,
      starterCode,
      solution,
      hints,
      xpReward,
      creator: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Coding challenge created successfully",
      challenge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Challenge creation failed",
      error: error.message,
    });
  }
};

const getChallenges = async (req, res) => {
  try {
    const challenges = await CodingChallenge.find()
      .populate("creator", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: challenges.length,
      challenges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch challenges",
      error: error.message,
    });
  }
};

const getChallengeById = async (req, res) => {
  try {
    const challenge = await CodingChallenge.findById(req.params.id).populate(
      "creator",
      "name email role"
    );

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    res.status(200).json({
      success: true,
      challenge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch challenge",
      error: error.message,
    });
  }
};

const submitCode = async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        message: "Language and code are required",
      });
    }

    const challenge = await CodingChallenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    const result = await runCodeAgainstTests({
      code,
      language,
      testCases: challenge.testCases,
    });

    const submission = await Submission.create({
      student: req.user.id,
      challenge: challenge._id,
      language,
      code,
      status: result.status,
      testResults: result.testResults,
      score: result.score,
    });

    res.status(201).json({
      success: true,
      message: "Code submitted successfully",
      result,
      submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Code submission failed",
      error: error.message,
    });
  }
};

const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      student: req.user.id,
      challenge: req.params.id,
    })
      .populate("challenge", "title difficulty")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};

module.exports = {
  createChallenge,
  getChallenges,
  getChallengeById,
  submitCode,
  getMySubmissions,
};