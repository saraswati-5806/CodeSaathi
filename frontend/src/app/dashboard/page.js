"use client";

import { useState } from "react";
import AppShell from "../../components/AppShell";
import StatCard from "../../components/StatCard";
import ModuleCard from "../../components/ModuleCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function StudentDashboard() {
  const [token, setToken] = useState("");
  const [output, setOutput] = useState(null);
  const [stats, setStats] = useState({
    courses: 0,
    quizzes: 0,
    coding: 0,
    xp: 0,
  });

  const login = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@codesaathi.com", password: "Student@123" }),
    });

    const result = await res.json();
    setToken(result.token || "");
    setOutput(result);
  };

  const loadProgress = async () => {
    const res = await fetch(`${API_URL}/api/progress/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();
    setOutput(result);

    setStats((prev) => ({
      ...prev,
      courses: result.analytics?.enrolledCourses || 0,
      quizzes: result.analytics?.quizzesAttempted || 0,
      coding: result.analytics?.codingSubmissions || 0,
    }));
  };

  const loadXP = async () => {
    const res = await fetch(`${API_URL}/api/leaderboard/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();
    setOutput(result);

    setStats((prev) => ({
      ...prev,
      xp: result.profile?.xp?.total || 0,
    }));
  };

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">Student Learning Dashboard</p>
          <h1 className="page-title mt-2">Welcome back, Learner</h1>
          <p className="text-slate-300 mt-4 max-w-3xl">
            Continue your learning journey with courses, quizzes, coding
            challenges, AI study tools, XP tracking, and certificates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button onClick={login} className="btn-blue">
              Login Demo Student
            </button>
            <button onClick={loadProgress} disabled={!token} className="btn-dark">
              Load Progress
            </button>
            <button onClick={loadXP} disabled={!token} className="btn-purple">
              Load XP
            </button>
          </div>
        </div>

        <div className="grid-fit mb-6">
          <StatCard title="Enrolled Courses" value={stats.courses} subtitle="Courses joined" />
          <StatCard title="Quizzes Attempted" value={stats.quizzes} subtitle="Assessment activity" />
          <StatCard title="Coding Submissions" value={stats.coding} subtitle="Practice attempts" />
          <StatCard title="Total XP" value={stats.xp} subtitle="Gamified progress" />
        </div>

        <div className="grid-fit">
          <ModuleCard
            title="Course Catalog"
            description="Browse structured courses and enroll as a student."
            href="/courses"
            action="Open Courses →"
          />

          <ModuleCard
            title="Coding Lab"
            description="Solve programming problems and submit code."
            href="/coding"
            action="Start Coding →"
          />

          <ModuleCard
            title="Quiz Center"
            description="Attempt quizzes and view scores instantly."
            href="/quiz"
            action="Attempt Quiz →"
          />

          <ModuleCard
            title="AI Study Workspace"
            description="Generate summaries, flashcards, notes, and quizzes."
            href="/study-workspace"
            action="Use AI Tools →"
          />

          <ModuleCard
            title="Leaderboard"
            description="Track XP, badges, and student ranking."
            href="/leaderboard"
            action="View Ranking →"
          />

          <ModuleCard
            title="Certificate Center"
            description="Generate and view course completion certificates."
            href="/certificates"
            action="Open Certificates →"
          />
        </div>

        <div className="card mt-6">
          <h2 className="text-2xl font-bold mb-4">Live API Output</h2>
          <pre className="overflow-auto text-green-300 text-sm">
            {output ? JSON.stringify(output, null, 2) : "Click Login / Progress / XP to verify backend connection."}
          </pre>
        </div>
      </section>
    </AppShell>
  );
}