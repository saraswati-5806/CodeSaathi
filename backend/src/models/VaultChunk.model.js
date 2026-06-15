const mongoose = require("mongoose");

const vaultChunkSchema = new mongoose.Schema(
  {
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VaultResource",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chunkIndex: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    keywords: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("VaultChunk", vaultChunkSchema);