"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function StudyWorkspacePage() {
  const [email, setEmail] = useState("student@codesaathi.com");
  const [password, setPassword] = useState("Student@123");
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("Python Loop Revision");
  const [content, setContent] = useState(
    "Python loops help repeat code. For loops are used for sequences like lists and strings. While loops run until a condition becomes false. Break stops a loop. Continue skips one iteration."
  );
  const [workspaceId, setWorkspaceId] = useState("");
  const [activeTab, setActiveTab] = useState("create");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (endpoint, method = "GET", body = null) => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: body ? JSON.stringify(body) : null,
      });

      const data = await res.json();
      setResult(data);
      return data;
    } catch (error) {
      setResult({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const loginStudent = async () => {
    const data = await request("/api/auth/login", "POST", {
      email,
      password,
    });

    if (data?.token) {
      setToken(data.token);
    }
  };

  const createWorkspace = async () => {
    const data = await request("/api/study-workspace", "POST", {
      title,
      content,
    });

    if (data?.workspace?._id) {
      setWorkspaceId(data.workspace._id);
    }
  };

  const generateSummary = () => {
    request(`/api/study-workspace/${workspaceId}/summary`, "POST");
  };

  const generateFlashcards = () => {
    request(`/api/study-workspace/${workspaceId}/flashcards`, "POST");
  };

  const generateStudyNotes = () => {
    request(`/api/study-workspace/${workspaceId}/study-notes`, "POST");
  };

  const generateQuiz = () => {
    request(`/api/study-workspace/${workspaceId}/generate-quiz`, "POST");
  };

  const getWorkspaces = () => {
    request("/api/study-workspace", "GET");
  };

  const tabs = [
    { id: "create", label: "Create Workspace" },
    { id: "summary", label: "Summary" },
    { id: "flashcards", label: "Flashcards" },
    { id: "notes", label: "Study Notes" },
    { id: "quiz", label: "Quiz From Notes" },
    { id: "history", label: "My Workspaces" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <section className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-purple-300 font-semibold">
            CodeSaathi AI Learning System
          </p>
          <h1 className="text-4xl font-bold mt-2">AI Study Workspace</h1>
          <p className="text-slate-300 mt-3">
            Create study material, generate summaries, flashcards, notes, and
            quizzes from one place.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Student Login</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Student Email"
            />

            <input
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />

            <button
              onClick={loginStudent}
              className="bg-purple-600 hover:bg-purple-700 rounded-xl px-5 py-3 font-semibold"
            >
              Login Student
            </button>
          </div>

          {token && (
            <p className="text-green-400 text-sm mt-3">
              Student authenticated successfully.
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl border ${
                activeTab === tab.id
                  ? "bg-blue-600 border-blue-500"
                  : "bg-slate-900 border-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          {activeTab === "create" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Create Workspace</h2>

              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 mb-4 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Workspace Title"
              />

              <textarea
                className="w-full min-h-40 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 mb-4 outline-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste study content here"
              />

              <button
                onClick={createWorkspace}
                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-5 py-3 font-semibold"
              >
                Create Workspace
              </button>

              {workspaceId && (
                <p className="text-green-400 mt-3">
                  Workspace ID: {workspaceId}
                </p>
              )}
            </div>
          )}

          {activeTab === "summary" && (
            <ToolSection
              title="Generate Summary"
              description="Create a short summary from your workspace content."
              workspaceId={workspaceId}
              setWorkspaceId={setWorkspaceId}
              onClick={generateSummary}
            />
          )}

          {activeTab === "flashcards" && (
            <ToolSection
              title="Generate Flashcards"
              description="Create quick revision flashcards."
              workspaceId={workspaceId}
              setWorkspaceId={setWorkspaceId}
              onClick={generateFlashcards}
            />
          )}

          {activeTab === "notes" && (
            <ToolSection
              title="Generate Study Notes"
              description="Turn content into structured study notes."
              workspaceId={workspaceId}
              setWorkspaceId={setWorkspaceId}
              onClick={generateStudyNotes}
            />
          )}

          {activeTab === "quiz" && (
            <ToolSection
              title="Generate Quiz From Notes"
              description="Create a practice quiz from your study content."
              workspaceId={workspaceId}
              setWorkspaceId={setWorkspaceId}
              onClick={generateQuiz}
            />
          )}

          {activeTab === "history" && (
            <div>
              <h2 className="text-2xl font-bold mb-3">My Workspaces</h2>
              <p className="text-slate-300 mb-4">
                View all study workspaces created by the logged-in student.
              </p>

              <button
                onClick={getWorkspaces}
                className="bg-purple-600 hover:bg-purple-700 rounded-xl px-5 py-3 font-semibold"
              >
                Load My Workspaces
              </button>
            </div>
          )}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-semibold mb-3">Output</h2>

          {loading && <p className="text-yellow-400">Processing...</p>}

          {!loading && result && (
            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-auto text-sm text-green-300">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}

          {!loading && !result && (
            <p className="text-slate-400">
              Result will appear here after using any AI Study Workspace tool.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

function ToolSection({ title, description, workspaceId, setWorkspaceId, onClick }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-slate-300 mb-4">{description}</p>

      <input
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 mb-4 outline-none"
        value={workspaceId}
        onChange={(e) => setWorkspaceId(e.target.value)}
        placeholder="Workspace ID"
      />

      <button
        onClick={onClick}
        disabled={!workspaceId}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl px-5 py-3 font-semibold"
      >
        Run Tool
      </button>
    </div>
  );
}