const express = require("express");

const {
  aiChatWithVault,
  generateSummary,
  generateFlashcards,
  generateMindmap,
  generateQuiz,
  explainError,
  reviewCode,
  optimizeCode,
  dryRunCode,
  revisionPlan,
  generateNotes,
  generateChallenge,
} = require("../controllers/ai.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/chat", protect, aiChatWithVault);
router.post("/summary", protect, generateSummary);
router.post("/flashcards", protect, generateFlashcards);
router.post("/mindmap", protect, generateMindmap);
router.post("/generate-quiz", protect, generateQuiz);
router.post("/explain-error", protect, explainError);
router.post("/review-code", protect, reviewCode);
router.post("/optimize-code", protect, optimizeCode);
router.post("/dry-run", protect, dryRunCode);
router.get("/revision-plan", protect, revisionPlan);
router.post("/generate-notes", protect, generateNotes);
router.post("/generate-challenge", protect, generateChallenge);

module.exports = router;