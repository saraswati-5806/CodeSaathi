const { retrieveRelevantChunks } = require("../services/rag.service");
const { generateText, generateJSON } = require("../services/gemini.service");

const getUserId = (req) => req.user?.id || req.user?._id || "demo-user";

const aiChatWithVault = async (req, res) => {
  try {
    const { question, language = "English", mode = "doubt" } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    let chunks = [];

    try {
      chunks = await retrieveRelevantChunks({
        studentId: getUserId(req),
        query: question,
        limit: 3,
      });
    } catch {
      chunks = [];
    }

    const context = chunks.map((chunk) => chunk.text).join("\n\n");

    const prompt = `
You are CodeSaathi AI Assistant, an AI tutor for an LMS and coding platform.

Mode: ${mode}
Language preference: ${language}

Rules:
- Explain clearly.
- If Hinglish is requested, use simple Hinglish.
- Give coding hints, not only final answers.
- If context is available, use it.
- Keep answer student-friendly.

Vault Context:
${context || "No vault context available."}

Student Question:
${question}
`;

    const answer = await generateText(prompt);

    return res.status(200).json({
      success: true,
      question,
      answer,
      matchedChunks: chunks.length,
      contextUsed: context,
      source: process.env.GEMINI_API_KEY ? "gemini" : "fallback",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "AI chat failed",
      error: error.message,
    });
  }
};

const generateSummary = async (req, res) => {
  try {
    const { text, language = "English" } = req.body;

    const prompt = `
Generate a structured LMS study summary.
Language: ${language}
Content:
${text || "Python basics, variables, loops, functions and lists."}
`;

    const summary = await generateText(prompt);

    return res.json({
      success: true,
      summary,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const generateFlashcards = async (req, res) => {
  try {
    const { text, count = 6 } = req.body;

    const fallback = [
      { question: "What is a variable?", answer: "A variable stores data values." },
      { question: "What is a loop?", answer: "A loop repeats code." },
      { question: "What is a function?", answer: "A reusable block of code." },
      { question: "What is debugging?", answer: "Finding and fixing errors." },
    ];

    const flashcards = await generateJSON(
      `
Return ONLY valid JSON array.
Generate ${count} flashcards from this content:
${text || "Python variables, loops, functions, lists and debugging."}

Format:
[{"question":"...","answer":"..."}]
`,
      fallback
    );

    return res.json({
      success: true,
      flashcards,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const generateMindmap = async (req, res) => {
  try {
    const { topic = "Python Programming" } = req.body;

    const fallback = {
      title: topic,
      nodes: [
        { id: "1", label: topic },
        { id: "2", label: "Variables" },
        { id: "3", label: "Loops" },
        { id: "4", label: "Functions" },
        { id: "5", label: "Projects" },
      ],
      edges: [
        { from: "1", to: "2" },
        { from: "1", to: "3" },
        { from: "1", to: "4" },
        { from: "1", to: "5" },
      ],
    };

    const mindmap = await generateJSON(
      `
Return ONLY valid JSON.
Create a simple mindmap for topic: ${topic}

Format:
{
 "title":"...",
 "nodes":[{"id":"1","label":"..."}],
 "edges":[{"from":"1","to":"2"}]
}
`,
      fallback
    );

    return res.json({
      success: true,
      mindmap,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const generateQuiz = async (req, res) => {
  try {
    const { topic = "Python Basics", count = 5 } = req.body;

    const fallback = [
      {
        questionText: "Which keyword is used to print output in Python?",
        options: ["print", "echo", "display", "show"],
        correctOptionIndex: 0,
        explanation: "print() is used to display output in Python.",
      },
    ];

    const questions = await generateJSON(
      `
Return ONLY valid JSON array.
Generate ${count} MCQ questions for topic: ${topic}

Format:
[
 {
  "questionText":"...",
  "options":["A","B","C","D"],
  "correctOptionIndex":0,
  "explanation":"..."
 }
]
`,
      fallback
    );

    return res.json({
      success: true,
      topic,
      questions,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const explainError = async (req, res) => {
  try {
    const { errorText, code, language = "JavaScript" } = req.body;

    const explanation = await generateText(`
Explain this coding error line by line in simple language.

Language: ${language}
Error:
${errorText || "No error text provided"}

Code:
${code || "No code provided"}
`);

    return res.json({ success: true, explanation });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const reviewCode = async (req, res) => {
  try {
    const { code, language = "JavaScript" } = req.body;

    const review = await generateText(`
Review this code.
Give:
1. What is correct
2. Bugs
3. Improvements
4. Optimized suggestion

Language: ${language}
Code:
${code || "No code provided"}
`);

    return res.json({ success: true, review });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const optimizeCode = async (req, res) => {
  try {
    const { code, language = "JavaScript" } = req.body;

    const optimized = await generateText(`
Optimize this code and explain the improvement.

Language: ${language}
Code:
${code || "No code provided"}
`);

    return res.json({ success: true, optimized });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const dryRunCode = async (req, res) => {
  try {
    const { code, input = "", language = "JavaScript" } = req.body;

    const dryRun = await generateText(`
Dry run this code step-by-step.

Language: ${language}
Input:
${input}

Code:
${code || "No code provided"}
`);

    return res.json({ success: true, dryRun });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const revisionPlan = async (req, res) => {
  try {
    const plan = await generateText(`
Create a 3-day revision plan for a student learning Python, DSA, quizzes and coding practice.
Use simple actionable steps.
`);

    return res.json({ success: true, plan });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const generateNotes = async (req, res) => {
  try {
    const { topic = "Python Loops", difficulty = "Beginner", language = "English" } = req.body;

    const notes = await generateText(`
Generate LMS course notes.

Topic: ${topic}
Difficulty: ${difficulty}
Language: ${language}

Include definition, examples, mistakes, and practice tasks.
`);

    return res.json({ success: true, notes });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const generateChallenge = async (req, res) => {
  try {
    const { topic = "loops", difficulty = "easy" } = req.body;

    const fallback = {
      title: "Print Numbers",
      description: "Write a program to print numbers from 1 to N.",
      difficulty,
      testCases: [{ input: "5", expectedOutput: "1 2 3 4 5" }],
      hints: ["Use a loop."],
      solution: "for i in range(1, n+1): print(i)",
    };

    const challenge = await generateJSON(
      `
Return ONLY valid JSON.
Generate one coding challenge for:
Topic: ${topic}
Difficulty: ${difficulty}

Format:
{
 "title":"...",
 "description":"...",
 "difficulty":"...",
 "testCases":[{"input":"...","expectedOutput":"..."}],
 "hints":["..."],
 "solution":"..."
}
`,
      fallback
    );

    return res.json({ success: true, challenge });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  aiChatWithVault,
  generateSummary,
  generateFlashcards,
  generateMindmap,
  generateQuiz,
  explainError,
  reviewCode,
  optimizeCode,
  dryRunCode,
  revisionPlan,
  generateNotes,
  generateChallenge,
};