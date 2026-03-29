import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppShell from '../../components/AppShell'
import LeadForm from '../../components/LeadForm'
import StatusBadge from '../../components/StatusBadge'
import { extractApiError } from '../../services/api'
import { formatCurrency, formatDate } from '../../services/formatters'
import { deleteLead, getLeadById, updateLead } from '../../services/leadService'

function EditLeadPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [lead, setLead] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [pageError, setPageError] = useState('')
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    let active = true

    async function loadLead() {
      try {
        setPageError('')
        const data = await getLeadById(id)
        if (active) {
          setLead(data)
        }
      } catch (error) {
        if (active) {
          setPageError(extractApiError(error))
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    loadLead()

    return () => {
      active = false
    }
  }, [id])

  const defaultValues = {
    title: lead?.title || '',
    contactName: lead?.contactName || '',
    companyName: lead?.companyName || '',
    email: lead?.email || '',
    phone: lead?.phone || '',
    source: lead?.source || 'other',
    status: lead?.status || 'new',
    value: lead?.value || 0,
    expectedCloseDate: lead?.expectedCloseDate ? String(lead.expectedCloseDate).slice(0, 10) : '',
    notes: lead?.notes || '',
  }

  async function handleUpdate(values) {
    try {
      setSubmitError('')
      setSubmitting(true)
      const updatedLead = await updateLead(id, values)
      setLead(updatedLead)
    } catch (error) {
      setSubmitError(extractApiError(error))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    const shouldDelete = window.confirm('Delete this lead permanently?')

    if (!shouldDelete) {
      return
    }

    try {
      setDeleting(true)
      await deleteLead(id)
      navigate('/leads', { replace: true })
    } catch (error) {
      setPageError(extractApiError(error))
      setDeleting(false)
    }
  }

  return (
    <AppShell
      title="Edit lead"
      actions={
        <Link className="ghost-button" to="/leads">
          Back to leads
        </Link>
      }
    >
      {isLoading ? (
        <div className="panel-surface">
          <p className="text-sm text-slate-500">Loading lead details...</p>
        </div>
      ) : pageError ? (
        <div className="panel-surface">
          <div className="panel-muted border-rose-200 bg-rose-50 text-rose-700">{pageError}</div>
        </div>
      ) : lead ? (
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-4">
            <div className="panel-surface">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="section-eyebrow">Snapshot</p>
                  <h2 className="section-title">{lead.title}</h2>
                </div>
                <StatusBadge status={lead.status} />
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-500">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Account</p>
                  <p className="mt-2 font-semibold text-slate-900">{lead.companyName || 'Independent account'}</p>
                  <p className="mt-1 text-xs">{lead.contactName || 'No contact name yet'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Value</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-slate-900">{formatCurrency(lead.value)}</p>
                  <p className="mt-1 text-xs">{lead.expectedCloseDate ? formatDate(lead.expectedCloseDate) : 'No close date set'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Ownership</p>
                  <p className="mt-2 font-semibold text-slate-900">{lead.owner?.name || 'Unassigned'}</p>
                  <p className="mt-1 text-xs">{lead.owner?.email || 'No owner email available'}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" className="danger-button" disabled={deleting} onClick={handleDelete}>
                  {deleting ? 'Deleting...' : 'Delete lead'}
                </button>
                <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                  Created {formatDate(lead.createdAt)}
                </span>
              </div>
            </div>
          </aside>

          <section className="panel-surface">
            <div className="mb-6">
              <p className="section-eyebrow">Update record</p>
              <h2 className="section-title">Lead details</h2>
            </div>

            <LeadForm
              defaultValues={defaultValues}
              errorMessage={submitError}
              onSubmit={handleUpdate}
              submitLabel="Save changes"
              submitting={submitting}
            />
          </section>
        </div>
      ) : null}
    </AppShell>
  )
}

export default EditLeadPage
