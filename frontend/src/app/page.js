import Link from "next/link";

export default function Home() {
  const features = [
    "Role-Based Authentication",
    "Student & Instructor Dashboards",
    "Course Enrollment",
    "Live Classes",
    "Coding Lab",
    "Quiz Assessment",
    "AI Study Workspace",
    "Vault + RAG Assistant",
    "XP + Leaderboard",
    "Certificate Center",
    "Progress Analytics",
    "Responsive UI",
  ];

  const steps = [
    "Student logs in and opens dashboard",
    "Student enrolls in a course",
    "Student solves coding challenges",
    "Student attempts quiz assessment",
    "Student uses AI Study Workspace",
    "Student earns XP and certificate",
  ];

  return (
    <main className="app-bg min-h-screen">
      <section className="max-w-7xl mx-auto px-5 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-12">
          <Link href="/" className="text-4xl font-black text-purple-300">
            CodeSaathi
          </Link>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="btn-dark">Student</Link>
            <Link href="/instructor/dashboard" className="btn-dark">Instructor</Link>
            <Link href="/courses" className="btn-dark">Courses</Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-purple-300 font-bold mb-4">
              AI-Powered LMS & Online Coding Platform
            </p>

            <h1 className="hero-title">
              Learn. Code. Practice. Track. Certify.
            </h1>

            <p className="text-slate-300 text-lg mt-6 leading-8">
              CodeSaathi is a full-stack learning platform built with
              Next.js, Node.js, Express.js, and MongoDB. It helps students
              learn through courses, coding challenges, quizzes, AI tools,
              progress tracking, XP, and certificates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/dashboard" className="btn-blue">
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
            <h2 className="text-3xl font-black">Judge Demo Flow</h2>
            <div className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-4 items-start">
                  <span className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <p className="text-slate-300 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="page-title mb-6">Platform Features</h2>
          <div className="grid-fit">
            {features.map((feature) => (
              <div key={feature} className="card">
                <h3 className="text-xl font-bold">{feature}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid lg:grid-cols-3 gap-5">
          <div className="card">
            <h3 className="text-2xl font-bold">Frontend</h3>
            <p className="text-slate-400 mt-3">Next.js, React.js, Tailwind CSS</p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold">Backend</h3>
            <p className="text-slate-400 mt-3">Node.js, Express.js, REST APIs</p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold">Database</h3>
            <p className="text-slate-400 mt-3">MongoDB Atlas with Mongoose</p>
          </div>
        </section>

        <section className="mt-16 rounded-3xl p-8 lg:p-12 text-center bg-gradient-to-r from-blue-600 to-purple-700">
          <h2 className="page-title">Ready for Submission Demo</h2>
          <p className="mt-4 text-blue-100">
            A connected LMS flow with student learning, instructor management,
            coding, quizzes, AI study tools, XP, and certificates.
          </p>
        </section>
      </section>
    </main>
  );
}