import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AuthLayout from '../../layouts/AuthLayout'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [submitError, setSubmitError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values) {
    try {
      setSubmitError('')
      await login(values)
      const nextPath = location.state?.from?.pathname || '/dashboard'
      navigate(nextPath, { replace: true })
    } catch (error) {
      setSubmitError(error.message)
    }
  }

  return (
    <AuthLayout
      eyebrow="Operator access"
      title="Login"
      subtitle="Sign in to your CRM workspace."
      footer={
        <p>
          Need an account?{' '}
          <Link className="font-semibold text-slate-900 hover:text-slate-600" to="/register">
            Create one
          </Link>
          .
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <span className="field-label">Password</span>
          <input
            {...register('password', { required: 'Password is required' })}
            className="field-input"
            placeholder="Enter your password"
            type="password"
          />
          {errors.password ? <p className="field-error">{errors.password.message}</p> : null}
        </label>

        {submitError ? <div className="panel-muted border-rose-200 bg-rose-50 text-rose-700">{submitError}</div> : null}

        <button type="submit" className="primary-button w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  )
}
