const mongoose = require("mongoose");

const liveClassSchema = new mongoose.Schema(
  {
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
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    durationMinutes: {
      type: Number,
      default: 60,
    },
    meetingLink: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "live", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LiveClass", liveClassSchema);