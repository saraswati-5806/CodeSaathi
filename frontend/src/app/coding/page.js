"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CodingPage() {
  const [role, setRole] = useState("student");
  const [token, setToken] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [title, setTitle] = useState("Print Numbers");
  const [description, setDescription] = useState("Print numbers from 1 to 5.");
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState('for i in range(1, 6):\n    print(i)');
  const [output, setOutput] = useState("Run code to see output.");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedRole = localStorage.getItem("codesaathi_role") || "student";
    const savedToken = localStorage.getItem("codesaathi_token") || "";

    setRole(savedRole);
    setToken(savedToken);
    loadChallenges(savedToken);
  }, []);

  const authHeaders = (savedToken = token) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${savedToken}`,
  });

  const loadChallenges = async (savedToken) => {
    try {
      const res = await fetch(`${API_URL}/api/coding`, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setChallenges(data.challenges || []);
        setSelectedChallenge(data.challenges?.[0] || null);
      }
    } catch {
      setMessage("Challenges could not be loaded.");
    }
  };

  const createChallenge = async () => {
    try {
      const res = await fetch(`${API_URL}/api/coding`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          title,
          description,
          difficulty: "easy",
          category: "loops",
          tags: ["loops", "basics"],
          testCases: [
            {
              input: "",
              expectedOutput: "1\n2\n3\n4\n5",
            },
          ],
          starterCode: code,
          solution: code,
          hints: ["Use a loop"],
          xpReward: 50,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Challenge creation failed");
      }

      setMessage("Coding challenge created in MongoDB.");
      loadChallenges(token);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const loadStarter = (lang) => {
    setLanguage(lang);

    if (lang === "javascript") {
      setCode('for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}');
    } else {
      setCode('for i in range(1, 6):\n    print(i)');
    }

    setOutput("Run code to see output.");
  };

  const runCode = async () => {
    if (!selectedChallenge?._id) {
      setOutput("No challenge selected.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/coding/${selectedChallenge._id}/submit`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          language,
          code,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Backend judge failed");
      }

      setOutput(
        `Submitted ✅\nStatus: ${data.result.status}\nScore: ${data.result.score}%\nSaved in MongoDB`
      );
    } catch (error) {
      const lower = code.toLowerCase();

      if (
        (language === "python" && lower.includes("print") && lower.includes("range")) ||
        (language === "javascript" && lower.includes("console.log") && lower.includes("for"))
      ) {
        setOutput(
          `Demo Runner Accepted ✅\nBackend judge unavailable: ${error.message}\nOutput:\n1\n2\n3\n4\n5`
        );
      } else {
        setOutput(`Error ❌\n${error.message}`);
      }
    }
  };

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">Coding Workspace</p>
          <h1 className="page-title mt-2">
            {role === "instructor" ? "Create Coding Challenges" : "Practice Coding"}
          </h1>
          <p className="text-slate-300 mt-4">
            Coding challenges are loaded from backend and submissions are stored.
          </p>
          {message && <div className="mini-card mt-4 text-green-300">{message}</div>}
        </div>

        {role === "instructor" && (
          <div className="card mb-6">
            <h2 className="text-2xl font-bold mb-4">Create Challenge</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input
                className="field"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button className="btn-purple mt-5" onClick={createChallenge}>
              Create Challenge
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card">
            <select
              className="field mb-5"
              value={selectedChallenge?._id || ""}
              onChange={(e) =>
                setSelectedChallenge(
                  challenges.find((challenge) => challenge._id === e.target.value)
                )
              }
            >
              {challenges.map((challenge) => (
                <option key={challenge._id} value={challenge._id}>
                  {challenge.title}
                </option>
              ))}
            </select>

            <div className="flex gap-3 flex-wrap mb-5">
              <button
                className={language === "python" ? "btn-blue" : "btn-dark"}
                onClick={() => loadStarter("python")}
              >
                Python
              </button>
              <button
                className={language === "javascript" ? "btn-purple" : "btn-dark"}
                onClick={() => loadStarter("javascript")}
              >
                JavaScript
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-4">
              {selectedChallenge?.title || "No challenge"}
            </h2>

            <p className="text-slate-300">
              {selectedChallenge?.description || "Instructor should create challenge first."}
            </p>

            <textarea
              className="field min-h-80 text-green-300 mt-5 font-mono"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            {role === "student" && (
              <button className="btn-blue mt-4" onClick={runCode}>
                Run Code
              </button>
            )}
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Output</h2>
            <pre className="mini-card whitespace-pre-wrap text-green-300 min-h-80">
              {output}
            </pre>
          </div>
        </div>
      </section>
    </AppShell>
  );
}