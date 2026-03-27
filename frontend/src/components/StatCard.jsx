function StatCard({ label, value, detail, accent = 'slate' }) {
  const accentClasses = {
    slate: 'bg-slate-900',
    blue: 'bg-blue-600',
    green: 'bg-emerald-600',
    amber: 'bg-amber-500',
  }

  return (
    <div className="rounded-[1.1rem] border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
      <div className={`h-1.5 w-10 rounded-full ${accentClasses[accent] || accentClasses.slate}`} />
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-xs leading-6 text-slate-500">{detail}</p>
    </div>
  )
}

export default StatCard
