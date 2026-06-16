"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import { demoQuizzes } from "../../lib/demoData";

export default function QuizPage() {
  const [role, setRole] = useState("student");
  const [quizzes, setQuizzes] = useState(demoQuizzes);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState("10");
  const [time, setTime] = useState("15 min");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedRole = localStorage.getItem("codesaathi_role") || "student";
    const customQuizzes = JSON.parse(localStorage.getItem("demo_quizzes") || "[]");

    setRole(savedRole);
    setQuizzes([...demoQuizzes, ...customQuizzes]);
  }, []);

  const createQuiz = () => {
    if (!title.trim()) {
      setMessage("Quiz title is required.");
      return;
    }

    const newQuiz = {
      id: `custom-${Date.now()}`,
      title,
      questions: Number(questions) || 10,
      time,
      score: null,
      status: "Pending",
      createdBy: "Instructor",
    };

    const existing = JSON.parse(localStorage.getItem("demo_quizzes") || "[]");
    const updatedCustom = [newQuiz, ...existing];

    localStorage.setItem("demo_quizzes", JSON.stringify(updatedCustom));
    setQuizzes([...demoQuizzes, ...updatedCustom]);

    setTitle("");
    setQuestions("10");
    setTime("15 min");
    setMessage("Assessment created successfully and is visible to students.");
  };

  const deleteQuiz = (quizId) => {
    const existing = JSON.parse(localStorage.getItem("demo_quizzes") || "[]");
    const updatedCustom = existing.filter((quiz) => quiz.id !== quizId);

    localStorage.setItem("demo_quizzes", JSON.stringify(updatedCustom));
    setQuizzes([...demoQuizzes, ...updatedCustom]);
    setMessage("Assessment deleted.");
  };

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">
            {role === "instructor" ? "Instructor Assessment Workflow" : "Quiz & Assignment Workflow"}
          </p>

          <h1 className="page-title mt-2">
            {role === "instructor" ? "Create Assessments" : "Assessment Center"}
          </h1>

          <p className="text-slate-300 mt-4">
            {role === "instructor"
              ? "Create quizzes and assessments for students."
              : "Attempt MCQ quizzes, timed tests and view auto-scored performance."}
          </p>

          {message && <div className="mini-card mt-5 text-green-300">{message}</div>}
        </div>

        {role === "instructor" && (
          <div className="card mb-6">
            <h2 className="text-2xl font-bold mb-4">Create New Assessment</h2>

            <div className="grid md:grid-cols-4 gap-4">
              <input
                className="field"
                placeholder="Quiz title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />

              <input
                className="field"
                placeholder="Questions"
                value={questions}
                onChange={(event) => setQuestions(event.target.value)}
              />

              <input
                className="field"
                placeholder="Time limit"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />

              <button onClick={createQuiz} className="btn-purple">
                Create Quiz
              </button>
            </div>
          </div>
        )}

        <div className="grid-fit">
          {quizzes.map((quiz) => (
            <div className="card" key={quiz.id}>
              <h2 className="text-2xl font-bold">{quiz.title}</h2>

              <p className="text-slate-400 mt-2">
                {quiz.questions} questions • {quiz.time}
              </p>

              <p className="mt-4">
                <span className="badge">{quiz.status}</span>
              </p>

              {quiz.score !== null ? (
                <h3 className="text-4xl font-black mt-5">{quiz.score}%</h3>
              ) : role === "instructor" ? (
                <button
                  className="btn-dark mt-5"
                  onClick={() => deleteQuiz(quiz.id)}
                >
                  Delete Assessment
                </button>
              ) : (
                <button className="btn-purple mt-5">Attempt Quiz</button>
              )}
            </div>
          ))}
        </div>

        {role !== "instructor" && (
          <div className="card mt-6">
            <h2 className="text-2xl font-bold">Sample Question</h2>

            <p className="text-slate-300 mt-4">
              Which extension is used for Python files?
            </p>

            <div className="grid sm:grid-cols-4 gap-3 mt-5">
              <button className="btn-dark">.java</button>
              <button className="btn-green">.py</button>
              <button className="btn-dark">.js</button>
              <button className="btn-dark">.cpp</button>
            </div>
          </div>
        )}
      </section>
    </AppShell>
  );
}