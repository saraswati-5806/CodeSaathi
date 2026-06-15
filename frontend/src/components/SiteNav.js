import Link from "next/link";

export default function SiteNav() {
  const links = [
    ["Student", "/dashboard"],
    ["Courses", "/courses"],
    ["Workspace", "/learning-workspace"],
    ["Coding", "/coding"],
    ["Quiz", "/quiz"],
    ["AI", "/study-workspace"],
    ["Leaderboard", "/leaderboard"],
    ["Certificates", "/certificates"],
    ["Instructor", "/instructor/dashboard"],
  ];

  return (
    <nav className="mobile-nav">
      <Link href="/" className="text-3xl font-black text-purple-300">
        CodeSaathi
      </Link>
      <div className="mobile-links hide-scroll">
        {links.map(([label, href]) => (
          <Link key={href} href={href}>{label}</Link>
        ))}
      </div>
    </nav>
  );
}
