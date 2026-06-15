import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="bg-slate-950 border-b border-slate-800 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-bold text-purple-300">
          CodeSaathi
        </Link>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/dashboard" className="hover:text-purple-300">Student</Link>
          <Link href="/instructor/dashboard" className="hover:text-purple-300">Instructor</Link>
          <Link href="/courses" className="hover:text-purple-300">Courses</Link>
          <Link href="/study-workspace" className="hover:text-purple-300">AI Workspace</Link>
          <Link href="/leaderboard" className="hover:text-purple-300">Leaderboard</Link>
          <Link href="/certificates" className="hover:text-purple-300">Certificates</Link>
        </div>
      </div>
    </nav>
  );
}