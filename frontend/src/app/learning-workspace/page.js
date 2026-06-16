"use client";

import { useState } from "react";
import AppShell from "../../components/AppShell";
import { demoCourses, demoFlashcards } from "../../lib/demoData";

export default function LearningWorkspacePage() {
  const course = demoCourses[0];
  const [tab, setTab] = useState("lesson");

  const tabs = [
    "lesson",
    "notes",
    "summary",
    "flashcards",
    "mindmap",
    "resources",
    "aichat",
    "code",
    "quiz",
  ];

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">Unified Learning Workspace</p>
          <h1 className="page-title mt-2">{course.title}</h1>
          <p className="text-slate-300 mt-4">
            One place for lecture video, notes, AI-generated summary,
            flashcards, mindmap, resources, AI chat, coding practice and quiz
            flow.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_.8fr] gap-6">
          <div className="card">
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={tab === item ? "btn-purple" : "btn-dark"}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>

            {tab === "lesson" && (
              <div>
                <div className="aspect-video rounded-3xl overflow-hidden border border-slate-800 bg-slate-950">
                  <iframe
                    className="w-full h-full"
                    src={course.videoUrl}
                    title="Demo Lecture"
                    allowFullScreen
                  />
                </div>

                <h2 className="text-2xl font-bold mt-6">Modules</h2>

                <div className="grid-fit mt-4">
                  {course.modules.map((module) => (
                    <div key={module} className="card">
                      <h3 className="font-bold">{module}</h3>
                      <p className="text-slate-400 mt-2">
                        Demo lesson completed.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "notes" && (
              <div>
                <h2 className="text-3xl font-bold mb-4">Demo Notes</h2>
                <textarea className="field min-h-80" value={course.notes} readOnly />
              </div>
            )}

            {tab === "summary" && (
              <div className="card">
                <h2 className="text-3xl font-bold mb-4">
                  AI Generated Summary
                </h2>
                <p className="text-slate-300 leading-8">{course.summary}</p>
              </div>
            )}

            {tab === "flashcards" && (
              <div className="grid-fit">
                {demoFlashcards.map((card) => (
                  <div className="card" key={card.q}>
                    <h3 className="text-xl font-bold">{card.q}</h3>
                    <p className="text-slate-400 mt-3">{card.a}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "mindmap" && (
              <div className="card">
                <h2 className="text-3xl font-bold mb-4">Learning Mindmap</h2>
                <pre className="text-green-300 text-lg overflow-auto">
{`Python
 ├ Variables
 ├ Data Types
 ├ Loops
 ├ Functions
 ├ OOP
 ├ File Handling
 └ Projects`}
                </pre>
              </div>
            )}

            {tab === "resources" && (
              <div className="card">
                <h2 className="text-3xl font-bold mb-4">Learning Resources</h2>

                <div className="space-y-4">
                  <div className="mini-card">Python Official Documentation</div>
                  <div className="mini-card">W3Schools Python Tutorials</div>
                  <div className="mini-card">Real Python Learning Platform</div>
                  <div className="mini-card">CodeSaathi Notes PDF</div>
                </div>
              </div>
            )}

            {tab === "aichat" && (
              <div className="card">
                <h2 className="text-3xl font-bold mb-4">🤖 AI Assistant</h2>

                <p className="text-slate-300 mb-5">
                  Use these beginner-friendly prompts to ask better questions.
                </p>

                <div className="space-y-4">
                  <div className="mini-card">Explain Python Loops</div>
                  <div className="mini-card">Generate Practice Quiz</div>
                  <div className="mini-card">Suggest Next Topic</div>
                  <div className="mini-card">Debug My Code</div>
                </div>

                <div className="card mt-5">
                  <p className="text-green-300">
                    Demo AI Answer: A loop repeats code. Use for loops when you
                    know the sequence and while loops when you depend on a
                    condition.
                  </p>
                </div>
              </div>
            )}

            {tab === "code" && (
              <div>
                <h2 className="text-3xl font-bold mb-4">Practice Code</h2>

                <textarea
                  className="field min-h-72 text-green-300"
                  defaultValue={'for i in range(3):\n    print("CodeSaathi")'}
                />

                <div className="card mt-4">
                  <p className="text-green-300">
                    Demo Result: Accepted | 2/2 test cases passed
                  </p>
                </div>
              </div>
            )}

            {tab === "quiz" && (
              <div className="card">
                <h2 className="text-3xl font-bold">Quick Quiz</h2>
                <p className="text-slate-300 mt-4">
                  Which keyword prints output in Python?
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mt-5">
                  <button className="btn-green">print</button>
                  <button className="btn-dark">echo</button>
                  <button className="btn-dark">display</button>
                  <button className="btn-dark">show</button>
                </div>
              </div>
            )}
          </div>

          <aside className="card">
            <h2 className="text-2xl font-bold">Course Progress</h2>

            <div className="progress mt-4">
              <span style={{ width: `${course.progress}%` }} />
            </div>

            <p className="text-slate-400 mt-2">{course.progress}% completed</p>

            <div className="card mt-5">
              <h3 className="font-bold">YouTube URL</h3>
              <p className="text-slate-400 break-all mt-2">{course.videoUrl}</p>
            </div>

            <div className="card mt-5">
              <h3 className="font-bold">Recommended Prompt</h3>
              <p className="text-slate-400 mt-2">
                Explain this topic in Hinglish with simple examples.
              </p>
            </div>

            <div className="card mt-5">
              <h3 className="font-bold">Next Step</h3>
              <p className="text-slate-400 mt-2">
                Open certificate center after completion.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}