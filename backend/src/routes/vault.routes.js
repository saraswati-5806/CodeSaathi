const express = require("express");

const {
  addNoteToVault,
  getMyVaultResources,
  getResourceChunks,
  deleteVaultResource,
} = require("../controllers/vault.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");

const router = express.Router();

router.get("/", protect, authorize("student"), getMyVaultResources);
router.post("/add-note", protect, authorize("student"), addNoteToVault);
router.get("/:id/chunks", protect, authorize("student"), getResourceChunks);
router.delete("/:id", protect, authorize("student"), deleteVaultResource);

module.exports = router;