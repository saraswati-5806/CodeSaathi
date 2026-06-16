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
    { from: "ai", text: "Hi! I am CodeSaathi AI Assistant. Ask me anything." },
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

      setMessages((prev) => [...prev, { from: "ai", text: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text:
            lang === "hinglish"
              ? "Demo AI: Main aapko simple Hinglish mein explain kar sakta hoon. Loop same code ko baar-baar run karta hai."
              : "Demo AI: I can explain concepts, generate quizzes, review code, and suggest study plans.",
        },
      ]);
    } finally {
      setLoadingAI(false);
    }
  };

  const t = translations[lang] || translations.en;

  const links = useMemo(() => {
    if (role === "instructor") {
      return [
        ["Instructor Dashboard", "/instructor/dashboard"],
        ["Manage Courses", "/courses"],
        ["Create Assessments", "/quiz"],
        ["Resources", "/resources"],
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
            <Link
              href={role === "instructor" ? "/instructor/dashboard" : "/dashboard"}
              className="text-3xl font-black text-purple-300"
            >
              CodeSaathi
            </Link>
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
            <p className="text-sm text-slate-400">CodeSaathi LMS</p>
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
              onClick={() => sendAssistantMessage("Generate quiz")}
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