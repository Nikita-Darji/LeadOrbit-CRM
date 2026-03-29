function TablePagination({ page, pageSize, totalItems, totalPages, onPageChange }) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const end = totalItems === 0 ? 0 : Math.min(page * pageSize, totalItems)

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-slate-500">
        Showing {start}-{end} of {totalItems} leads
      </p>

      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onPageChange(page - 1)} className="ghost-button !px-3 !py-2" disabled={page <= 1}>
          Previous
        </button>
        <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
          Page {page} of {Math.max(totalPages, 1)}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          className="ghost-button !px-3 !py-2"
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default TablePagination
