import Link from "next/link";

export default function Home() {
  const features = [
    ["Role-Based LMS", "Separate student and instructor experience."],
    ["Courses + Lectures", "Enroll, continue learning, and open workspace."],
    ["Coding Lab", "Practice coding tasks and submit solutions."],
    ["Quiz Assessment", "Attempt MCQ assessments with auto scoring."],
    ["AI Study Tools", "Summary, flashcards, notes, and quiz generation."],
    ["Progress + Certificates", "Track learning and generate certificates."],
  ];

  return (
    <main className="app-bg min-h-screen">
      <section className="container px-5 py-8 lg:py-12">
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-12">
          <Link href="/" className="text-4xl font-black text-purple-300">CodeSaathi</Link>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="btn-dark">Student</Link>
            <Link href="/courses" className="btn-dark">Courses</Link>
            <Link href="/learning-workspace" className="btn-dark">Workspace</Link>
            <Link href="/instructor/dashboard" className="btn-dark">Instructor</Link>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-center">
          <div>
            <p className="kicker mb-4">AI-Powered LMS & Online Coding Platform</p>
            <h1 className="hero-title">Learn. Code. Practice. Certify.</h1>
            <p className="text-slate-300 text-lg mt-6 leading-8 max-w-2xl">
              CodeSaathi is a full-stack EdTech platform using Next.js, Node.js,
              Express.js, and MongoDB where students learn from courses, practice
              coding, attempt quizzes, use AI tools, track XP, and earn certificates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/dashboard" className="btn-blue">Start Student Demo</Link>
              <Link href="/learning-workspace" className="btn-purple">Open Learning Workspace</Link>
              <Link href="/courses" className="btn-dark">Browse Courses</Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-3xl font-black">Judge Demo Flow</h2>
            {[
              "Login as student",
              "Load courses and enroll",
              "Open unified learning workspace",
              "Generate AI revision tools",
              "Practice coding and quiz",
              "Show leaderboard and certificate",
            ].map((step, index) => (
              <div key={step} className="flex gap-4 mt-5 items-start">
                <span className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center font-black">{index + 1}</span>
                <p className="text-slate-300 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-14 grid-fit">
          {features.map(([title, desc]) => (
            <div key={title} className="card">
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="text-slate-400 mt-3 leading-7">{desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-14 grid lg:grid-cols-3 gap-5">
          <div className="card"><h3 className="text-2xl font-bold">Frontend</h3><p className="text-slate-400 mt-3">Next.js, React.js, Tailwind CSS</p></div>
          <div className="card"><h3 className="text-2xl font-bold">Backend</h3><p className="text-slate-400 mt-3">Node.js, Express.js REST APIs</p></div>
          <div className="card"><h3 className="text-2xl font-bold">Database</h3><p className="text-slate-400 mt-3">MongoDB Atlas with Mongoose</p></div>
        </section>
      </section>
    </main>
  );
}
