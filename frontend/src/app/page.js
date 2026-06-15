import Link from "next/link";

export default function Home() {
  const features = [
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
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-purple-300 font-semibold">
              AI-Powered LMS & Online Coding Platform
            </p>

            <h1 className="text-5xl font-bold mt-4 leading-tight">
              Learn, Code, Practice, Track Progress & Earn Certificates
            </h1>

            <p className="text-slate-300 mt-5 text-lg">
              CodeSaathi is a full-stack EdTech platform where students enroll in
              courses, attend live classes, solve coding problems, attempt quizzes,
              use AI study tools, earn XP, and receive certificates.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/dashboard" className="bg-blue-600 px-6 py-3 rounded-xl font-semibold">
                Start as Student
              </Link>

              <Link href="/instructor/dashboard" className="bg-purple-600 px-6 py-3 rounded-xl font-semibold">
                Instructor Panel
              </Link>

              <Link href="/courses" className="bg-slate-800 px-6 py-3 rounded-xl font-semibold">
                Browse Courses
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">Judge Demo Flow</h2>
            <ol className="space-y-4 text-slate-300">
              <li>1. Open Student Dashboard and login.</li>
              <li>2. Browse courses and enroll.</li>
              <li>3. Try coding challenge submission.</li>
              <li>4. Attempt quiz and view score.</li>
              <li>5. Use AI Study Workspace tools.</li>
              <li>6. Check leaderboard, XP, and certificates.</li>
              <li>7. Open Instructor Panel to create courses/challenges.</li>
            </ol>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-16">
          {features.map((feature) => (
            <div key={feature} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="font-bold text-lg">{feature}</h3>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold">Ready for the Demo?</h2>
          <p className="mt-3 text-blue-100">
            Use the navigation bar above to explore every module.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-6 text-center text-slate-400">
        CodeSaathi | Week 4 Web Development Task | Sqrock IT Solutions
      </footer>
    </main>
  );
}