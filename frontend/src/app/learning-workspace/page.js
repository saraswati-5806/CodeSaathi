"use client";

import { useState } from "react";
import AppShell from "../../components/AppShell";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LearningWorkspacePage() {
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState("lesson");
  const [workspaceId, setWorkspaceId] = useState("");
  const [title, setTitle] = useState("Python Loop Revision");
  const [content, setContent] = useState(
    "Python loops help repeat code. For loops are used for sequences like lists and strings. While loops run until a condition becomes false. Break stops a loop. Continue skips one iteration."
  );
  const [code, setCode] = useState('print("Hello World")');
  const [output, setOutput] = useState(null);

  const login = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@codesaathi.com", password: "Student@123" }),
    });

    const data = await res.json();
    setToken(data.token || "");
    setOutput(data);
  };

  const createWorkspace = async () => {
    const res = await fetch(`${API_URL}/api/study-workspace`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    setOutput(data);
    if (data.workspace?._id) setWorkspaceId(data.workspace._id);
  };

  const runAiTool = async (tool) => {
    if (!workspaceId) {
      setOutput({ success: false, message: "Create workspace first." });
      return;
    }

    const res = await fetch(`${API_URL}/api/study-workspace/${workspaceId}/${tool}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    setOutput(await res.json());
  };

  const tabs = [
    ["lesson", "Lesson"],
    ["notes", "Notes"],
    ["ai", "AI Tools"],
    ["code", "Code Practice"],
    ["quiz", "Quiz"],
  ];

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">Unified Learning Workspace</p>
          <h1 className="page-title mt-2">Learn + AI + Code + Quiz</h1>
          <p className="text-slate-300 mt-4 max-w-3xl">
            A DevSathi-style learning screen where students can study lessons,
            take notes, generate AI help, practice code, and move to quizzes
            without feeling lost.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button onClick={login} className="btn-blue">
              Login Student
            </button>
            <Link href="/courses" className="btn-dark">
              Back to Courses
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-6">
          <div className="card">
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={activeTab === id ? "btn-purple" : "btn-dark"}
                >
                  {label}
                </button>
              ))}
            </div>

            {activeTab === "lesson" && (
              <div>
                <h2 className="text-3xl font-bold">Python Programming Foundation</h2>
                <p className="text-slate-400 mt-3 leading-7">
                  Lesson: Introduction to loops, conditions, and basic coding
                  practice. This section represents the course video/lecture
                  area in the LMS.
                </p>

                <div className="mt-6 rounded-3xl bg-slate-950 border border-slate-800 min-h-72 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl mb-4">▶</p>
                    <p className="text-xl font-bold">Lecture Player Area</p>
                    <p className="text-slate-400 mt-2">
                      Add YouTube/recorded lecture link here.
                    </p>
                  </div>
                </div>

                <div className="grid-fit mt-6">
                  <div className="card">
                    <h3 className="text-xl font-bold">Current Topic</h3>
                    <p className="text-slate-400 mt-2">Python Loops</p>
                  </div>
                  <div className="card">
                    <h3 className="text-xl font-bold">Progress</h3>
                    <p className="text-slate-400 mt-2">Lesson in progress</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div>
                <h2 className="text-3xl font-bold mb-4">Study Notes</h2>
                <input
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 mb-4 outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                  className="w-full min-h-72 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <button onClick={createWorkspace} disabled={!token} className="btn-blue mt-5">
                  Save Notes to AI Workspace
                </button>
              </div>
            )}

            {activeTab === "ai" && (
              <div>
                <h2 className="text-3xl font-bold mb-4">AI Study Assistant</h2>
                <p className="text-slate-400 mb-5">
                  First save notes, then generate summary, flashcards, notes, or quiz.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <button onClick={() => runAiTool("summary")} className="btn-blue">
                    Generate Summary
                  </button>
                  <button onClick={() => runAiTool("flashcards")} className="btn-purple">
                    Generate Flashcards
                  </button>
                  <button onClick={() => runAiTool("study-notes")} className="btn-dark">
                    Generate Study Notes
                  </button>
                  <button onClick={() => runAiTool("generate-quiz")} className="btn-dark">
                    Generate Quiz
                  </button>
                </div>

                {workspaceId && (
                  <p className="text-green-300 mt-5">
                    Workspace ready: {workspaceId}
                  </p>
                )}
              </div>
            )}

            {activeTab === "code" && (
              <div>
                <h2 className="text-3xl font-bold mb-4">Code Practice</h2>
                <p className="text-slate-400 mb-4">
                  Quick coding practice panel. Full coding module is available in Coding Lab.
                </p>

                <textarea
                  className="w-full min-h-72 bg-slate-950 border border-slate-800 rounded-2xl p-5 text-green-300 outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

                <Link href="/coding" className="btn-blue mt-5 inline-flex">
                  Open Full Coding Lab
                </Link>
              </div>
            )}

            {activeTab === "quiz" && (
              <div>
                <h2 className="text-3xl font-bold mb-4">Quiz Practice</h2>
                <p className="text-slate-400 mb-6">
                  Move to the Quiz Center to attempt course assessments and view auto-scored results.
                </p>

                <Link href="/quiz" className="btn-purple">
                  Open Quiz Center
                </Link>
              </div>
            )}
          </div>

          <aside className="card">
            <h2 className="text-2xl font-bold">Learning Assistant Panel</h2>
            <p className="text-slate-400 mt-3">
              This panel keeps the student guided during the whole learning flow.
            </p>

            <div className="mt-6 space-y-4">
              <div className="card">
                <h3 className="font-bold">Step 1</h3>
                <p className="text-slate-400">Watch lesson.</p>
              </div>
              <div className="card">
                <h3 className="font-bold">Step 2</h3>
                <p className="text-slate-400">Save notes.</p>
              </div>
              <div className="card">
                <h3 className="font-bold">Step 3</h3>
                <p className="text-slate-400">Generate AI revision.</p>
              </div>
              <div className="card">
                <h3 className="font-bold">Step 4</h3>
                <p className="text-slate-400">Practice code and quiz.</p>
              </div>
            </div>

            <div className="card mt-5">
              <h3 className="font-bold mb-3">Live Output</h3>
              <pre className="overflow-auto text-green-300 text-xs max-h-80">
                {output ? JSON.stringify(output, null, 2) : "Actions output will appear here."}
              </pre>
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}