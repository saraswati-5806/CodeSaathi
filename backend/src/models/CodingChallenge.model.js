const mongoose = require("mongoose");

const codingChallengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    category: {
      type: String,
      default: "Programming",
    },

    tags: [String],

    testCases: [
      {
        input: String,
        expectedOutput: String,
        isHidden: {
          type: Boolean,
          default: false,
        },
      },
    ],

    starterCode: {
      javascript: String,
      python: String,
      cpp: String,
      java: String,
    },

    solution: {
      type: String,
      default: "",
    },

    hints: [String],

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    xpReward: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CodingChallenge", codingChallengeSchema);