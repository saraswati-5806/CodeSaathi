export const demoCourses = [
  {
    id: "python-foundation",
    title: "Python Programming Foundation",
    category: "Programming",
    level: "Beginner",
    duration: "6 weeks",
    progress: 100,
    completed: true,
    thumbnail: "from-blue-600 via-cyan-500 to-emerald-400",
    videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
    description: "Learn Python basics, loops, functions, files, and beginner problem solving.",
    notes: "Python is a high-level programming language. Variables store values, loops repeat tasks, functions organize reusable logic, and lists help manage multiple values.",
    summary: "This course introduces Python fundamentals through practical examples. The learner completed variables, loops, functions, file handling, quizzes, and coding practice.",
    modules: ["Python Setup", "Variables & Data Types", "Loops", "Functions", "Mini Project"],
  },
  {
    id: "dsa-interview",
    title: "Data Structures for Coding Interviews",
    category: "DSA",
    level: "Intermediate",
    duration: "8 weeks",
    progress: 62,
    completed: false,
    thumbnail: "from-purple-600 via-pink-500 to-orange-400",
    videoUrl: "https://www.youtube.com/embed/8hly31xKli0",
    description: "Practice arrays, strings, stacks, queues, linked lists, trees, and interview patterns.",
    notes: "Data structures organize data efficiently. Arrays allow indexed access, stacks follow LIFO, queues follow FIFO, and trees represent hierarchical data.",
    summary: "The DSA path improves problem-solving ability through structured coding challenges and repeated practice.",
    modules: ["Arrays", "Strings", "Stacks", "Queues", "Trees"],
  },
  {
    id: "web-fullstack",
    title: "Full Stack Web Development",
    category: "Web Development",
    level: "Intermediate",
    duration: "10 weeks",
    progress: 35,
    completed: false,
    thumbnail: "from-indigo-600 via-blue-500 to-sky-400",
    videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs",
    description: "Build full-stack apps using React, APIs, authentication, and database integration.",
    notes: "A full-stack app includes frontend UI, backend APIs, authentication, database models, and deployment.",
    summary: "This course explains how frontend, backend, and database layers connect in a modern web application.",
    modules: ["React Basics", "REST APIs", "MongoDB", "Authentication", "Deployment"],
  },
];

export const demoQuizzes = [
  { id: "q1", title: "Python Basics Quiz", questions: 10, time: "15 min", score: 90, status: "Completed" },
  { id: "q2", title: "Loops & Functions Assessment", questions: 12, time: "20 min", score: 78, status: "Completed" },
  { id: "q3", title: "DSA Arrays Practice Test", questions: 15, time: "25 min", score: null, status: "Pending" },
];

export const demoChallenges = [
  { id: "c1", title: "Print Hello World", difficulty: "Easy", language: "Python", status: "Accepted", score: 100 },
  { id: "c2", title: "Find Maximum Number", difficulty: "Easy", language: "JavaScript", status: "Accepted", score: 100 },
  { id: "c3", title: "Reverse a String", difficulty: "Medium", language: "Java", status: "Practice", score: 0 },
  { id: "c4", title: "Two Sum", difficulty: "Medium", language: "C++", status: "Practice", score: 0 },
];

export const demoCertificates = [
  { id: "CERT-PY-2026", title: "Python Programming Foundation", issuedOn: "Demo Date", status: "Verified", learner: "Demo Student" },
];

export const translations = {
  en: { dashboard: "Dashboard", courses: "Courses", workspace: "Learning Workspace", coding: "Coding Lab", quiz: "Quiz", certificates: "Certificates", leaderboard: "Leaderboard", instructor: "Instructor" },
  hi: { dashboard: "डैशबोर्ड", courses: "कोर्स", workspace: "लर्निंग वर्कस्पेस", coding: "कोडिंग लैब", quiz: "क्विज", certificates: "सर्टिफिकेट", leaderboard: "लीडरबोर्ड", instructor: "इंस्ट्रक्टर" },
  mr: { dashboard: "डॅशबोर्ड", courses: "कोर्सेस", workspace: "लर्निंग वर्कस्पेस", coding: "कोडिंग लॅब", quiz: "क्विझ", certificates: "सर्टिफिकेट", leaderboard: "लीडरबोर्ड", instructor: "इन्स्ट्रक्टर" },
  od: { dashboard: "ଡ୍ୟାଶବୋର୍ଡ", courses: "କୋର୍ସ", workspace: "ଲର୍ଣ୍ଣିଂ ୱର୍କସ୍ପେସ୍", coding: "କୋଡିଂ ଲ୍ୟାବ୍", quiz: "କ୍ୱିଜ୍", certificates: "ସର୍ଟିଫିକେଟ୍", leaderboard: "ଲିଡରବୋର୍ଡ", instructor: "ଇନ୍ସ୍ଟ୍ରକ୍ଟର" },
};
