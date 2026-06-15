"use client";

import Link from "next/link";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function StudentDashboard() {
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);

  const login = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@codesaathi.com", password: "Student@123" }),
    });

    const result = await res.json();
    setToken(result.token || "");
    setData(result);
  };

  const loadProgress = async () => {
    const res = await fetch(`${API_URL}/api/progress/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData(await res.json());
  };

  const loadXP = async () => {
    const res = await fetch(`${API_URL}/api/leaderboard/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData(await res.json());
  };

  return (
    <main className="page">
      <section className="container">
        <div className="card mb-8">
          <p className="text-purple-300 font-bold">Student Panel</p>
          <h1 className="section-title mt-2">Student Dashboard</h1>
          <p className="text-slate-300 mt-3">
            Start learning, track progress, use AI tools, solve coding tasks,
            and earn certificates.
          </p>

          <div className="grid-auto mt-6">
            <button onClick={login} className="btn-primary">
              Login Student
            </button>
            <button onClick={loadProgress} disabled={!token} className="btn-dark">
              View Progress
            </button>
            <button onClick={loadXP} disabled={!token} className="btn-purple">
              View XP
            </button>
          </div>
        </div>

        <div className="grid-auto">
          <Link href="/courses" className="card">
            <h2 className="text-2xl font-bold">Courses</h2>
            <p className="text-slate-400 mt-2">Browse and enroll in courses.</p>
          </Link>

          <Link href="/coding" className="card">
            <h2 className="text-2xl font-bold">Coding Lab</h2>
            <p className="text-slate-400 mt-2">Solve coding challenges.</p>
          </Link>

          <Link href="/quiz" className="card">
            <h2 className="text-2xl font-bold">Quiz Center</h2>
            <p className="text-slate-400 mt-2">Attempt assessments.</p>
          </Link>

          <Link href="/study-workspace" className="card">
            <h2 className="text-2xl font-bold">AI Workspace</h2>
            <p className="text-slate-400 mt-2">Generate notes, quiz, summary.</p>
          </Link>

          <Link href="/leaderboard" className="card">
            <h2 className="text-2xl font-bold">Leaderboard</h2>
            <p className="text-slate-400 mt-2">Track XP and badges.</p>
          </Link>

          <Link href="/certificates" className="card">
            <h2 className="text-2xl font-bold">Certificates</h2>
            <p className="text-slate-400 mt-2">View earned certificates.</p>
          </Link>
        </div>

        <pre className="card mt-8 overflow-auto text-green-300 text-sm">
          {data ? JSON.stringify(data, null, 2) : "Output will appear here."}
        </pre>
      </section>
    </main>
  );
}