import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppShell from '../../components/AppShell'
import LeadForm from '../../components/LeadForm'
import { extractApiError } from '../../services/api'
import { createLead } from '../../services/leadService'

const leadDefaults = {
  title: '',
  contactName: '',
  companyName: '',
  email: '',
  phone: '',
  source: 'other',
  status: 'new',
  value: 0,
  expectedCloseDate: '',
  notes: '',
}

function CreateLeadPage() {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleCreate(values) {
    try {
      setSubmitError('')
      setSubmitting(true)
      const lead = await createLead(values)
      navigate(`/leads/${lead._id}/edit`, { replace: true })
    } catch (error) {
      setSubmitError(extractApiError(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppShell
      title="Create lead"
      actions={
        <Link className="ghost-button" to="/leads">
          Back to leads
        </Link>
      }
    >
      <div className="grid gap-4 ">
        <section className="panel-surface">
          <div className="mb-6">
            <p className="section-eyebrow">New record</p>
            <h2 className="section-title">Lead details</h2>
          </div>

          <LeadForm
            defaultValues={leadDefaults}
            errorMessage={submitError}
            onSubmit={handleCreate}
            submitLabel="Create lead"
            submitting={submitting}
          />
        </section>

        {/* <aside className="space-y-4">
          <div className="panel-surface">
            <p className="section-eyebrow">Input quality</p>
            <h2 className="section-title">What to capture</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>Use a specific title that makes the opportunity easy to scan in a list.</p>
              <p>Add contact and company details early so handoffs are clean.</p>
              <p>Set a realistic value and close date to keep forecasting usable.</p>
            </div>
          </div>

          <div className="panel-surface">
            <p className="section-eyebrow">Workflow</p>
            <h2 className="section-title">Recommended path</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>1. Create the lead with a clear title.</p>
              <p>2. Qualify it inside the edit screen.</p>
              <p>3. Move it through contacted, qualified, and proposal stages.</p>
            </div>
          </div>
        </aside> */}
      </div>
    </AppShell>
  )
}

export default CreateLeadPage
