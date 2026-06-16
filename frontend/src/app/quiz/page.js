"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function QuizPage() {
  const [role, setRole] = useState("student");
  const [token, setToken] = useState("");
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [title, setTitle] = useState("Python Basics Quiz");
  const [description, setDescription] = useState("Assessment for Python fundamentals");
  const [questionText, setQuestionText] = useState("Which keyword is used to print output in Python?");
  const [options, setOptions] = useState("print, echo, display, show");
  const [correctOptionIndex, setCorrectOptionIndex] = useState("0");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedRole = localStorage.getItem("codesaathi_role") || "student";
    const savedToken = localStorage.getItem("codesaathi_token") || "";

    setRole(savedRole);
    setToken(savedToken);
    loadCourses(savedToken);
  }, []);

  const authHeaders = (savedToken = token) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${savedToken}`,
  });

  const loadCourses = async (savedToken) => {
    try {
      const res = await fetch(`${API_URL}/api/courses`);
      const data = await res.json();

      const list = data.courses || [];
      setCourses(list);

      if (list.length > 0) {
        setSelectedCourse(list[0]._id);
        loadQuizzes(list, savedToken);
      }
    } catch {
      setMessage("Courses could not be loaded from backend.");
    }
  };

  const loadQuizzes = async (courseList = courses, savedToken = token) => {
    try {
      let allQuizzes = [];

      for (const course of courseList) {
        const res = await fetch(`${API_URL}/api/quiz/course/${course._id}`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        const data = await res.json();

        if (data.success && Array.isArray(data.quizzes)) {
          allQuizzes = [...allQuizzes, ...data.quizzes];
        }
      }

      setQuizzes(allQuizzes);
    } catch {
      setMessage("Quizzes could not be loaded.");
    }
  };

  const createQuiz = async () => {
    if (!selectedCourse) {
      setMessage("Create/select a course first before creating quiz.");
      return;
    }

    try {
      const optionList = options.split(",").map((item) => item.trim());

      const res = await fetch(`${API_URL}/api/quiz`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          title,
          description,
          course: selectedCourse,
          timeLimitMinutes: 15,
          passingScore: 50,
          isPublished: true,
          questions: [
            {
              questionText,
              options: optionList,
              correctOptionIndex: Number(correctOptionIndex),
              explanation: "This is the correct answer.",
              marks: 1,
            },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Quiz creation failed");
      }

      setMessage("Quiz created in MongoDB and is visible to students.");
      loadQuizzes(courses, token);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const openQuiz = async (quizId) => {
    try {
      const res = await fetch(`${API_URL}/api/quiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Quiz not found");
      }

      setActiveQuiz(data.quiz);
      setAnswers([]);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const submitQuiz = async () => {
    try {
      const formattedAnswers = activeQuiz.questions.map((_, index) => ({
        questionIndex: index,
        selectedOptionIndex: Number(answers[index] ?? 0),
      }));

      const res = await fetch(`${API_URL}/api/quiz/${activeQuiz._id}/attempt`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          answers: formattedAnswers,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Quiz attempt failed");
      }

      setMessage(`Quiz submitted. Score: ${data.result.score}% (${data.result.status})`);
      setActiveQuiz(null);
      loadQuizzes(courses, token);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">
            {role === "instructor" ? "Instructor Assessment Workflow" : "Student Assessment Center"}
          </p>
          <h1 className="page-title mt-2">
            {role === "instructor" ? "Create Quiz Assessment" : "Attempt Quizzes"}
          </h1>
          <p className="text-slate-300 mt-4">
            Quizzes are stored in MongoDB through the backend API.
          </p>
          {message && <div className="mini-card mt-4 text-green-300">{message}</div>}
        </div>

        {role === "instructor" && (
          <div className="card mb-6">
            <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <select
                className="field"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>

              <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} />

              <input
                className="field"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                className="field"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />

              <input
                className="field"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                placeholder="Option1, Option2, Option3, Option4"
              />

              <input
                className="field"
                value={correctOptionIndex}
                onChange={(e) => setCorrectOptionIndex(e.target.value)}
                placeholder="Correct option index: 0"
              />
            </div>

            <button className="btn-purple mt-5" onClick={createQuiz}>
              Create Quiz in MongoDB
            </button>
          </div>
        )}

        {activeQuiz && role === "student" && (
          <div className="card mb-6">
            <h2 className="text-3xl font-bold">{activeQuiz.title}</h2>

            <div className="space-y-5 mt-6">
              {activeQuiz.questions.map((q, index) => (
                <div className="mini-card" key={q._id || index}>
                  <h3 className="font-bold">
                    {index + 1}. {q.questionText}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    {q.options.map((option, optionIndex) => (
                      <button
                        key={option}
                        className={
                          Number(answers[index]) === optionIndex ? "btn-green" : "btn-dark"
                        }
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [index]: optionIndex }))
                        }
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-blue mt-6" onClick={submitQuiz}>
              Submit Quiz
            </button>
          </div>
        )}

        <div className="grid-fit">
          {quizzes.length === 0 && (
            <div className="card">
              No quizzes found. Instructor should create one first.
            </div>
          )}

          {quizzes.map((quiz) => (
            <div className="card" key={quiz._id}>
              <h2 className="text-2xl font-bold">{quiz.title}</h2>
              <p className="text-slate-400 mt-2">
                {quiz.questions?.length || 0} questions • {quiz.timeLimitMinutes || 15} min
              </p>
              <p className="text-slate-400 mt-3">{quiz.description}</p>

              {role === "student" ? (
                <button className="btn-purple mt-5" onClick={() => openQuiz(quiz._id)}>
                  Attempt Quiz
                </button>
              ) : (
                <p className="text-green-300 mt-5">Published and visible to students</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}