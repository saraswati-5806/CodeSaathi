"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { translations } from "../lib/demoData";

export default function AppShell({ children }) {
  const [role, setRole] = useState("guest");
  const [lang, setLang] = useState("en");
  useEffect(()=>{setRole(localStorage.getItem("codesaathi_role")||"guest");setLang(localStorage.getItem("codesaathi_lang")||"en")},[]);
  const saveLang=(v)=>{setLang(v);localStorage.setItem("codesaathi_lang",v);window.dispatchEvent(new Event("storage"));};
  const logout=()=>{localStorage.removeItem("codesaathi_role");localStorage.removeItem("codesaathi_token");setRole("guest");window.location.href="/";};
  const t=translations[lang]||translations.en;
  const links=[[t.dashboard,"/dashboard"],[t.courses,"/courses"],[t.workspace,"/learning-workspace"],[t.coding,"/coding"],[t.quiz,"/quiz"],[t.leaderboard,"/leaderboard"],[t.certificates,"/certificates"],[t.instructor,"/instructor/dashboard"]];
  return <div className="app-bg shell"><aside className="sidebar"><Link href="/" className="block text-3xl font-black text-purple-300 mb-6">CodeSaathi</Link><div className="card mb-5"><p className="text-slate-400 text-sm">Active Role</p><h3 className="text-xl font-bold capitalize mt-1">{role}</h3><select className="field mt-4" value={lang} onChange={e=>saveLang(e.target.value)}><option value="en">English</option><option value="hi">Hindi</option><option value="mr">Marathi</option><option value="od">Odia</option></select>{role!=="guest"&&<button onClick={logout} className="btn-dark mt-4 w-full">Logout</button>}</div><div className="space-y-3">{links.map(([label,href])=><Link key={href} href={href} className="block px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold hover:bg-purple-700">{label}</Link>)}</div></aside><main className="main-content">{children}</main></div>;
}
