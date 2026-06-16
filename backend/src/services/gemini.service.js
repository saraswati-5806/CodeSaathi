const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY || "";
let model = null;

if (apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

const detectRequestedLanguage = (prompt = "") => {
  const text = prompt.toLowerCase();

  if (text.includes("language preference: hinglish") || text.includes("answer in hinglish")) {
    return "hinglish";
  }

  if (text.includes("language preference: hindi") || text.includes("answer in hindi")) {
    return "hindi";
  }

  if (text.includes("language preference: marathi") || text.includes("answer in marathi")) {
    return "marathi";
  }

  if (text.includes("language preference: odia") || text.includes("answer in odia")) {
    return "odia";
  }

  return "english";
};

const extractStudentQuestion = (prompt = "") => {
  const marker = "Student Question:";
  const index = prompt.indexOf(marker);

  if (index !== -1) {
    return prompt.slice(index + marker.length).trim();
  }

  return prompt;
};

const fallbackAnswer = (prompt = "") => {
  const language = detectRequestedLanguage(prompt);
  const question = extractStudentQuestion(prompt).toLowerCase();

  const isHinglish = language === "hinglish";
  const isHindi = language === "hindi";
  const isMarathi = language === "marathi";
  const isOdia = language === "odia";

  if (question.includes("array") || question.includes("arrays") || question.includes("list")) {
    if (isHinglish) {
      return "Arrays ya lists ka use multiple values ko ek hi variable mein store karne ke liye hota hai. Example: marks = [80, 90, 75]. Isme hum index ke through values access kar sakte hain.";
    }

    if (isHindi) {
      return "Array या list का उपयोग एक ही variable में कई values store करने के लिए किया जाता है। Example: marks = [80, 90, 75].";
    }

    if (isMarathi) {
      return "Array किंवा list चा उपयोग एका variable मध्ये अनेक values store करण्यासाठी केला जातो. Example: marks = [80, 90, 75].";
    }

    if (isOdia) {
      return "Array ବା list ର ଉପଯୋଗ ଗୋଟିଏ variable ଭିତରେ ଅନେକ value store କରିବା ପାଇଁ ହୁଏ। Example: marks = [80, 90, 75].";
    }

    return "An array, or list in Python, stores multiple values in one variable. Example: marks = [80, 90, 75]. You can access values using indexes, such as marks[0].";
  }

  if (question.includes("loop")) {
    if (isHinglish) {
      return "Loop ka use same code ko baar-baar run karne ke liye hota hai. For loop sequence ke liye aur while loop condition ke liye use hota hai.";
    }

    if (isHindi) {
      return "Loop का उपयोग code को बार-बार चलाने के लिए किया जाता है। For loop sequence के लिए और while loop condition के लिए use होता है।";
    }

    if (isMarathi) {
      return "Loop चा उपयोग code वारंवार चालवण्यासाठी होतो. For loop sequence साठी आणि while loop condition साठी वापरला जातो.";
    }

    if (isOdia) {
      return "Loop ର ଉପଯୋଗ code କୁ ପୁନରାବୃତ୍ତି କରି run କରିବା ପାଇଁ ହୁଏ।";
    }

    return "A loop repeats code. A for loop is used when you know the sequence, and a while loop is used when repetition depends on a condition.";
  }

  if (question.includes("quiz")) {
    if (isHinglish) {
      return "Practice Quiz:\n1. Variable kya hota hai?\n2. Python mein output ke liye kaunsa keyword use hota hai?\n3. Loop ka use kya hai?\n4. Function ka benefit kya hai?\n5. List ka use kya hai?";
    }

    return "Practice Quiz:\n1. What is a variable?\n2. Which keyword prints output in Python?\n3. What is the use of a loop?\n4. What is a function?\n5. What is a list?";
  }

  if (question.includes("error") || question.includes("debug")) {
    if (isHinglish) {
      return "Debugging steps: Pehle error line dekho, spelling check karo, brackets aur indentation verify karo, variable names check karo, phir small input se test karo.";
    }

    return "Debugging steps: check the error line, spelling, brackets, indentation, variable names, and test with small input first.";
  }

  if (question.includes("plan")) {
    if (isHinglish) {
      return "Study Plan:\n1. Topic revise karo.\n2. Lesson watch karo.\n3. Notes read karo.\n4. Quiz attempt karo.\n5. Coding practice karo.\n6. Mistakes review karo.";
    }

    return "Study Plan:\n1. Revise the topic.\n2. Watch the lesson.\n3. Read notes.\n4. Attempt quiz.\n5. Practice coding.\n6. Review mistakes.";
  }

  if (isHinglish) {
    return "Main summaries, quiz generation, flashcards, code review, debugging, study planning aur concept explanation mein help kar sakta hoon.";
  }

  if (isHindi) {
    return "मैं summaries, quiz generation, flashcards, code review, debugging, study planning और concept explanation में मदद कर सकता हूँ।";
  }

  if (isMarathi) {
    return "मी summaries, quiz generation, flashcards, code review, debugging, study planning आणि concept explanation मध्ये मदत करू शकतो.";
  }

  if (isOdia) {
    return "ମୁଁ summaries, quiz generation, flashcards, code review, debugging, study planning ଏବଂ concept explanation ରେ ସାହାଯ୍ୟ କରିପାରିବି।";
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