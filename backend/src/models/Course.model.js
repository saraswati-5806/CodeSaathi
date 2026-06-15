const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
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

    thumbnail: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "Programming",
    },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    modules: [
      {
        title: String,
        order: Number,
        lectures: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture",
          },
        ],
      },
    ],

    resources: [
      {
        title: String,
        type: String,
        url: String,
      },
    ],

    isPublished: {
      type: Boolean,
      default: true,
    },

    enrollmentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);