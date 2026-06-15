const VaultChunk = require("../models/VaultChunk.model");

const splitIntoChunks = (text, maxLength = 700) => {
  const cleanText = String(text || "").replace(/\s+/g, " ").trim();

  if (!cleanText) return [];

  const chunks = [];

  for (let i = 0; i < cleanText.length; i += maxLength) {
    chunks.push(cleanText.slice(i, i + maxLength));
  }

  return chunks;
};

const extractKeywords = (text) => {
  const stopWords = [
    "the", "is", "are", "and", "or", "to", "of", "in", "a", "an",
    "for", "with", "on", "this", "that", "by", "from", "as", "it"
  ];

  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.includes(word))
    .slice(0, 25);
};

const createChunksForResource = async ({ resourceId, studentId, text }) => {
  const chunks = splitIntoChunks(text);

  const createdChunks = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = await VaultChunk.create({
      resource: resourceId,
      student: studentId,
      chunkIndex: i,
      text: chunks[i],
      keywords: extractKeywords(chunks[i]),
    });

    createdChunks.push(chunk);
  }

  return createdChunks;
};

const retrieveRelevantChunks = async ({ studentId, query, limit = 3 }) => {
  const queryWords = extractKeywords(query);

  const chunks = await VaultChunk.find({ student: studentId });

  const scoredChunks = chunks.map((chunk) => {
    const matches = chunk.keywords.filter((keyword) =>
      queryWords.includes(keyword)
    ).length;

    return {
      chunk,
      score: matches,
    };
  });

  return scoredChunks
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.chunk);
};

module.exports = {
  splitIntoChunks,
  createChunksForResource,
  retrieveRelevantChunks,
};