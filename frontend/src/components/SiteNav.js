import Link from "next/link";

export default function SiteNav() {
  const links = [
    ["Student", "/dashboard"],
    ["Instructor", "/instructor/dashboard"],
    ["Courses", "/courses"],
    ["Coding", "/coding"],
    ["Quiz", "/quiz"],
    ["AI Workspace", "/study-workspace"],
    ["Leaderboard", "/leaderboard"],
    ["Certificates", "/certificates"],
  ];

  return (
    <nav className="bg-slate-950/95 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <Link href="/" className="text-3xl font-black text-purple-300">
          CodeSaathi
        </Link>

        <div className="flex flex-wrap gap-2">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold hover:bg-purple-700"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}