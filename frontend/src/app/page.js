import Link from "next/link";

export default function Home() {
  const features = [
    "Role-Based Login",
    "Course Enrollment",
    "Live Classes",
    "Coding Lab",
    "Quiz Assessment",
    "AI Study Workspace",
    "Vault + RAG",
    "XP Leaderboard",
    "Certificates",
  ];

  return (
    <main className="page">
      <section className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-purple-300 font-bold mb-4">
              AI-Powered LMS & Online Coding Platform
            </p>

            <h1 className="hero-title">
              Learn. Code. Practice. Track. Certify.
            </h1>

            <p className="text-slate-300 text-lg mt-6 leading-8">
              CodeSaathi is a full-stack LMS where students enroll in courses,
              attend live classes, solve coding challenges, attempt quizzes, use
              AI study tools, earn XP, and generate certificates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/dashboard" className="btn-primary">
                Start as Student
              </Link>
              <Link href="/instructor/dashboard" className="btn-purple">
                Instructor Panel
              </Link>
              <Link href="/courses" className="btn-dark">
                Browse Courses
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-3xl font-bold mb-5">Judge Demo Flow</h2>
            <ol className="space-y-4 text-slate-300 text-lg">
              <li>1. Open Student Dashboard and login.</li>
              <li>2. Browse courses and enroll.</li>
              <li>3. Submit coding challenge.</li>
              <li>4. Attempt quiz and view score.</li>
              <li>5. Generate AI summary, flashcards, and quiz.</li>
              <li>6. View leaderboard, XP, and certificates.</li>
              <li>7. Open Instructor Panel.</li>
            </ol>
          </div>
        </div>

        <div className="grid-auto mt-12">
          {features.map((feature) => (
            <div className="card" key={feature}>
              <h3 className="text-xl font-bold">{feature}</h3>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl p-8 text-center bg-gradient-to-r from-blue-600 to-purple-700">
          <h2 className="section-title">Submission Ready LMS Demo</h2>
          <p className="mt-3 text-blue-100">
            All major modules are connected through the navigation bar.
          </p>
        </div>
      </section>
    </main>
  );
}