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
    <nav className="mobile-nav">
      <Link href="/" className="text-3xl font-black text-purple-300">
        CodeSaathi
      </Link>

      <div className="mobile-links">
        {links.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}