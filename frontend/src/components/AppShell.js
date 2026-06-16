"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { demoNotifications, translations } from "../lib/demoData";

export default function AppShell({ children }) {
  const [role, setRole] = useState("guest");
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [collapsed, setCollapsed] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [assistantInput, setAssistantInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text:
        "Hi! I am CodeSaathi AI Assistant. Ask me doubts, coding errors, quiz questions, or learning recommendations.",
    },
  ]);

  useEffect(() => {
    const savedRole = localStorage.getItem("codesaathi_role") || "guest";
    const savedLang = localStorage.getItem("codesaathi_lang") || "en";
    const savedTheme = localStorage.getItem("codesaathi_theme") || "dark";
    const savedCollapsed = localStorage.getItem("codesaathi_sidebar") === "collapsed";

    setRole(savedRole);
    setLang(savedLang);
    setTheme(savedTheme);
    setCollapsed(savedCollapsed);
    document.body.className = savedTheme;
  }, []);

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

  const logout = () => {
    localStorage.removeItem("codesaathi_role");
    localStorage.removeItem("codesaathi_token");
    localStorage.removeItem("codesaathi_user");
    setRole("guest");
    window.location.href = "/";
  };

  const generateAIAnswer = (question) => {
    const q = question.toLowerCase();

    if (q.includes("loop")) {
      return "A loop repeats code. In Python, use for loop for sequences and while loop when repetition depends on a condition.";
    }

    if (q.includes("quiz")) {
      return "Practice Quiz: 1) What is a variable? 2) Which keyword prints output in Python? 3) What does a loop do?";
    }

    if (q.includes("debug") || q.includes("error")) {
      return "Debugging tip: Read the error line number, check spelling, brackets, indentation, and variable names. Then test with small input.";
    }

    if (q.includes("next") || q.includes("learn")) {
      return "Recommended path: Python basics → Loops → Functions → Lists → File handling → DSA arrays → Mini project.";
    }

    if (q.includes("hinglish")) {
      return "Hinglish explanation: Loop ka use same code ko baar-baar run karne ke liye hota hai. For loop sequence ke liye, while loop condition ke liye.";
    }

    return "I can help you understand concepts, generate practice questions, debug code, and suggest what to learn next. Try asking: Explain Python loops in Hinglish.";
  };

  const sendAssistantMessage = (textFromButton = "") => {
    const text = textFromButton || assistantInput.trim();

    if (!text) return;

    const answer = generateAIAnswer(text);

    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      { from: "ai", text: answer },
    ]);

    setAssistantInput("");
  };

  const t = translations[lang] || translations.en;

  const links = [
    [t.dashboard, "/dashboard"],
    [t.courses, "/courses"],
    [t.workspace, "/learning-workspace"],
    [t.coding, "/coding"],
    [t.quiz, "/quiz"],
    [t.leaderboard, "/leaderboard"],
    [t.certificates, "/certificates"],
    [t.instructor, "/instructor/dashboard"],
  ];

  return (
    <div className={`app-bg shell ${collapsed ? "shell-collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="flex items-center justify-between gap-3 mb-6">
          {!collapsed && (
            <Link href="/" className="block text-3xl font-black text-purple-300">
              CodeSaathi
            </Link>
          )}

          <button onClick={toggleSidebar} className="icon-btn" title="Collapse menu">
            {collapsed ? "☰" : "←"}
          </button>
        </div>

        {!collapsed && (
          <div className="card mb-5">
            <p className="text-slate-400 text-sm">Active Role</p>
            <h3 className="text-xl font-bold capitalize mt-1">{role}</h3>
          </div>
        )}

        <div className="space-y-3">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              title={label}
            >
              <span>{collapsed ? label.charAt(0) : label}</span>
            </Link>
          ))}
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar card mb-5">
          <div>
            <button onClick={toggleSidebar} className="icon-btn desktop-hidden">
              ☰
            </button>
            <h2 className="text-2xl font-black text-purple-300">CodeSaathi</h2>
            <p className="text-sm text-slate-400 capitalize">Role: {role}</p>
          </div>

          <div className="top-actions">
            <select
              className="top-select"
              value={lang}
              onChange={(event) => saveLang(event.target.value)}
              title="Language preference"
            >
              <option value="en">English</option>
              <option value="hinglish">Hinglish</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="od">Odia</option>
            </select>

            <button onClick={toggleTheme} className="icon-btn" title="Dark/Light mode">
              {theme === "dark" ? "☀" : "🌙"}
            </button>

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="icon-btn"
              title="Notifications"
            >
              🔔
            </button>

            <button
              onClick={() => setShowAssistant(!showAssistant)}
              className="icon-btn"
              title="AI Assistant"
            >
              🤖
            </button>

            {role !== "guest" && (
              <button onClick={logout} className="icon-btn" title="Logout">
                🚪
              </button>
            )}
          </div>
        </header>

        {showNotifications && (
          <div className="card mb-5">
            <h3 className="font-bold mb-3">Notifications</h3>
            <div className="grid-fit">
              {demoNotifications.map((item) => (
                <div key={item} className="mini-card">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mobile-links">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>

        {children}
      </main>

      <button
        className="ai-float"
        onClick={() => setShowAssistant(!showAssistant)}
      >
        🤖
      </button>

      {showAssistant && (
        <div className="ai-panel card">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold">AI Assistant</h2>
            <button onClick={() => setShowAssistant(false)} className="icon-btn">
              ×
            </button>
          </div>

          <p className="text-slate-400 mt-3">
            Ask doubts, coding errors, quiz help, or learning recommendations.
          </p>

          <div className="assistant-chat mt-4">
            {messages.map((msg, index) => (
              <div
                key={`${msg.from}-${index}`}
                className={msg.from === "ai" ? "ai-msg" : "user-msg"}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              className="btn-dark"
              onClick={() => sendAssistantMessage("Explain Python loops in Hinglish")}
            >
              Explain Loops
            </button>
            <button
              className="btn-dark"
              onClick={() => sendAssistantMessage("Generate practice quiz")}
            >
              Quiz Help
            </button>
            <button
              className="btn-dark"
              onClick={() => sendAssistantMessage("Debug my code error")}
            >
              Debug Code
            </button>
            <button
              className="btn-dark"
              onClick={() => sendAssistantMessage("What should I learn next?")}
            >
              Next Topic
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            <input
              className="field"
              value={assistantInput}
              onChange={(event) => setAssistantInput(event.target.value)}
              placeholder="Type your doubt..."
              onKeyDown={(event) => {
                if (event.key === "Enter") sendAssistantMessage();
              }}
            />
            <button onClick={() => sendAssistantMessage()} className="btn-purple">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}