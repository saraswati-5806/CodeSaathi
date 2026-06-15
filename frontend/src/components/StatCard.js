export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="card">
      <p className="text-slate-400 text-sm">{title}</p>
      <h2 className="text-4xl font-black mt-2">{value}</h2>
      <p className="text-slate-400 mt-2">{subtitle}</p>
    </div>
  );
}