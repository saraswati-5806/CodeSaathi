const mongoose = require("mongoose");

const questionBankSchema = new mongoose.Schema(
  {
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    questionText: {
      type: String,
      required: true,
    },

    options: [
      {
        type: String,
        required: true,
      },
    ],

    correctOptionIndex: {
      type: Number,
      required: true,
    },

    explanation: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      enum: ["manual", "ai"],
      default: "manual",
    },

    marks: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuestionBank", questionBankSchema);