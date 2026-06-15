"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function QuizPage() {
  const [token, setToken] = useState("");
  const [courseId, setCourseId] = useState("");
  const [quizId, setQuizId] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [output, setOutput] = useState(null);

  const login = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@codesaathi.com", password: "Student@123" }),
    });

    const data = await res.json();
    setToken(data.token);
    setOutput(data);
  };

  const loadCoursesAndQuiz = async () => {
    const courseRes = await fetch(`${API_URL}/api/courses`);
    const courseData = await courseRes.json();
    const firstCourseId = courseData.courses?.[0]?._id;

    setCourseId(firstCourseId);

    const quizRes = await fetch(`${API_URL}/api/quiz/course/${firstCourseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const quizData = await quizRes.json();
    setQuizzes(quizData.quizzes || []);
    if (quizData.quizzes?.[0]?._id) setQuizId(quizData.quizzes[0]._id);
    setOutput(quizData);
  };

  const attemptQuiz = async () => {
    const res = await fetch(`${API_URL}/api/quiz/${quizId}/attempt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        answers: [
          { questionIndex: 0, selectedOptionIndex: 0 },
          { questionIndex: 1, selectedOptionIndex: 1 },
        ],
      }),
    });

    setOutput(await res.json());
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">Quiz & Assessment Center</h1>
        <p className="text-slate-300 mt-3">
          Attempt course quizzes and view auto-scored results.
        </p>

        <div className="flex flex-wrap gap-4 mt-6">
          <button onClick={login} className="bg-blue-600 px-5 py-3 rounded-xl font-semibold">
            Login Student
          </button>
          <button onClick={loadCoursesAndQuiz} disabled={!token} className="bg-purple-600 px-5 py-3 rounded-xl font-semibold">
            Load Quizzes
          </button>
          <button onClick={attemptQuiz} disabled={!quizId} className="bg-green-600 px-5 py-3 rounded-xl font-semibold">
            Attempt Demo Quiz
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-xl font-bold">{quiz.title}</h2>
              <p className="text-slate-400 mt-2">{quiz.description}</p>
              <p className="text-purple-300 mt-3">Time: {quiz.timeLimitMinutes} minutes</p>
            </div>
          ))}
        </div>

        <pre className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 overflow-auto text-green-300 text-sm">
          {output ? JSON.stringify(output, null, 2) : "Quiz output will appear here."}
        </pre>
      </section>
    </main>
  );
}