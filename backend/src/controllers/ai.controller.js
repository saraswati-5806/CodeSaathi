const { retrieveRelevantChunks } = require("../services/rag.service");

const aiChatWithVault = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const chunks = await retrieveRelevantChunks({
      studentId: req.user.id,
      query: question,
      limit: 3,
    });

    const context = chunks.map((chunk) => chunk.text).join("\n\n");

    const answer = context
      ? `Based on your Vault notes, here is the relevant context:\n\n${context}\n\nSimple Answer: ${question} is related to the above study material.`
      : "I could not find related content in your Vault. Please add notes or upload study material first.";

    res.status(200).json({
      success: true,
      question,
      answer,
      matchedChunks: chunks.length,
      contextUsed: context,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AI chat failed",
      error: error.message,
    });
  }
};

module.exports = {
  aiChatWithVault,
};