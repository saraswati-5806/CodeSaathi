"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { demoNotifications, translations } from "../lib/demoData";

export default function AppShell({ children }) {
  const [role, setRole] = useState("guest");
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [showAssistant, setShowAssistant] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("codesaathi_role") || "guest";
    const savedLang = localStorage.getItem("codesaathi_lang") || "en";
    const savedTheme = localStorage.getItem("codesaathi_theme") || "dark";

    setRole(savedRole);
    setLang(savedLang);
    setTheme(savedTheme);
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

  const logout = () => {
    localStorage.removeItem("codesaathi_role");
    localStorage.removeItem("codesaathi_token");
    localStorage.removeItem("codesaathi_user");
    setRole("guest");
    window.location.href = "/";
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
    <div className={`app-bg shell ${theme === "light" ? "light-shell" : ""}`}>
      <aside className="sidebar">
        <Link href="/" className="block text-3xl font-black text-purple-300 mb-6">
          CodeSaathi
        </Link>

        <div className="card mb-5">
          <p className="text-slate-400 text-sm">Active Role</p>
          <h3 className="text-xl font-bold capitalize mt-1">{role}</h3>

          <select
            className="field mt-4"
            value={lang}
            onChange={(event) => saveLang(event.target.value)}
          >
            <option value="en">English</option>
            <option value="hinglish">Hinglish</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="od">Odia</option>
          </select>

          <button onClick={toggleTheme} className="btn-purple mt-4 w-full">
            {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn-dark mt-4 w-full"
          >
            🔔 Notifications
          </button>

          {showNotifications && (
            <div className="card mt-4">
              <h3 className="font-bold mb-3">Notifications</h3>
              <div className="space-y-2">
                {demoNotifications.map((item) => (
                  <div key={item} className="text-sm text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {role !== "guest" && (
            <button onClick={logout} className="btn-dark mt-4 w-full">
              🚪 Logout
            </button>
          )}
        </div>

        <div className="space-y-3">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold hover:bg-purple-700"
            >
              {label}
            </Link>
          ))}
        </div>
      </aside>

      <main className="main-content">
        <div className="mobile-topbar card mb-4">
          <div>
            <h2 className="text-2xl font-black text-purple-300">CodeSaathi</h2>
            <p className="text-sm text-slate-400 capitalize">{role}</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              className="field"
              value={lang}
              onChange={(event) => saveLang(event.target.value)}
            >
              <option value="en">English</option>
              <option value="hinglish">Hinglish</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="od">Odia</option>
            </select>

            <button onClick={toggleTheme} className="btn-dark">
              {theme === "dark" ? "☀" : "🌙"}
            </button>

            {role !== "guest" && (
              <button onClick={logout} className="btn-dark">
                Logout
              </button>
            )}
          </div>
        </div>

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
            <button onClick={() => setShowAssistant(false)} className="btn-dark">
              ×
            </button>
          </div>

          <p className="text-slate-400 mt-3">
            Choose a prompt. Notes, resources and code are kept unchanged.
          </p>

          <div className="grid gap-3 mt-5">
            <button className="btn-dark">Explain Python Loops</button>
            <button className="btn-dark">Generate Practice Quiz</button>
            <button className="btn-dark">Suggest Next Topic</button>
            <button className="btn-dark">Debug My Code</button>
          </div>

          <div className="card mt-5">
            <p className="text-green-300">
              Demo Response: Python loops repeat a block of code. A for loop is
              used for sequences, while a while loop runs until a condition is
              false.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}