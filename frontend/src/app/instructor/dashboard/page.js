"use client";

import { useEffect, useState } from "react";
import AppShell from "../../../components/AppShell";
import { demoCourses } from "../../../lib/demoData";

const emptyCourse = {
  title: "",
  category: "",
  level: "Beginner",
  duration: "",
  videoUrl: "",
  description: "",
  modules: "",
  thumbnail: "from-blue-600 via-cyan-500 to-emerald-400",
};

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyCourse);
  const [editingId, setEditingId] = useState(null);
  const [resources, setResources] = useState([]);
  const [resourceForm, setResourceForm] = useState({
    title: "",
    type: "Notes",
    url: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedCourses = localStorage.getItem("codesaathi_instructor_courses");
    const savedResources = localStorage.getItem("codesaathi_resources");

    setCourses(savedCourses ? JSON.parse(savedCourses) : demoCourses);
    setResources(
      savedResources
        ? JSON.parse(savedResources)
        : [
            {
              id: "res-1",
              title: "Python Loop Notes",
              type: "Notes",
              url: "https://docs.python.org/3/tutorial/controlflow.html",
            },
            {
              id: "res-2",
              title: "Python Lecture Video",
              type: "YouTube",
              url: "https://www.youtube.com/embed/kqtD5dpn9C8",
            },
          ]
    );
  }, []);

  const persistCourses = (nextCourses) => {
    setCourses(nextCourses);
    localStorage.setItem("codesaathi_instructor_courses", JSON.stringify(nextCourses));
  };

  const persistResources = (nextResources) => {
    setResources(nextResources);
    localStorage.setItem("codesaathi_resources", JSON.stringify(nextResources));
  };

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const createOrUpdateCourse = () => {
    if (!form.title || !form.description) {
      setMessage("Course title and description are required.");
      return;
    }

    const formattedCourse = {
      ...form,
      id: editingId || `course-${Date.now()}`,
      progress: editingId
        ? courses.find((course) => course.id === editingId)?.progress || 0
        : 0,
      completed: false,
      modules: form.modules
        .split(",")
        .map((module) => module.trim())
        .filter(Boolean),
    };

    let nextCourses;

    if (editingId) {
      nextCourses = courses.map((course) =>
        course.id === editingId ? formattedCourse : course
      );
      setMessage("Course updated successfully.");
    } else {
      nextCourses = [formattedCourse, ...courses];
      setMessage("Course created successfully.");
    }

    persistCourses(nextCourses);
    setForm(emptyCourse);
    setEditingId(null);
  };

  const editCourse = (course) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      category: course.category,
      level: course.level,
      duration: course.duration,
      videoUrl: course.videoUrl,
      description: course.description,
      modules: Array.isArray(course.modules) ? course.modules.join(", ") : "",
      thumbnail: course.thumbnail,
    });
    setMessage("Editing course. Update fields and save.");
  };

  const deleteCourse = (courseId) => {
    const nextCourses = courses.filter((course) => course.id !== courseId);
    persistCourses(nextCourses);
    setMessage("Course deleted successfully.");
  };

  const addResource = () => {
    if (!resourceForm.title || !resourceForm.url) {
      setMessage("Resource title and URL are required.");
      return;
    }

    const nextResources = [
      {
        ...resourceForm,
        id: `resource-${Date.now()}`,
      },
      ...resources,
    ];

    persistResources(nextResources);
    setResourceForm({ title: "", type: "Notes", url: "" });
    setMessage("Resource added successfully.");
  };

  const deleteResource = (resourceId) => {
    const nextResources = resources.filter((resource) => resource.id !== resourceId);
    persistResources(nextResources);
    setMessage("Resource deleted successfully.");
  };

  const totalModules = courses.reduce(
    (total, course) => total + (course.modules?.length || 0),
    0
  );

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">Instructor Panel</p>
          <h1 className="page-title mt-2">Manage Learning Content</h1>
          <p className="text-slate-300 mt-4">
            Create, edit, delete courses, manage resources, prepare quizzes,
            schedule live classes, and view analytics.
          </p>

          {message && (
            <div className="mini-card mt-5 text-green-300">
              {message}
            </div>
          )}
        </div>

        <div className="grid-fit mb-6">
          <div className="card">
            <p className="text-slate-400">Total Courses</p>
            <h2 className="text-4xl font-black mt-2">{courses.length}</h2>
          </div>
          <div className="card">
            <p className="text-slate-400">Total Modules</p>
            <h2 className="text-4xl font-black mt-2">{totalModules}</h2>
          </div>
          <div className="card">
            <p className="text-slate-400">Resources</p>
            <h2 className="text-4xl font-black mt-2">{resources.length}</h2>
          </div>
          <div className="card">
            <p className="text-slate-400">Demo Analytics</p>
            <h2 className="text-4xl font-black mt-2">92%</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.2fr] gap-6 mb-6">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">
              {editingId ? "Edit Course" : "Create Course"}
            </h2>

            <div className="space-y-4">
              <input
                className="field"
                placeholder="Course Title"
                value={form.title}
                onChange={(event) => updateForm("title", event.target.value)}
              />

              <input
                className="field"
                placeholder="Category"
                value={form.category}
                onChange={(event) => updateForm("category", event.target.value)}
              />

              <select
                className="field"
                value={form.level}
                onChange={(event) => updateForm("level", event.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <input
                className="field"
                placeholder="Duration"
                value={form.duration}
                onChange={(event) => updateForm("duration", event.target.value)}
              />

              <input
                className="field"
                placeholder="YouTube Embed URL"
                value={form.videoUrl}
                onChange={(event) => updateForm("videoUrl", event.target.value)}
              />

              <textarea
                className="field min-h-28"
                placeholder="Description"
                value={form.description}
                onChange={(event) => updateForm("description", event.target.value)}
              />

              <textarea
                className="field min-h-24"
                placeholder="Modules comma separated, example: Intro, Loops, Functions"
                value={form.modules}
                onChange={(event) => updateForm("modules", event.target.value)}
              />

              <div className="grid sm:grid-cols-2 gap-3">
                <button onClick={createOrUpdateCourse} className="btn-blue">
                  {editingId ? "Update Course" : "Create Course"}
                </button>

                <button
                  onClick={() => {
                    setForm(emptyCourse);
                    setEditingId(null);
                    setMessage("Form cleared.");
                  }}
                  className="btn-dark"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Course List</h2>

            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="mini-card">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      <p className="text-slate-400 mt-1">{course.description}</p>
                      <p className="text-sm text-purple-300 mt-2">
                        {course.category} • {course.level} • {course.duration}
                      </p>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => editCourse(course)} className="btn-purple">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="btn-dark"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.2fr] gap-6 mb-6">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Add Resource</h2>

            <div className="space-y-4">
              <input
                className="field"
                placeholder="Resource Title"
                value={resourceForm.title}
                onChange={(event) =>
                  setResourceForm((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }))
                }
              />

              <select
                className="field"
                value={resourceForm.type}
                onChange={(event) =>
                  setResourceForm((prev) => ({
                    ...prev,
                    type: event.target.value,
                  }))
                }
              >
                <option>Notes</option>
                <option>YouTube</option>
                <option>PDF</option>
                <option>Assignment</option>
              </select>

              <input
                className="field"
                placeholder="Resource URL"
                value={resourceForm.url}
                onChange={(event) =>
                  setResourceForm((prev) => ({
                    ...prev,
                    url: event.target.value,
                  }))
                }
              />

              <button onClick={addResource} className="btn-blue">
                Add Resource
              </button>
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Resources</h2>

            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource.id} className="mini-card">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{resource.title}</h3>
                      <p className="text-slate-400 mt-1">{resource.type}</p>
                      <p className="text-sm text-slate-400 break-all mt-2">
                        {resource.url}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteResource(resource.id)}
                      className="btn-dark"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid-fit">
          <div className="card">
            <h2 className="text-2xl font-bold">Quiz Generator</h2>
            <p className="text-slate-400 mt-3">
              Generate MCQ assessments for students.
            </p>
            <button
              className="btn-purple mt-5"
              onClick={() => setMessage("Demo quiz generated successfully.")}
            >
              Generate Quiz
            </button>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold">Live Classes</h2>
            <p className="text-slate-400 mt-3">
              Schedule instructor-led live sessions.
            </p>
            <button
              className="btn-dark mt-5"
              onClick={() => setMessage("Live class scheduled for tomorrow.")}
            >
              Schedule Class
            </button>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold">Student Analytics</h2>
            <p className="text-slate-400 mt-3">
              Aarav Sharma completed Python course and earned certificate.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}