"use client";

import { useState } from "react";
import AppShell from "../../components/AppShell";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const demoCourses = [
  {
    _id: "demo-python",
    title: "Python Programming Foundation",
    description: "Beginner-friendly Python course with lectures, notes, quizzes, and coding practice.",
    category: "Programming",
    difficulty: "beginner",
  },
  {
    _id: "demo-dsa",
    title: "Data Structures for Coding Interviews",
    description: "Practice arrays, strings, loops, and interview-style coding problems.",
    category: "Coding",
    difficulty: "intermediate",
  },
  {
    _id: "demo-web",
    title: "Full Stack Web Development",
    description: "Learn frontend, backend, REST APIs, authentication, and deployment flow.",
    category: "Web Development",
    difficulty: "beginner",
  },
];

export default function CoursesPage() {
  const [token, setToken] = useState("");
  const [courses, setCourses] = useState(demoCourses);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("Demo courses are visible. Click Load Courses to fetch MongoDB courses.");

  const login = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "student@codesaathi.com", password: "Student@123" }),
      });
      const data = await res.json();
      setToken(data.token || "");
      setMessage(data.success ? "Student logged in. You can enroll now." : data.message || "Login failed.");
    } catch {
      setMessage("Backend connection failed. Showing demo courses.");
    }
  };

  const loadCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/courses`);
      const data = await res.json();
      const loaded = data.courses?.length ? data.courses : demoCourses;
      setCourses(loaded);
      setMessage(data.courses?.length ? "Courses loaded from MongoDB." : "No MongoDB courses found, showing demo courses for submission demo.");
    } catch {
      setCourses(demoCourses);
      setMessage("Could not reach backend, showing demo courses.");
    }
  };

  const enroll = async (courseId) => {
    if (courseId.startsWith("demo")) {
      setMessage("Demo course selected. Open Learning Workspace to continue.");
      return;
    }
    const res = await fetch(`${API_URL}/api/courses/${courseId}/enroll`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessage(data.message || "Enrollment action completed.");
  };

  const filtered = courses.filter((c) =>
    `${c.title} ${c.description} ${c.category}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="kicker">Course Catalog</p>
          <h1 className="page-title mt-2">Explore Learning Paths</h1>
          <p className="text-slate-300 mt-4 max-w-3xl">
            Browse courses, enroll, and continue into the unified workspace with lecture,
            notes, AI assistance, coding practice, and quiz flow.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <button onClick={login} className="btn-blue">Login Student</button>
            <button onClick={loadCourses} className="btn-purple">Load Courses</button>
            <Link href="/learning-workspace" className="btn-dark">Learning Workspace</Link>
          </div>
          <p className="text-green-300 mt-5 font-semibold">{message}</p>
        </div>

        <div className="card mb-6">
          <input
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid-fit">
          {filtered.map((course) => (
            <div key={course._id} className="card">
              <div className="h-36 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 mb-5 flex items-end p-4">
                <span className="bg-slate-950/80 px-3 py-1 rounded-full text-sm">{course.category}</span>
              </div>
              <h2 className="text-2xl font-bold">{course.title}</h2>
              <p className="text-slate-400 mt-3 leading-7">{course.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-sm">{course.difficulty}</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-sm">Video + Quiz + Coding</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                <button onClick={() => enroll(course._id)} disabled={!token && !course._id.startsWith("demo")} className="btn-blue">Enroll</button>
                <Link href="/learning-workspace" className="btn-dark">Continue</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
