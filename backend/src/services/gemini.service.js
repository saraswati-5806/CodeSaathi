const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY || "";
let model = null;

if (apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

const fallbackAnswer = (prompt = "") => {
  const text = prompt.toLowerCase();

  if (text.includes("hinglish")) {
    return "Hinglish: Loop ka use same code ko baar-baar run karne ke liye hota hai. For loop sequence ke liye aur while loop condition ke liye use hota hai.";
  }

  if (text.includes("loop")) {
    return "A loop repeats code. For loop is used when we know the sequence, and while loop is used when repetition depends on a condition.";
  }

  if (text.includes("quiz")) {
    return "Here is a practice quiz:\n1. What is a variable?\n2. Which keyword prints output in Python?\n3. What is the use of a loop?\n4. What is a function?\n5. What is a list?";
  }

  if (text.includes("error") || text.includes("debug")) {
    return "Debugging steps: check the error line, spelling, brackets, indentation, variable names, and test with small input first.";
  }

  if (text.includes("plan")) {
    return "Study Plan:\n1. Revise the topic.\n2. Watch the lesson.\n3. Read notes.\n4. Attempt quiz.\n5. Practice coding.\n6. Review mistakes.";
  }

  return "I can help with summaries, quiz generation, flashcards, code review, debugging, study planning, and concept explanation.";
};

const generateText = async (prompt) => {
  try {
    if (!model) {
      return fallbackAnswer(prompt);
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini unavailable:", error.message);
    return fallbackAnswer(prompt);
  }
};

const generateJSON = async (prompt, fallbackData) => {
  try {
    const text = await generateText(prompt);
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return fallbackData;
  }
};

module.exports = {
  generateText,
  generateJSON,
};