const express = require("express");

const { getMyProgress } = require("../controllers/progress.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");

const router = express.Router();

router.get(
  "/me",
  protect,
  authorize("student"),
  getMyProgress
);

module.exports = router;