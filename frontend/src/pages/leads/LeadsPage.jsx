import { useDeferredValue, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../../components/AppShell'
import StatusBadge from '../../components/StatusBadge'
import TablePagination from '../../components/TablePagination'
import { leadSourceOptions, leadStatusOptions } from '../../lib/leadOptions'
import { extractApiError } from '../../services/api'
import { formatCurrency, formatDate, getValueSafe } from '../../services/formatters'
import { listLeads } from '../../services/leadService'

const pageSize = 20

function LeadsPage() {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [page, setPage] = useState(1)
  const deferredSearch = useDeferredValue(searchTerm)

  useEffect(() => {
    let active = true

    async function loadLeads() {
      try {
        setErrorMessage('')
        const data = await listLeads()
        if (active) {
          setLeads(data)
        }
      } catch (error) {
        if (active) {
          setErrorMessage(extractApiError(error))
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    loadLeads()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    setPage(1)
  }, [deferredSearch, sourceFilter, sortBy, statusFilter])

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter
    const haystack = [lead.title, lead.contactName, lead.companyName, lead.email, lead.source]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    const matchesSearch = haystack.includes(deferredSearch.trim().toLowerCase())

    return matchesStatus && matchesSource && matchesSearch
  })

  const sortedLeads = [...filteredLeads].sort((left, right) => {
    if (sortBy === 'oldest') {
      return new Date(left.createdAt) - new Date(right.createdAt)
    }

    if (sortBy === 'highest_value') {
      return getValueSafe(right.value) - getValueSafe(left.value)
    }

    if (sortBy === 'close_date') {
      return new Date(left.expectedCloseDate || '9999-12-31') - new Date(right.expectedCloseDate || '9999-12-31')
    }

    return new Date(right.createdAt) - new Date(left.createdAt)
  })

  const totalPages = Math.max(1, Math.ceil(sortedLeads.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paginatedLeads = sortedLeads.slice((safePage - 1) * pageSize, safePage * pageSize)
  const openCount = filteredLeads.filter((lead) => !['won', 'lost'].includes(lead.status)).length
  const qualifiedCount = filteredLeads.filter((lead) => ['qualified', 'proposal'].includes(lead.status)).length
  const filteredValue = filteredLeads.reduce((sum, lead) => sum + getValueSafe(lead.value), 0)

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage)
    }
  }, [page, safePage])

  return (
    <AppShell
      title="Leads"
      actions={
        <Link className="ghost-button" to="/dashboard">
          Dashboard
        </Link>
      }
    >
      <div className="space-y-4">
        <section className="grid gap-4 md:grid-cols-3">
          <div className="panel-surface">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Visible leads</p>
            <p className="mt-2 font-display text-3xl font-semibold text-slate-900">{filteredLeads.length}</p>
            <p className="mt-1 text-xs text-slate-500">Records after applying filters and search.</p>
          </div>
          <div className="panel-surface">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Open pipeline</p>
            <p className="mt-2 font-display text-3xl font-semibold text-slate-900">{openCount}</p>
            <p className="mt-1 text-xs text-slate-500">Leads still actively moving toward close.</p>
          </div>
          <div className="panel-surface">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Qualified value</p>
            <p className="mt-2 font-display text-3xl font-semibold text-slate-900">{formatCurrency(filteredValue)}</p>
            <p className="mt-1 text-xs text-slate-500">{qualifiedCount} leads are qualified or in proposal.</p>
          </div>
        </section>

        <section className="panel-surface">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_repeat(3,_0.6fr)_auto]">
            <label className="space-y-2">
              <span className="field-label">Search</span>
              <input
                className="field-input"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search title, contact, company, email, or source"
                value={searchTerm}
              />
            </label>

            <label className="space-y-2">
              <span className="field-label">Status</span>
              <select className="field-input" onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}>
                <option value="all">All statuses</option>
                {leadStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="field-label">Source</span>
              <select className="field-input" onChange={(event) => setSourceFilter(event.target.value)} value={sourceFilter}>
                <option value="all">All sources</option>
                {leadSourceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="field-label">Sort</span>
              <select className="field-input" onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="highest_value">Highest value</option>
                <option value="close_date">Nearest close date</option>
              </select>
            </label>

            <div className="flex items-end">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                Page size <span className="font-semibold text-slate-900">{pageSize}</span>
              </div>
            </div>
          </div>
        </section>

        {errorMessage ? <div className="panel-muted border-rose-200 bg-rose-50 text-rose-700">{errorMessage}</div> : null}

        <section className="panel-surface overflow-hidden p-0">
          {paginatedLeads.length ? (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="data-table min-w-full">
                  <thead>
                    <tr>
                      <th>Lead</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Source</th>
                      <th>Value</th>
                      <th>Close date</th>
                      <th>Owner</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLeads.map((lead) => (
                      <tr key={lead._id}>
                        <td>
                          <div className="min-w-[220px]">
                            <p className="text-sm font-semibold text-slate-900">{lead.title}</p>
                            <p className="mt-1 text-xs text-slate-500">{lead.contactName || 'No contact name'}</p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{lead.companyName || 'Independent account'}</p>
                            <p className="mt-1 text-xs text-slate-500">{lead.email || 'No email'}</p>
                          </div>
                        </td>
                        <td>
                          <StatusBadge status={lead.status} />
                        </td>
                        <td className="text-xs capitalize text-slate-600">{lead.source?.replace('_', ' ')}</td>
                        <td className="text-sm font-semibold text-slate-900">{formatCurrency(lead.value)}</td>
                        <td className="text-xs text-slate-500">
                          {lead.expectedCloseDate ? formatDate(lead.expectedCloseDate) : 'Not scheduled'}
                        </td>
                        <td className="text-xs text-slate-500">{lead.owner?.name || 'Unassigned'}</td>
                        <td>
                          <Link className="text-xs font-semibold text-slate-900 hover:text-slate-600" to={`/leads/${lead._id}/edit`}>
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-3 p-4 md:hidden">
                {paginatedLeads.map((lead) => (
                  <article key={lead._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{lead.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{lead.companyName || 'Independent account'}</p>
                      </div>
                      <StatusBadge status={lead.status} />
                    </div>

                    <div className="mt-4 grid gap-2 text-xs text-slate-500">
                      <div className="flex items-center justify-between gap-3">
                        <span>Source</span>
                        <span className="capitalize text-slate-700">{lead.source?.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Value</span>
                        <span className="font-semibold text-slate-900">{formatCurrency(lead.value)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Close</span>
                        <span className="text-slate-700">
                          {lead.expectedCloseDate ? formatDate(lead.expectedCloseDate) : 'Not scheduled'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Link className="text-xs font-semibold text-slate-900 hover:text-slate-600" to={`/leads/${lead._id}/edit`}>
                        Edit lead
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <TablePagination
                page={safePage}
                pageSize={pageSize}
                totalItems={sortedLeads.length}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          ) : (
            <div className="px-5 py-10 text-center">
              <p className="font-display text-2xl font-semibold text-slate-900">
                {isLoading ? 'Loading leads...' : 'No leads matched your filters'}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {isLoading
                  ? 'Fetching the latest pipeline data.'
                  : 'Try changing the filters or create a new lead to populate the list.'}
              </p>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  )
}

export default LeadsPage
