import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { leadSourceOptions, leadStatusOptions } from '../lib/leadOptions'

function LeadForm({ defaultValues, onSubmit, submitLabel, submitting, errorMessage }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const disabled = isSubmitting || submitting

  return (
    <form
      onSubmit={handleSubmit((values) =>
        onSubmit({
          ...values,
          value: values.value ? Number(values.value) : 0,
          expectedCloseDate: values.expectedCloseDate || null,
        }),
      )}
      className="space-y-5"
    >
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.1rem] border border-slate-200 bg-slate-50/70 p-5">
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Lead details</p>
          </div>

          <fieldset disabled={disabled} className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 md:col-span-2">
              <span className="field-label">Lead title</span>
              <input
                {...register('title', { required: 'Lead title is required' })}
                className="field-input"
                placeholder="Enterprise annual renewal"
              />
              {errors.title ? <p className="field-error">{errors.title.message}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="field-label">Contact name</span>
              <input {...register('contactName')} className="field-input" placeholder="Alicia Kumar" />
            </label>

            <label className="space-y-2">
              <span className="field-label">Company name</span>
              <input {...register('companyName')} className="field-input" placeholder="Orbit Labs" />
            </label>

            <label className="space-y-2">
              <span className="field-label">Email</span>
              <input
                {...register('email', {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Enter a valid email address',
                  },
                })}
                className="field-input"
                placeholder="alicia@orbitlabs.com"
                type="email"
              />
              {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="field-label">Phone</span>
              <input {...register('phone')} className="field-input" placeholder="+91 98765 43210" />
            </label>
          </fieldset>
        </section>

        <section className="rounded-[1.1rem] border border-slate-200 bg-slate-50/70 p-5">
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Pipeline setup</p>
            <p className="mt-1 text-sm text-slate-500">Classify, value, and schedule the opportunity.</p>
          </div>

          <fieldset disabled={disabled} className="grid gap-4">
            <label className="space-y-2">
              <span className="field-label">Source</span>
              <select {...register('source')} className="field-input">
                {leadSourceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="field-label">Status</span>
              <select {...register('status')} className="field-input">
                {leadStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="field-label">Estimated value</span>
              <input {...register('value')} className="field-input" min="0" placeholder="250000" type="number" />
            </label>

            <label className="space-y-2">
              <span className="field-label">Expected close date</span>
              <input {...register('expectedCloseDate')} className="field-input" type="date" />
            </label>
          </fieldset>
        </section>
      </div>

      <section className="rounded-[1.1rem] border border-slate-200 bg-slate-50/70 p-5">
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Notes</p>
          <p className="mt-1 text-sm text-slate-500">Capture context, blockers, urgency, and next steps.</p>
        </div>
        <fieldset disabled={disabled}>
          <label className="space-y-2">
            <span className="field-label">Internal notes</span>
            <textarea
              {...register('notes')}
              className="field-input min-h-36 resize-y"
              placeholder="Add qualification notes, stakeholder info, follow-up plan, or deal risks."
            />
          </label>
        </fieldset>
      </section>

      {errorMessage ? <div className="panel-muted border-rose-200 bg-rose-50 text-rose-700">{errorMessage}</div> : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">This form maps directly to your backend lead schema and is designed for fast data entry.</p>
        <button type="submit" className="primary-button" disabled={disabled}>
          {disabled ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default LeadForm
