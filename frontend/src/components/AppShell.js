import Link from "next/link";

export default function AppShell({ children, role = "Student" }) {
  const links = [
    ["Dashboard", "/dashboard"],
    ["Courses", "/courses"],
    ["Learning Workspace", "/learning-workspace"],
    ["Coding Lab", "/coding"],
    ["Quiz Center", "/quiz"],
    ["AI Workspace", "/study-workspace"],
    ["Leaderboard", "/leaderboard"],
    ["Certificates", "/certificates"],
    ["Instructor Panel", "/instructor/dashboard"],
  ];

  return (
    <div className="app-bg shell">
      <aside className="sidebar">
        <Link href="/" className="block text-3xl font-black text-purple-300 mb-2">
          CodeSaathi
        </Link>
        <p className="text-slate-400 text-sm mb-8">AI LMS + Coding Platform</p>

        <div className="space-y-3">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="block px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-200 font-semibold hover:bg-purple-700">
              {label}
            </Link>
          ))}
        </div>

        <div className="card mt-8">
          <p className="text-sm text-slate-400">Demo Credentials</p>
          <p className="text-sm mt-3 font-bold">{role}</p>
          <p className="text-xs mt-2 text-slate-300">student@codesaathi.com</p>
          <p className="text-xs text-slate-300">Student@123</p>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}
