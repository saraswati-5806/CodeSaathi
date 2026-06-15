"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CoursesPage() {
  const [token, setToken] = useState("");
  const [courses, setCourses] = useState([]);
  const [output, setOutput] = useState(null);

  const login = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@codesaathi.com", password: "Student@123" }),
    });
    const data = await res.json();
    setToken(data.token);
  };

  const loadCourses = async () => {
    const res = await fetch(`${API_URL}/api/courses`);
    const data = await res.json();
    setCourses(data.courses || []);
  };

  const enroll = async (courseId) => {
    const res = await fetch(`${API_URL}/api/courses/${courseId}/enroll`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    setOutput(await res.json());
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">Course Catalog</h1>
        <p className="text-slate-300 mt-3">Explore structured learning paths and enroll in courses.</p>

        <div className="flex gap-4 mt-6">
          <button onClick={login} className="bg-blue-600 px-5 py-3 rounded-xl font-semibold">Login Student</button>
          <button onClick={loadCourses} className="bg-purple-600 px-5 py-3 rounded-xl font-semibold">Load Courses</button>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {courses.map((course) => (
            <div key={course._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="h-32 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 mb-4" />
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-slate-400 mt-2">{course.description}</p>
              <p className="text-sm text-purple-300 mt-3">{course.category} • {course.difficulty}</p>
              <button onClick={() => enroll(course._id)} disabled={!token} className="mt-4 bg-blue-600 w-full py-3 rounded-xl font-semibold">
                Enroll
              </button>
            </div>
          ))}
        </div>

        {output && (
          <pre className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 overflow-auto text-green-300 text-sm">
            {JSON.stringify(output, null, 2)}
          </pre>
        )}
      </section>
    </main>
  );
}