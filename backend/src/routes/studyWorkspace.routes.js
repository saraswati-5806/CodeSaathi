const express = require("express");

const {
  createWorkspace,
  generateSummary,
  generateFlashcards,
  generateStudyNotes,
  generateQuizFromNotes,
  getMyWorkspaces,
} = require("../controllers/studyWorkspace.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");

const router = express.Router();

router.get("/", protect, authorize("student"), getMyWorkspaces);

router.post("/", protect, authorize("student"), createWorkspace);

router.post(
  "/:id/summary",
  protect,
  authorize("student"),
  generateSummary
);

router.post(
  "/:id/flashcards",
  protect,
  authorize("student"),
  generateFlashcards
);

router.post(
  "/:id/study-notes",
  protect,
  authorize("student"),
  generateStudyNotes
);

router.post(
  "/:id/generate-quiz",
  protect,
  authorize("student"),
  generateQuizFromNotes
);

module.exports = router;