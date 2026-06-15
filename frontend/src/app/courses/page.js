"use client";

import { useState } from "react";
import AppShell from "../../components/AppShell";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CoursesPage() {
  const [token, setToken] = useState("");
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
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

  const loadCourses = async () => {
    const res = await fetch(`${API_URL}/api/courses`);
    const data = await res.json();
    setCourses(data.courses || []);
    setOutput(data);
  };

  const enroll = async (courseId) => {
    const res = await fetch(`${API_URL}/api/courses/${courseId}/enroll`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    setOutput(await res.json());
  };

  const filteredCourses = courses.filter((course) =>
    `${course.title} ${course.description} ${course.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">Course Catalog</p>
          <h1 className="page-title mt-2">Explore Learning Paths</h1>
          <p className="text-slate-300 mt-4 max-w-3xl">
            Browse courses, enroll as a student, and continue learning in the
            unified workspace with notes, AI tools, quiz, and coding practice.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <button onClick={login} className="btn-blue">
              Login Student
            </button>
            <button onClick={loadCourses} className="btn-purple">
              Load Courses
            </button>
            <Link href="/learning-workspace" className="btn-dark text-center">
              Open Learning Workspace
            </Link>
          </div>
        </div>

        <div className="card mb-6">
          <input
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 outline-none"
            placeholder="Search courses by title, category, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid-fit">
          {filteredCourses.map((course) => (
            <div key={course._id} className="card">
              <div className="h-36 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 mb-5 flex items-end p-4">
                <span className="bg-slate-950/80 px-3 py-1 rounded-full text-sm">
                  {course.category || "Programming"}
                </span>
              </div>

              <h2 className="text-2xl font-bold">{course.title}</h2>
              <p className="text-slate-400 mt-3 leading-7">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-sm">
                  {course.difficulty || "beginner"}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-sm">
                  LMS Course
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                <button
                  onClick={() => enroll(course._id)}
                  disabled={!token}
                  className="btn-blue"
                >
                  Enroll
                </button>

                <Link href="/learning-workspace" className="btn-dark text-center">
                  Continue
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="card text-center">
            <p className="text-slate-300">
              No courses loaded yet. Click “Load Courses”.
            </p>
          </div>
        )}

        <div className="card mt-6">
          <h2 className="text-2xl font-bold mb-4">Course API Output</h2>
          <pre className="overflow-auto text-green-300 text-sm">
            {output ? JSON.stringify(output, null, 2) : "Course actions output will appear here."}
          </pre>
        </div>
      </section>
    </AppShell>
  );
}