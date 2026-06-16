import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <nav className="flex items-center justify-between gap-4 mb-16">
          <h1 className="text-3xl font-black text-purple-300">CodeSaathi</h1>
          <div className="flex gap-3">
            <Link href="/login" className="btn-dark">Login</Link>
            <Link href="/login" className="btn-purple">Register</Link>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-purple-300 font-bold">AI-Powered LMS & Coding Platform</p>
            <h2 className="hero-title mt-4">Learn, Code, Practice & Earn Certificates</h2>
            <p className="text-slate-300 mt-6 text-lg leading-8">
              CodeSaathi provides role-based learning for students and instructors with courses,
              quizzes, assignments, coding practice, AI assistant, leaderboard, progress tracking,
              and certificates.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/login" className="btn-blue">Get Started</Link>
              <Link href="/login" className="btn-dark">Login / Register</Link>
            </div>
          </div>

          <div className="card">
            <h3 className="text-2xl font-black">How CodeSaathi Works</h3>
            <ol className="space-y-4 text-slate-300 mt-6">
              <li>1. Register or login as Student / Instructor</li>
              <li>2. Student learns from courses and workspace</li>
              <li>3. Instructor creates courses, resources and assessments</li>
              <li>4. Student attempts quiz, coding and earns certificate</li>
              <li>5. AI assistant supports doubts, notes and code review</li>
            </ol>
          </div>
        </div>

        <div className="grid-fit mt-16">
          {["Role-Based Access", "Course Catalog", "AI Assistant", "Quiz & Assignment", "Coding Practice", "Certificates"].map((x) => (
            <div className="card" key={x}>
              <h3 className="text-xl font-bold">{x}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}