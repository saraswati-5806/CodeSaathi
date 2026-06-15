"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function InstructorDashboard() {
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);

  const loginInstructor = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "instructor@codesaathi.com", password: "Instructor@123" }),
    });
    const result = await res.json();
    setToken(result.token);
    setData(result);
  };

  const createCourse = async () => {
    const res = await fetch(`${API_URL}/api/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title: "JavaScript Mastery",
        description: "Complete JavaScript course for beginners",
        category: "Programming",
        difficulty: "beginner",
      }),
    });
    setData(await res.json());
  };

  const createChallenge = async () => {
    const res = await fetch(`${API_URL}/api/coding`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title: "Print Welcome",
        description: "Print Welcome to CodeSaathi",
        difficulty: "easy",
        testCases: [{ input: "", expectedOutput: "Welcome to CodeSaathi" }],
        hints: ["Use print/console.log"],
      }),
    });
    setData(await res.json());
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <section className="max-w-6xl mx-auto">
        <p className="text-purple-300 font-semibold">CodeSaathi Instructor Panel</p>
        <h1 className="text-4xl font-bold mt-2">Instructor Dashboard</h1>
        <p className="text-slate-300 mt-3">Create courses, coding tasks, quizzes, live classes, and manage learning flow.</p>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <button onClick={loginInstructor} className="bg-blue-600 rounded-xl p-4 font-semibold">Login Instructor</button>
          <button disabled={!token} onClick={createCourse} className="bg-slate-800 rounded-xl p-4 font-semibold">Create Demo Course</button>
          <button disabled={!token} onClick={createChallenge} className="bg-slate-800 rounded-xl p-4 font-semibold">Create Coding Challenge</button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-xl font-bold">Course Management</h2>
            <p className="text-slate-400 mt-2">Create/edit courses and lectures.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-xl font-bold">Quiz Workflow</h2>
            <p className="text-slate-400 mt-2">Instructor-led quiz and assessment creation.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-xl font-bold">Live Classes</h2>
            <p className="text-slate-400 mt-2">Schedule instructor-led sessions.</p>
          </div>
        </div>

        <pre className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 overflow-auto text-green-300 text-sm">
          {data ? JSON.stringify(data, null, 2) : "Instructor output will appear here."}
        </pre>
      </section>
    </main>
  );
}