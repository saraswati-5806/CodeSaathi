const express = require("express");

const { aiChatWithVault } = require("../controllers/ai.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");

const router = express.Router();

router.post("/chat", protect, authorize("student"), aiChatWithVault);

module.exports = router;