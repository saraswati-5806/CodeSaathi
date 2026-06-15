const express = require("express");

const {
  getLeaderboard,
  getMyXP,
  awardDemoXP,
} = require("../controllers/leaderboard.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");

const router = express.Router();

router.get("/", protect, getLeaderboard);
router.get("/me", protect, authorize("student"), getMyXP);
router.post("/award-demo-xp", protect, authorize("student"), awardDemoXP);

module.exports = router;