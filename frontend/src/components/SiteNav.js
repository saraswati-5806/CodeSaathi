import Link from "next/link";
import { translations } from "../lib/demoData";

export default function SiteNav() {
  const lang = typeof window !== "undefined" ? localStorage.getItem("codesaathi_lang") || "en" : "en";
  const t = translations[lang] || translations.en;
  const links = [[t.dashboard,"/dashboard"],[t.courses,"/courses"],[t.workspace,"/learning-workspace"],[t.coding,"/coding"],[t.quiz,"/quiz"],[t.leaderboard,"/leaderboard"],[t.certificates,"/certificates"]];
  return <nav className="mobile-nav"><Link href="/" className="text-3xl font-black text-purple-300">CodeSaathi</Link><div className="mobile-links">{links.map(([l,h])=><Link key={h} href={h}>{l}</Link>)}</div></nav>;
}
