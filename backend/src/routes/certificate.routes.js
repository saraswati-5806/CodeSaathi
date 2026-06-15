const express = require("express");

const {
  issueCertificate,
  getMyCertificates,
  verifyCertificate,
} = require("../controllers/certificate.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");

const router = express.Router();

router.post(
  "/issue",
  protect,
  authorize("student"),
  issueCertificate
);

router.get(
  "/my",
  protect,
  authorize("student"),
  getMyCertificates
);

router.get("/verify/:code", verifyCertificate);

module.exports = router;