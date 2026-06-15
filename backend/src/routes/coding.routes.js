const express = require("express");

const {
  createChallenge,
  getChallenges,
  getChallengeById,
  submitCode,
  getMySubmissions,
} = require("../controllers/coding.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");

const router = express.Router();

router.get("/", protect, getChallenges);
router.get("/:id", protect, getChallengeById);

router.post("/", protect, authorize("instructor"), createChallenge);
router.post("/:id/submit", protect, authorize("student"), submitCode);
router.get("/:id/submissions", protect, authorize("student"), getMySubmissions);

module.exports = router;