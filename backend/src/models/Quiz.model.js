const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questions: [
      {
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
        marks: {
          type: Number,
          default: 1,
        },
      },
    ],

    timeLimitMinutes: {
      type: Number,
      default: 10,
    },

    passingScore: {
      type: Number,
      default: 50,
    },

    startAt: {
      type: Date,
      default: null,
    },

    endAt: {
      type: Date,
      default: null,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    isAIGenerated: {
      type: Boolean,
      default: false,
    },

    quizType: {
      type: String,
      enum: ["manual", "ai-generated", "question-bank"],
      default: "manual",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);