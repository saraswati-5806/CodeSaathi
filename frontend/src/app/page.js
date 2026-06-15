import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <section className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-purple-300 font-semibold">
              Week 4 Web Development Task
            </p>

            <h1 className="text-5xl font-bold mt-4 leading-tight">
              CodeSaathi: AI-Powered LMS & Online Coding Platform
            </h1>

            <p className="text-slate-300 mt-5 text-lg">
              A full-stack learning platform where students can enroll in
              courses, attend live classes, solve coding challenges, attempt
              quizzes, use AI study tools, track progress, earn XP, and receive
              certificates.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/dashboard" className="bg-blue-600 px-6 py-3 rounded-xl font-semibold">
                Start as Student
              </Link>

              <Link href="/instructor/dashboard" className="bg-purple-600 px-6 py-3 rounded-xl font-semibold">
                Open Instructor Panel
              </Link>

              <Link href="/courses" className="bg-slate-800 px-6 py-3 rounded-xl font-semibold">
                Browse Courses
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">Demo Flow for Judges</h2>

            <ol className="space-y-4 text-slate-300">
              <li>1. Open Student Dashboard and login as demo student.</li>
              <li>2. Browse courses and enroll.</li>
              <li>3. Open AI Study Workspace and generate summary, flashcards, notes, and quiz.</li>
              <li>4. View XP leaderboard and notifications.</li>
              <li>5. Open Certificate Center and issue/view certificate.</li>
              <li>6. Open Instructor Panel to create courses and coding challenges.</li>
            </ol>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {[
            "JWT Authentication",
            "Role-Based Access",
            "Course Enrollment",
            "Live Classes",
            "Coding Challenges",
            "Quiz System",
            "AI Study Workspace",
            "Vault + RAG",
            "XP + Leaderboard",
            "Certificates",
            "Progress Tracking",
            "Responsive UI",
          ].map((feature) => (
            <div key={feature} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="font-bold text-lg">{feature}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}