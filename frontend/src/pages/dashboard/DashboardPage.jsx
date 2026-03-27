import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../../components/AppShell'
import StatCard from '../../components/StatCard'
import StatusBadge from '../../components/StatusBadge'
import { leadSourceOptions } from '../../lib/leadOptions'
import { extractApiError } from '../../services/api'
import { formatCurrency, formatDate, getValueSafe } from '../../services/formatters'
import { listLeads } from '../../services/leadService'

const stageOrder = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']

function DashboardPage() {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

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

  const totalValue = leads.reduce((sum, lead) => sum + getValueSafe(lead.value), 0)
  const openLeads = leads.filter((lead) => !['won', 'lost'].includes(lead.status))
  const wonLeads = leads.filter((lead) => lead.status === 'won')
  const qualifiedLeads = leads.filter((lead) => ['qualified', 'proposal'].includes(lead.status))
  const overdueLeads = leads.filter((lead) => {
    if (!lead.expectedCloseDate || ['won', 'lost'].includes(lead.status)) {
      return false
    }

    return new Date(lead.expectedCloseDate) < new Date()
  })
  const averageDealValue = leads.length ? Math.round(totalValue / leads.length) : 0
  const recentLeads = leads.slice(0, 6)
  const upcomingLeads = [...openLeads]
    .filter((lead) => lead.expectedCloseDate)
    .sort((a, b) => new Date(a.expectedCloseDate) - new Date(b.expectedCloseDate))
    .slice(0, 5)
  const sourceBreakdown = leadSourceOptions
    .map((option) => ({
      ...option,
      count: leads.filter((lead) => lead.source === option.value).length,
    }))
    .filter((option) => option.count > 0)

  return (
    <AppShell
      title="Dashboard"
      actions={
        <Link className="ghost-button" to="/leads">
          View all leads
        </Link>
      }
    >
      <div className="space-y-4">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total leads"
            value={isLoading ? '...' : leads.length}
            detail="All records currently tracked in the CRM."
            accent="slate"
          />
          <StatCard
            label="Open pipeline"
            value={isLoading ? '...' : openLeads.length}
            detail="Leads still moving toward qualification or close."
            accent="blue"
          />
          <StatCard
            label="Pipeline value"
            value={isLoading ? '...' : formatCurrency(totalValue)}
            detail="Combined estimated value across all leads."
            accent="green"
          />
          <StatCard
            label="Overdue"
            value={isLoading ? '...' : overdueLeads.length}
            detail="Leads with close dates already in the past."
            accent="amber"
          />
        </section>

        {errorMessage ? <div className="panel-muted border-rose-200 bg-rose-50 text-rose-700">{errorMessage}</div> : null}

        <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="panel-surface">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="section-eyebrow">Pipeline</p>
                <h2 className="section-title">Stage distribution</h2>
              </div>
              <p className="text-xs text-slate-500">{qualifiedLeads.length} qualified or in proposal</p>
            </div>

            <div className="mt-5 space-y-4">
              {stageOrder.map((stage) => {
                const count = leads.filter((lead) => lead.status === stage).length
                const width = leads.length ? Math.max((count / leads.length) * 100, count ? 8 : 0) : 0

                return (
                  <div key={stage} className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="capitalize text-slate-700">{stage}</span>
                      <span>{count} leads</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100">
                      <div className="h-2.5 rounded-full bg-slate-900" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="panel-surface">
            <p className="section-eyebrow">Focus</p>
            <h2 className="section-title">This week</h2>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Wins</p>
                <p className="mt-2 text-2xl font-display font-semibold text-slate-900">{wonLeads.length}</p>
                <p className="mt-1 text-xs text-slate-500">Closed-won leads recorded in the workspace.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Average value</p>
                <p className="mt-2 text-2xl font-display font-semibold text-slate-900">{formatCurrency(averageDealValue)}</p>
                <p className="mt-1 text-xs text-slate-500">Average estimated deal size across all leads.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Sources</p>
                <div className="mt-3 space-y-2">
                  {sourceBreakdown.length ? (
                    sourceBreakdown.slice(0, 4).map((source) => (
                      <div key={source.value} className="flex items-center justify-between text-xs">
                        <span className="capitalize text-slate-600">{source.label}</span>
                        <span className="font-semibold text-slate-900">{source.count}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500">No source data yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="panel-surface overflow-hidden p-0">
            <div className="border-b border-slate-200 px-5 py-4">
              <p className="section-eyebrow">Recent records</p>
              <h2 className="section-title">Latest leads</h2>
            </div>

            {recentLeads.length ? (
              <div className="overflow-x-auto">
                <table className="data-table min-w-full">
                  <thead>
                    <tr>
                      <th>Lead</th>
                      <th>Status</th>
                      <th>Value</th>
                      <th>Created</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead) => (
                      <tr key={lead._id}>
                        <td>
                          <div>
                            <p className="font-semibold text-slate-900">{lead.title}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              {lead.companyName || 'Independent account'} {lead.contactName ? `• ${lead.contactName}` : ''}
                            </p>
                          </div>
                        </td>
                        <td>
                          <StatusBadge status={lead.status} />
                        </td>
                        <td className="font-semibold text-slate-900">{formatCurrency(lead.value)}</td>
                        <td className="text-xs text-slate-500">{formatDate(lead.createdAt)}</td>
                        <td>
                          <Link className="text-xs font-semibold text-slate-900 hover:text-slate-600" to={`/leads/${lead._id}/edit`}>
                            Open
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-5 py-8 text-sm text-slate-500">{isLoading ? 'Loading leads...' : 'No leads created yet.'}</div>
            )}
          </div>

          <div className="panel-surface">
            <p className="section-eyebrow">Upcoming</p>
            <h2 className="section-title">Close dates</h2>
            <div className="mt-5 space-y-3">
              {upcomingLeads.length ? (
                upcomingLeads.map((lead) => (
                  <div key={lead._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{lead.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{lead.companyName || 'Independent account'}</p>
                      </div>
                      <StatusBadge status={lead.status} />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                      <span className="text-slate-500">{formatDate(lead.expectedCloseDate)}</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(lead.value)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No upcoming close dates yet.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

export default DashboardPage
