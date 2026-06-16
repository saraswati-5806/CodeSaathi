"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import { demoQuizzes } from "../../lib/demoData";

export default function QuizPage() {
  const [role, setRole] = useState("student");
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState("10");
  const [assignment, setAssignment] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const r = localStorage.getItem("codesaathi_role") || "student";
    const custom = JSON.parse(localStorage.getItem("codesaathi_quizzes") || "[]");
    setRole(r);
    setQuizzes([...custom, ...demoQuizzes]);
  }, []);

  const saveQuiz = () => {
    if (!title.trim()) return setMessage("Quiz title is required.");

    const newQuiz = {
      id: `quiz-${Date.now()}`,
      title,
      questions: Number(questions) || 10,
      time: "20 min",
      status: "Pending",
      score: null,
      assignment: assignment || "Complete related practice questions.",
    };

    const old = JSON.parse(localStorage.getItem("codesaathi_quizzes") || "[]");
    const updated = [newQuiz, ...old];
    localStorage.setItem("codesaathi_quizzes", JSON.stringify(updated));
    setQuizzes([...updated, ...demoQuizzes]);
    setTitle("");
    setQuestions("10");
    setAssignment("");
    setMessage("Quiz and assignment created. Student side will show it.");
  };

  const attemptQuiz = (id) => {
    const updated = quizzes.map((q) => q.id === id ? { ...q, status: "Completed", score: 90 } : q);
    setQuizzes(updated);
    const custom = updated.filter((q) => String(q.id).startsWith("quiz-"));
    localStorage.setItem("codesaathi_quizzes", JSON.stringify(custom));
  };

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">{role === "instructor" ? "Create Assessments" : "Assessment Center"}</p>
          <h1 className="page-title mt-2">{role === "instructor" ? "Quiz & Assignment Builder" : "Quizzes & Assignments"}</h1>
          <p className="text-slate-300 mt-4">
            {role === "instructor" ? "Create quiz and assignment for students." : "Attempt quizzes and view assigned work."}
          </p>
          {message && <div className="mini-card text-green-300 mt-4">{message}</div>}
        </div>

        {role === "instructor" && (
          <div className="card mb-6">
            <h2 className="text-2xl font-bold mb-4">Create New Quiz / Assignment</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <input className="field" placeholder="Quiz title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input className="field" placeholder="No. of questions" value={questions} onChange={(e) => setQuestions(e.target.value)} />
              <input className="field" placeholder="Assignment task" value={assignment} onChange={(e) => setAssignment(e.target.value)} />
              <button className="btn-purple" onClick={saveQuiz}>Create</button>
            </div>
          </div>
        )}

        <div className="grid-fit">
          {quizzes.map((q) => (
            <div className="card" key={q.id}>
              <h2 className="text-2xl font-bold">{q.title}</h2>
              <p className="text-slate-400 mt-2">{q.questions} questions • {q.time}</p>
              {q.assignment && <p className="mini-card mt-4">Assignment: {q.assignment}</p>}
              <span className="badge mt-4">{q.status}</span>
              {q.score !== null ? <h3 className="text-4xl font-black mt-5">{q.score}%</h3> : role === "student" ? <button className="btn-purple mt-5" onClick={() => attemptQuiz(q.id)}>Attempt Quiz</button> : <p className="text-slate-400 mt-5">Visible to students</p>}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}