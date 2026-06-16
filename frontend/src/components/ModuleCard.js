import Link from "next/link";
export default function ModuleCard({ title, description, href, action }) {return <Link href={href} className="card block hover:border-purple-500"><h2 className="text-2xl font-bold">{title}</h2><p className="text-slate-400 mt-3 leading-7">{description}</p><p className="text-purple-300 font-bold mt-5">{action}</p></Link>}
