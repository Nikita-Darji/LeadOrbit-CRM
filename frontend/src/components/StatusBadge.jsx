const statusClasses = {
  new: 'border-slate-200 bg-slate-100 text-slate-700',
  contacted: 'border-blue-200 bg-blue-50 text-blue-700',
  qualified: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  proposal: 'border-amber-200 bg-amber-50 text-amber-700',
  won: 'border-emerald-200 bg-emerald-100 text-emerald-800',
  lost: 'border-rose-200 bg-rose-50 text-rose-700',
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${
        statusClasses[status] || 'border-slate-200 bg-slate-100 text-slate-700'
      }`}
    >
      {status?.replace('_', ' ')}
    </span>
  )
}

export default StatusBadge
