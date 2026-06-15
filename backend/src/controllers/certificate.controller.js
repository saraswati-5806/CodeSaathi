const Certificate = require("../models/Certificate.model");
const { generateCertificateCode } = require("../services/certificate.service");

const issueCertificate = async (req, res) => {
  try {
    const { courseId, courseTitle } = req.body;

    const existing = await Certificate.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        certificate: existing,
      });
    }

    const certificate = await Certificate.create({
      student: req.user.id,
      course: courseId,
      courseTitle,
      certificateCode: generateCertificateCode(),
    });

    res.status(201).json({
      success: true,
      message: "Certificate issued",
      certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      certificateCode: req.params.code,
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      certificate,
      verified: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  issueCertificate,
  getMyCertificates,
  verifyCertificate,
};