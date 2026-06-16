"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { demoNotifications, translations } from "../lib/demoData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AppShell({ children }) {
  const [role, setRole] = useState("guest");
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [collapsed, setCollapsed] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [assistantInput, setAssistantInput] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi! I am your CodeSaathi AI Assistant. I can explain topics, generate quiz ideas, review code, debug errors, create study plans, and answer in English, Hindi, Marathi, Odia, or Hinglish.",
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("codesaathi_token");
    const savedRole = localStorage.getItem("codesaathi_role");

    if (!token || !savedRole) {
      window.location.href = "/";
      return;
    }

    const savedTheme = localStorage.getItem("codesaathi_theme") || "dark";
    const savedLang = localStorage.getItem("codesaathi_lang") || "en";
    const savedCollapsed =
      localStorage.getItem("codesaathi_sidebar") === "collapsed";

    setRole(savedRole);
    setTheme(savedTheme);
    setLang(savedLang);
    setCollapsed(savedCollapsed);
    document.body.className = savedTheme;
  }, []);

  const logout = () => {
    localStorage.removeItem("codesaathi_token");
    localStorage.removeItem("codesaathi_role");
    localStorage.removeItem("codesaathi_user");
    window.location.href = "/";
  };

  const saveLang = (value) => {
    setLang(value);
    localStorage.setItem("codesaathi_lang", value);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("codesaathi_theme", next);
    document.body.className = next;
  };

  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("codesaathi_sidebar", next ? "collapsed" : "expanded");
  };

  const localAI = (text) => {
    const lower = text.toLowerCase();

    if (lang === "hinglish") {
      if (lower.includes("loop")) {
        return "Hinglish Explanation: Loop ka use same code ko baar-baar run karne ke liye hota hai. Python mein `for loop` sequence ke liye aur `while loop` condition ke basis par repeat karne ke liye use hota hai.";
      }
      if (lower.includes("quiz")) {
        return "Hinglish Quiz:\n1. Variable kya hota hai?\n2. Python mein output ke liye kaunsa keyword use hota hai?\n3. Loop ka use kya hai?\n4. Function ka benefit kya hai?";
      }
      return "Hinglish Mode Active: Aap mujhe doubt, code error, quiz, summary, ya study plan ke liye puch sakte ho.";
    }

    if (lower.includes("quiz")) {
      return "Generated Quiz Ideas:\n1. What is a variable?\n2. Which keyword prints output in Python?\n3. What is the purpose of a loop?\n4. What is a function?\n5. What is an array/list?";
    }

    if (lower.includes("review") || lower.includes("code")) {
      return "Code Review Tips:\n1. Check syntax.\n2. Use meaningful variable names.\n3. Keep code readable.\n4. Test with small inputs.\n5. Handle errors clearly.";
    }

    if (lower.includes("debug") || lower.includes("error")) {
      return "Debugging Steps:\n1. Read the exact error message.\n2. Check line number.\n3. Check brackets and indentation.\n4. Check variable spelling.\n5. Run small test cases.";
    }

    if (lower.includes("plan")) {
      return "Study Plan:\nDay 1: Revise concepts.\nDay 2: Practice coding.\nDay 3: Attempt quiz.\nDay 4: Review mistakes.\nDay 5: Build mini project.";
    }

    return "I can help with explanations, quiz generation, code review, error explanation, summaries, flashcards, and study planning.";
  };

  const sendAssistantMessage = async (preset = "") => {
    const text = preset || assistantInput.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setAssistantInput("");
    setLoadingAI(true);

    try {
      const token = localStorage.getItem("codesaathi_token");

      const languageMap = {
        en: "English",
        hinglish: "Hinglish",
        hi: "Hindi",
        mr: "Marathi",
        od: "Odia",
      };

      const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: `${text}\nAnswer in ${languageMap[lang] || "English"}.`,
          language: languageMap[lang] || "English",
          mode: "assistant",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "AI failed");
      }

      setMessages((prev) => [
        ...prev,
        { from: "ai", text: data.answer || localAI(text) },
      ]);
    } catch {
      setMessages((prev) => [...prev, { from: "ai", text: localAI(text) }]);
    } finally {
      setLoadingAI(false);
    }
  };

  const t = translations[lang] || translations.en;

  const links = useMemo(() => {
    if (role === "instructor") {
      return [
        ["Dashboard", "/instructor/dashboard"],
        ["Courses", "/courses"],
        ["Assessments", "/quiz"],
        ["Resources", "/resources"],
        ["Coding", "/coding"],
      ];
    }

    return [
      [t.dashboard, "/dashboard"],
      [t.courses, "/courses"],
      [t.workspace, "/learning-workspace"],
      ["Resources", "/resources"],
      [t.coding, "/coding"],
      [t.quiz, "/quiz"],
      [t.leaderboard, "/leaderboard"],
      [t.certificates, "/certificates"],
    ];
  }, [role, t]);

  return (
    <div className={`app-bg shell ${collapsed ? "shell-collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="flex items-center justify-between gap-3 mb-6">
          {!collapsed && (
            <div>
              <p className="text-sm text-slate-400">CodeSaathi</p>
              <h2 className="text-xl font-black text-purple-300 capitalize">
                {role} Panel
              </h2>
            </div>
          )}

          <button className="icon-btn" onClick={toggleSidebar}>
            {collapsed ? "☰" : "←"}
          </button>
        </div>

        {!collapsed && (
          <div className="card mb-5">
            <p className="text-slate-400 text-sm">Logged in as</p>
            <h3 className="text-xl font-bold capitalize">{role}</h3>
          </div>
        )}

        <div className="space-y-3">
          {links.map(([label, href]) => (
            <Link key={label} href={href} className="nav-link">
              {collapsed ? label[0] : label}
            </Link>
          ))}
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar card mb-5">
          <div>
            <h2 className="text-2xl font-black text-purple-300">
              {role === "instructor" ? "Instructor Workspace" : "Student Workspace"}
            </h2>
            <p className="text-sm text-slate-400">AI-Powered LMS Dashboard</p>
          </div>

          <div className="top-actions">
            <select
              className="top-select"
              value={lang}
              onChange={(e) => saveLang(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hinglish">Hinglish</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="od">Odia</option>
            </select>

            <button className="icon-btn" onClick={toggleTheme}>
              {theme === "dark" ? "☀" : "🌙"}
            </button>

            <button
              className="icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔
            </button>

            <button
              className="icon-btn"
              onClick={() => setShowAssistant(!showAssistant)}
            >
              🤖
            </button>

            <button className="icon-btn" onClick={logout}>
              🚪
            </button>
          </div>
        </header>

        {showNotifications && (
          <div className="card mb-5">
            <h3 className="font-bold mb-3">Notifications</h3>
            <div className="grid-fit">
              {demoNotifications.map((n) => (
                <div className="mini-card" key={n}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mobile-links">
          {links.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </div>

        {children}
      </main>

      <button
        className="ai-float"
        onClick={() => setShowAssistant(true)}
        title="Open AI Assistant"
      >
        🤖
      </button>

      {showAssistant && (
        <div className="ai-panel card">
          <div className="flex justify-between items-center gap-3">
            <h2 className="text-xl font-bold">AI Assistant</h2>
            <button className="icon-btn" onClick={() => setShowAssistant(false)}>
              ×
            </button>
          </div>

          <p className="text-slate-400 mt-2">Language: {lang}</p>

          <div className="assistant-chat mt-4">
            {messages.map((m, i) => (
              <div key={i} className={m.from === "ai" ? "ai-msg" : "user-msg"}>
                {m.text}
              </div>
            ))}

            {loadingAI && <div className="ai-msg">Thinking...</div>}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              className="btn-dark"
              onClick={() => sendAssistantMessage("Explain Python loops")}
            >
              Explain
            </button>

            <button
              className="btn-dark"
              onClick={() => sendAssistantMessage("Generate quiz with 10 questions")}
            >
              Quiz
            </button>

            <button
              className="btn-dark"
              onClick={() => sendAssistantMessage("Review this code")}
            >
              Review
            </button>

            <button
              className="btn-dark"
              onClick={() => sendAssistantMessage("Give study plan")}
            >
              Plan
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            <input
              className="field"
              value={assistantInput}
              onChange={(e) => setAssistantInput(e.target.value)}
              placeholder="Ask AI..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendAssistantMessage();
              }}
            />

            <button className="btn-purple" onClick={() => sendAssistantMessage()}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}