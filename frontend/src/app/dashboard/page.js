"use client";

import { useState } from "react";
import AppShell from "../../components/AppShell";
import StatCard from "../../components/StatCard";
import ModuleCard from "../../components/ModuleCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function StudentDashboard() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("Login first, then load progress.");
  const [stats, setStats] = useState({ courses: 0, quizzes: 0, coding: 0, xp: 0 });

  const login = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "student@codesaathi.com", password: "Student@123" }),
      });
      const data = await res.json();
      setToken(data.token || "");
      setMessage(data.success ? "Student logged in successfully." : data.message || "Login failed.");
    } catch {
      setMessage("Backend connection failed. Check Render URL in Vercel env.");
    }
  };

  const loadProgress = async () => {
    const res = await fetch(`${API_URL}/api/progress/me`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setStats((p) => ({
      ...p,
      courses: data.analytics?.enrolledCourses || 0,
      quizzes: data.analytics?.quizzesAttempted || 0,
      coding: data.analytics?.codingSubmissions || 0,
    }));
    setMessage("Progress loaded from backend.");
  };

  const loadXP = async () => {
    const res = await fetch(`${API_URL}/api/leaderboard/me`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setStats((p) => ({ ...p, xp: data.profile?.xp?.total || 0 }));
    setMessage("XP loaded from backend.");
  };

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="kicker">Student Learning Dashboard</p>
          <h1 className="page-title mt-2">Welcome back, Learner</h1>
          <p className="text-slate-300 mt-4 max-w-3xl">
            Continue learning with courses, coding practice, quizzes, AI revision,
            leaderboard XP, and certificates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button onClick={login} className="btn-blue">Login Demo Student</button>
            <button onClick={loadProgress} disabled={!token} className="btn-dark">Load Progress</button>
            <button onClick={loadXP} disabled={!token} className="btn-purple">Load XP</button>
          </div>
          <p className="text-green-300 mt-5 font-semibold">{message}</p>
        </div>

        <div className="grid-fit mb-6">
          <StatCard title="Enrolled Courses" value={stats.courses} subtitle="Learning paths joined" />
          <StatCard title="Quizzes Attempted" value={stats.quizzes} subtitle="Assessments completed" />
          <StatCard title="Coding Submissions" value={stats.coding} subtitle="Practice attempts" />
          <StatCard title="Total XP" value={stats.xp} subtitle="Gamified progress" />
        </div>

        <div className="grid-fit">
          <ModuleCard title="Course Catalog" description="Browse courses, enroll, and continue to workspace." href="/courses" action="Open Courses →" />
          <ModuleCard title="Unified Learning Workspace" description="Study lecture, notes, AI tools, coding, and quiz in one flow." href="/learning-workspace" action="Continue Learning →" />
          <ModuleCard title="Coding Lab" description="Solve programming problems and submit code." href="/coding" action="Start Coding →" />
          <ModuleCard title="Quiz Center" description="Attempt assessments and view instant score." href="/quiz" action="Attempt Quiz →" />
          <ModuleCard title="Leaderboard" description="Track XP, badges, and rank." href="/leaderboard" action="View Ranking →" />
          <ModuleCard title="Certificates" description="Generate and view completion certificate." href="/certificates" action="Open Certificates →" />
        </div>
      </section>
    </AppShell>
  );
}
