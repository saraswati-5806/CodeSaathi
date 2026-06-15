"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CodingPage() {
  const [token, setToken] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [challengeId, setChallengeId] = useState("");
  const [code, setCode] = useState('print("Hello World")');
  const [output, setOutput] = useState(null);

  const login = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@codesaathi.com", password: "Student@123" }),
    });

    const data = await res.json();
    setToken(data.token);
    setOutput(data);
  };

  const loadChallenges = async () => {
    const res = await fetch(`${API_URL}/api/coding`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setChallenges(data.challenges || []);
    if (data.challenges?.[0]?._id) setChallengeId(data.challenges[0]._id);
    setOutput(data);
  };

  const submitCode = async () => {
    const res = await fetch(`${API_URL}/api/coding/${challengeId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ language: "python", code }),
    });

    setOutput(await res.json());
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">Coding Challenge Lab</h1>
        <p className="text-slate-300 mt-3">
          Solve coding problems, submit code, and view test results.
        </p>

        <div className="flex flex-wrap gap-4 mt-6">
          <button onClick={login} className="bg-blue-600 px-5 py-3 rounded-xl font-semibold">
            Login Student
          </button>
          <button onClick={loadChallenges} disabled={!token} className="bg-purple-600 px-5 py-3 rounded-xl font-semibold">
            Load Challenges
          </button>
          <button onClick={submitCode} disabled={!challengeId} className="bg-green-600 px-5 py-3 rounded-xl font-semibold">
            Submit Code
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-2xl font-bold mb-4">Challenges</h2>
            {challenges.map((challenge) => (
              <button
                key={challenge._id}
                onClick={() => setChallengeId(challenge._id)}
                className="block w-full text-left bg-slate-800 rounded-xl p-4 mb-3"
              >
                <b>{challenge.title}</b>
                <p className="text-slate-400">{challenge.description}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
            <textarea
              className="w-full min-h-60 bg-slate-950 border border-slate-800 rounded-xl p-4 text-green-300"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>

        <pre className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 overflow-auto text-green-300 text-sm">
          {output ? JSON.stringify(output, null, 2) : "Output will appear here."}
        </pre>
      </section>
    </main>
  );
}