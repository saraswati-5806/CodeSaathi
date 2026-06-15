import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="bg-slate-950 border-b border-slate-800 text-white px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-bold text-purple-300">
          CodeSaathi
        </Link>

        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/dashboard">Student</Link>
          <Link href="/instructor/dashboard">Instructor</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/coding">Coding</Link>
          <Link href="/quiz">Quiz</Link>
          <Link href="/study-workspace">AI Workspace</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/certificates">Certificates</Link>
        </div>
      </div>
    </nav>
  );
}