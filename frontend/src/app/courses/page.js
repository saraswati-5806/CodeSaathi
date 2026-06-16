"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import { demoCourses } from "../../lib/demoData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CoursesPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("student");
  const [courses, setCourses] = useState(demoCourses);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("codesaathi_role") || "student");

    const savedInstructorCourses = JSON.parse(
      localStorage.getItem("codesaathi_instructor_courses") || "[]"
    );

    if (savedInstructorCourses.length > 0) {
      setCourses(savedInstructorCourses);
    }

    loadCoursesFromBackend();
  }, []);

  const loadCoursesFromBackend = async () => {
    try {
      const response = await fetch(`${API_URL}/api/courses`);
      const data = await response.json();

      if (data?.courses?.length > 0) {
        setCourses(data.courses);
        setMessage("Courses loaded from backend.");
      }
    } catch {
      setMessage("Showing local courses because backend courses could not be loaded.");
    }
  };

  const filtered = courses.filter((course) =>
    `${course.title} ${course.category} ${course.description}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">
            {role === "instructor" ? "Course Management" : "Course Catalog"}
          </p>

          <h1 className="page-title mt-2">
            {role === "instructor" ? "Manage Course Library" : "Choose Your Learning Path"}
          </h1>

          <p className="text-slate-300 mt-4">
            {role === "instructor"
              ? "View and manage courses created by instructors."
              : "Browse courses, continue learning, watch lectures, and track progress."}
          </p>

          <input
            className="field mt-6"
            placeholder="Search course..."
            value={q}
            onChange={(event) => setQ(event.target.value)}
          />

          {message && <p className="text-slate-400 mt-3">{message}</p>}
        </div>

        <div className="grid-fit">
          {filtered.map((course) => {
            const progress = course.progress || 0;
            const thumbnail =
              course.thumbnail || "from-blue-600 via-cyan-500 to-emerald-400";

            return (
              <div key={course._id || course.id || course.title} className="card">
                <div
                  className={`h-40 rounded-3xl bg-gradient-to-br ${thumbnail} mb-5 p-5 flex items-end`}
                >
                  <span className="badge bg-slate-950/80">
                    {course.category || "Programming"}
                  </span>
                </div>

                <h2 className="text-2xl font-bold">{course.title}</h2>

                <p className="text-slate-400 mt-3 leading-7">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="badge">{course.level || course.difficulty || "Beginner"}</span>
                  <span className="badge">{course.duration || "6 weeks"}</span>
                  {course.completed && <span className="badge">Completed</span>}
                </div>

                {role !== "instructor" && (
                  <>
                    <div className="progress mt-5">
                      <span style={{ width: `${progress}%` }} />
                    </div>

                    <p className="text-sm text-slate-400 mt-2">
                      Progress: {progress}%
                    </p>
                  </>
                )}

                <div className="grid sm:grid-cols-2 gap-3 mt-5">
                  {role === "instructor" ? (
                    <a className="btn-purple" href="/instructor/dashboard">
                      Edit Course
                    </a>
                  ) : (
                    <a className="btn-blue" href="/learning-workspace">
                      Continue
                    </a>
                  )}

                  {role !== "instructor" && course.completed && (
                    <a className="btn-dark" href="/certificates">
                      Certificate
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}