const express = require("express");

const {
  createLiveClass,
  getUpcomingLiveClasses,
  updateLiveClassStatus,
} = require("../controllers/liveClass.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");

const router = express.Router();

router.get("/", protect, getUpcomingLiveClasses);
router.post("/", protect, authorize("instructor"), createLiveClass);
router.patch("/:id/status", protect, authorize("instructor"), updateLiveClassStatus);

module.exports = router;