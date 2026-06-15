const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
    },

    avatar: {
      type: String,
      default: "",
    },

    xp: {
      total: { type: Number, default: 0 },
      studyXP: { type: Number, default: 0 },
      aiXP: { type: Number, default: 0 },
      codeXP: { type: Number, default: 0 },
      quizXP: { type: Number, default: 0 },
    },

    badges: [
      {
        name: String,
        earnedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    streak: {
      current: { type: Number, default: 1 },
      longest: { type: Number, default: 1 },
      lastActive: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);