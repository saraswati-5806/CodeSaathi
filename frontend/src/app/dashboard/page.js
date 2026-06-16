"use client";

import AppShell from "../../components/AppShell";
import ModuleCard from "../../components/ModuleCard";
import StatCard from "../../components/StatCard";
import { demoChallenges, demoCourses, demoQuizzes } from "../../lib/demoData";

export default function StudentDashboard() {
  const completed = demoCourses.filter((course) => course.completed).length;
  const avg = Math.round(
    demoCourses.reduce((total, course) => total + course.progress, 0) /
      demoCourses.length
  );

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">Student LMS Dashboard</p>
          <h1 className="page-title mt-2">Welcome, Aarav Sharma</h1>
          <p className="text-slate-300 mt-4 max-w-3xl">
            Continue your learning journey with courses, quizzes, coding
            practice, XP, streaks, AI assistance, and verified certificates.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <a className="btn-blue" href="/courses">
              Continue Learning
            </a>
            <a className="btn-purple" href="/learning-workspace">
              Open Workspace
            </a>
            <a className="btn-dark" href="/certificates">
              View Certificate
            </a>
          </div>
        </div>

        <div className="grid-fit mb-6">
          <StatCard
            title="Enrolled Courses"
            value={demoCourses.length}
            subtitle="Active learning paths"
          />
          <StatCard
            title="Completed Courses"
            value={completed}
            subtitle="Python course completed"
          />
          <StatCard
            title="Average Progress"
            value={`${avg}%`}
            subtitle="Across all courses"
          />
          <StatCard
            title="Total XP"
            value="1450"
            subtitle="Level 8 learner"
          />
          <StatCard
            title="Learning Streak"
            value="14 Days"
            subtitle="Consistency badge"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="card lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>

            {demoCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold">{course.title}</h3>
                    <p className="text-slate-400 mt-1">{course.description}</p>
                  </div>

                  <a href="/learning-workspace" className="btn-dark">
                    Open
                  </a>
                </div>

                <div className="progress mt-4">
                  <span style={{ width: `${course.progress}%` }} />
                </div>

                <p className="text-sm text-slate-400 mt-2">
                  {course.progress}% complete
                </p>
              </div>
            ))}
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Activity</h2>
            <p className="text-slate-300">
              Quizzes completed:{" "}
              {demoQuizzes.filter((quiz) => quiz.status === "Completed").length}
            </p>
            <p className="text-slate-300 mt-3">
              Coding accepted:{" "}
              {
                demoChallenges.filter(
                  (challenge) => challenge.status === "Accepted"
                ).length
              }
            </p>
            <p className="text-slate-300 mt-3">Certificate: Verified</p>
            <p className="text-green-300 mt-3">Level 8 Learner</p>
            <p className="text-blue-300 mt-3">1450 XP Earned</p>
            <p className="text-purple-300 mt-3">Certificate Verified</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">🔔 Notifications</h2>
            <div className="space-y-3">
              <div className="mini-card">New Quiz Available</div>
              <div className="mini-card">Certificate Earned</div>
              <div className="mini-card">Live Class Tomorrow</div>
              <div className="mini-card">AI Study Reminder</div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
            <p className="text-slate-300">
              Revise loops, then continue with functions and DSA arrays.
            </p>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Upcoming</h2>
            <p className="text-slate-300">DSA Arrays Practice Test</p>
            <p className="text-slate-400 mt-2">25 minutes • Pending</p>
          </div>
        </div>

        <div className="grid-fit">
          <ModuleCard
            title="Courses"
            href="/courses"
            description="Browse demo courses with thumbnails, modules, progress and enroll flow."
            action="Open Courses →"
          />

          <ModuleCard
            title="Learning Workspace"
            href="/learning-workspace"
            description="Watch video, read notes, AI summary, code and quiz from one screen."
            action="Start Learning →"
          />

          <ModuleCard
            title="Coding Lab"
            href="/coding"
            description="Solve practice problems and view demo test case results."
            action="Practice Code →"
          />

          <ModuleCard
            title="Quiz Center"
            href="/quiz"
            description="Attempt MCQ assessments and view score."
            action="Attempt Quiz →"
          />

          <ModuleCard
            title="Certificate"
            href="/certificates"
            description="Show completed Python course certificate."
            action="View Certificate →"
          />

          <ModuleCard
            title="Leaderboard"
            href="/leaderboard"
            description="View XP rank and badges."
            action="View Rank →"
          />
        </div>
      </section>
    </AppShell>
  );
}