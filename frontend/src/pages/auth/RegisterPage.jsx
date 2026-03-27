import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AuthLayout from '../../layouts/AuthLayout'

const roleOptions = [
  { value: 'sales', label: 'Sales' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register: registerAccount } = useAuth()
  const [submitError, setSubmitError] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'sales',
    },
  })

  async function onSubmit(values) {
    try {
      setSubmitError('')
      const { confirmPassword, ...payload } = values
      await registerAccount(payload)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setSubmitError(error.message)
    }
  }

  return (
    <AuthLayout
      eyebrow="New workspace"
      title="Register"
      subtitle="Create your team account."
      footer={
        <p>
          Already registered?{' '}
          <Link className="font-semibold text-slate-900 hover:text-slate-600" to="/login">
            Login here
          </Link>
          .
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="space-y-2">
          <span className="field-label">Full name</span>
          <input
            {...register('name', { required: 'Name is required' })}
            className="field-input"
            placeholder="Nikita Sharma"
          />
          {errors.name ? <p className="field-error">{errors.name.message}</p> : null}
        </label>

        <label className="space-y-2">
          <span className="field-label">Email</span>
          <input
            {...register('email', { required: 'Email is required' })}
            className="field-input"
            placeholder="team@company.com"
            type="email"
          />
          {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
        </label>

        <label className="space-y-2">
          <span className="field-label">Role</span>
          <select {...register('role')} className="field-input">
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="field-label">Password</span>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Use at least 6 characters',
                },
              })}
              className="field-input"
              placeholder="Create a password"
              type="password"
            />
            {errors.password ? <p className="field-error">{errors.password.message}</p> : null}
          </label>

          <label className="space-y-2">
            <span className="field-label">Confirm password</span>
            <input
              {...register('confirmPassword', {
                required: 'Confirm your password',
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
              className="field-input"
              placeholder="Repeat password"
              type="password"
            />
            {errors.confirmPassword ? <p className="field-error">{errors.confirmPassword.message}</p> : null}
          </label>
        </div>

        {submitError ? <div className="panel-muted border-rose-200 bg-rose-50 text-rose-700">{submitError}</div> : null}

        <button type="submit" className="primary-button w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  )
}
