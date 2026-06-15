const mongoose = require("mongoose");

const studyWorkspaceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    originalContent: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      default: "",
    },

    flashcards: [
      {
        question: String,
        answer: String,
      },
    ],

    generatedQuiz: [
      {
        question: String,
        options: [String],
        answer: Number,
      },
    ],

    studyNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "StudyWorkspace",
  studyWorkspaceSchema
);