const VaultResource = require("../models/VaultResource.model");
const VaultChunk = require("../models/VaultChunk.model");
const { createChunksForResource } = require("../services/rag.service");

const addNoteToVault = async (req, res) => {
  try {
    const { title, content, type, originalUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const resource = await VaultResource.create({
      student: req.user.id,
      title,
      type: type || "note",
      originalUrl: originalUrl || "",
      extractedText: content,
    });

    const chunks = await createChunksForResource({
      resourceId: resource._id,
      studentId: req.user.id,
      text: content,
    });

    resource.chunkCount = chunks.length;
    resource.isProcessed = true;
    await resource.save();

    res.status(201).json({
      success: true,
      message: "Resource added to Vault and processed for RAG",
      resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Vault resource creation failed",
      error: error.message,
    });
  }
};

const getMyVaultResources = async (req, res) => {
  try {
    const resources = await VaultResource.find({ student: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: resources.length,
      resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Vault resources",
      error: error.message,
    });
  }
};

const getResourceChunks = async (req, res) => {
  try {
    const chunks = await VaultChunk.find({
      resource: req.params.id,
      student: req.user.id,
    }).sort({ chunkIndex: 1 });

    res.status(200).json({
      success: true,
      count: chunks.length,
      chunks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch chunks",
      error: error.message,
    });
  }
};

const deleteVaultResource = async (req, res) => {
  try {
    const resource = await VaultResource.findOne({
      _id: req.params.id,
      student: req.user.id,
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    await VaultChunk.deleteMany({
      resource: resource._id,
      student: req.user.id,
    });

    await resource.deleteOne();

    res.status(200).json({
      success: true,
      message: "Vault resource deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete resource",
      error: error.message,
    });
  }
};

module.exports = {
  addNoteToVault,
  getMyVaultResources,
  getResourceChunks,
  deleteVaultResource,
};