import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PublicRoute() {
  const { isAuthenticated, isBootstrapping } = useAuth()

  if (isBootstrapping) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900">
        <div className="panel-surface w-full max-w-md text-center">
          <p className="font-display text-2xl text-slate-900">Preparing LeadOrbit</p>
          <p className="mt-3 text-sm text-slate-500">One moment while we restore your account.</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <Navigate replace to="/dashboard" /> : <Outlet />
}

export default PublicRoute
