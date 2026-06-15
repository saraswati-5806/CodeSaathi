const StudyWorkspace = require("../models/StudyWorkspace.model");

const createWorkspace = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const workspace = await StudyWorkspace.create({
      student: req.user.id,
      title,
      originalContent: content,
    });

    res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Workspace creation failed",
      error: error.message,
    });
  }
};

const generateSummary = async (req, res) => {
  try {
    const workspace = await StudyWorkspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    workspace.summary =
      workspace.originalContent.substring(0, 250) + "...";

    await workspace.save();

    res.status(200).json({
      success: true,
      summary: workspace.summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Summary generation failed",
      error: error.message,
    });
  }
};

const generateFlashcards = async (req, res) => {
  try {
    const workspace = await StudyWorkspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    workspace.flashcards = [
      {
        question: "What is the main topic?",
        answer: workspace.title,
      },
      {
        question: "Key concept?",
        answer: workspace.originalContent.substring(0, 100),
      },
    ];

    await workspace.save();

    res.status(200).json({
      success: true,
      flashcards: workspace.flashcards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Flashcard generation failed",
      error: error.message,
    });
  }
};

const generateStudyNotes = async (req, res) => {
  try {
    const workspace = await StudyWorkspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    workspace.studyNotes =
      "Study Notes:\n\n" +
      workspace.originalContent.substring(0, 500);

    await workspace.save();

    res.status(200).json({
      success: true,
      studyNotes: workspace.studyNotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Study notes generation failed",
      error: error.message,
    });
  }
};

const generateQuizFromNotes = async (req, res) => {
  try {
    const workspace = await StudyWorkspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    workspace.generatedQuiz = [
      {
        question: "What is this topic about?",
        options: [
          workspace.title,
          "Networking",
          "Hardware",
          "Database",
        ],
        answer: 0,
      },
    ];

    await workspace.save();

    res.status(200).json({
      success: true,
      quiz: workspace.generatedQuiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Quiz generation failed",
      error: error.message,
    });
  }
};

const getMyWorkspaces = async (req, res) => {
  try {
    const workspaces = await StudyWorkspace.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workspaces.length,
      workspaces,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch workspaces",
      error: error.message,
    });
  }
};

module.exports = {
  createWorkspace,
  generateSummary,
  generateFlashcards,
  generateStudyNotes,
  generateQuizFromNotes,
  getMyWorkspaces,
};