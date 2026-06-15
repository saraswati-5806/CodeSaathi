const mongoose = require("mongoose");

const xpSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: String,
      enum: [
        "lecture_complete",
        "quiz_pass",
        "code_submit",
        "vault_add",
        "ai_use",
        "study_workspace",
        "live_class_join",
      ],
      required: true,
    },
    xpEarned: {
      type: Number,
      required: true,
    },
    reference: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("XP", xpSchema);