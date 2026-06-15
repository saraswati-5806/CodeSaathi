const express = require("express");

const {
  getMyNotifications,
  markNotificationRead,
} = require("../controllers/notification.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", protect, getMyNotifications);
router.patch("/:id/read", protect, markNotificationRead);

module.exports = router;