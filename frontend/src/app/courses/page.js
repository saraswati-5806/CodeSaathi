"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import { demoCourses } from "../../lib/demoData";

export default function CoursesPage() {
  const [role, setRole] = useState("student");
  const [q, setQ] = useState("");
  const [courses, setCourses] = useState(demoCourses);

  useEffect(() => {
    setRole(localStorage.getItem("codesaathi_role") || "student");
    const saved = JSON.parse(localStorage.getItem("codesaathi_instructor_courses") || "[]");
    if (saved.length) setCourses(saved);
  }, []);

  const filtered = courses.filter((c) =>
    `${c.title} ${c.category} ${c.description}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">{role === "instructor" ? "Course Management" : "Course Catalog"}</p>
          <h1 className="page-title mt-2">{role === "instructor" ? "Manage Courses" : "Choose Your Learning Path"}</h1>
          <input className="field mt-6" placeholder="Search course..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        <div className="grid-fit">
          {filtered.map((c) => (
            <div key={c.id || c._id || c.title} className="card">
              <div className={`h-40 rounded-3xl bg-gradient-to-br ${c.thumbnail || "from-blue-600 via-cyan-500 to-emerald-400"} mb-5 p-5 flex items-end`}>
                <span className="badge bg-slate-950/80">{c.category || "Course"}</span>
              </div>
              <h2 className="text-2xl font-bold">{c.title}</h2>
              <p className="text-slate-400 mt-3">{c.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="badge">{c.level || "Beginner"}</span>
                <span className="badge">{c.duration || "6 weeks"}</span>
              </div>

              {role !== "instructor" && (
                <>
                  <div className="progress mt-5"><span style={{ width: `${c.progress || 0}%` }} /></div>
                  <p className="text-sm text-slate-400 mt-2">Progress: {c.progress || 0}%</p>
                </>
              )}

              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                <a className="btn-blue" href={role === "instructor" ? "/instructor/dashboard" : "/learning-workspace"}>
                  {role === "instructor" ? "Edit Course" : "Continue"}
                </a>
                {role !== "instructor" && c.completed && <a className="btn-dark" href="/certificates">Certificate</a>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}