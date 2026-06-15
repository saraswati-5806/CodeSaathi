const mongoose = require("mongoose");

const vaultResourceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["note", "pdf", "youtube", "url"],
      default: "note",
    },
    originalUrl: {
      type: String,
      default: "",
    },
    extractedText: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      default: "",
    },
    chunkCount: {
      type: Number,
      default: 0,
    },
    isProcessed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VaultResource", vaultResourceSchema);