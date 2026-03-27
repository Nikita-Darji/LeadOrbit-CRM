import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navigationItems = [
  { to: '/dashboard', label: 'Dashboard', caption: 'Overview' },
  { to: '/leads', label: 'Leads', caption: 'Pipeline' },
  { to: '/leads/new', label: 'New lead', caption: 'Capture' },
]

function AppShell({ title, subtitle, actions, children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const currentDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())

  function isActiveLink(path) {
    if (path === '/dashboard') {
      return pathname === '/dashboard'
    }

    if (path === '/leads') {
      return pathname.startsWith('/leads') && pathname !== '/leads/new'
    }

    return pathname === path
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 flex-col rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] lg:flex">
          <div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">LeadOrbit CRM</p>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            {navigationItems.map((item) => {
              const active = isActiveLink(item.to)

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`block rounded-xl border px-4 py-3 transition ${
                    active
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className={`mt-1 text-xs ${active ? 'text-slate-300' : 'text-slate-500'}`}>{item.caption}</p>
                </NavLink>
              )
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Signed in</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{user?.name}</p>
            <p className="mt-1 text-xs text-slate-500">{user?.email}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
                {user?.role || 'sales'}
              </span>
              <button type="button" onClick={logout} className="text-xs font-semibold text-slate-600 hover:text-slate-900">
                Logout
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="rounded-[1.4rem] border border-slate-200 bg-white px-5 py-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1">{currentDate}</span>
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1">
                    {pathname.startsWith('/leads') ? 'Lead management' : 'Workspace'}
                  </span>
                </div>
                <h1 className="mt-3 font-display text-[1.65rem] font-semibold text-slate-900">{title}</h1>
                <p className="mt-1 max-w-3xl text-sm text-slate-500">{subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {actions}
                <button type="button" onClick={() => navigate('/leads/new')} className="primary-button">
                  Create lead
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {navigationItems.map((item) => {
                const active = isActiveLink(item.to)

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-semibold ${
                      active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                )
              })}
              <button type="button" onClick={logout} className="whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                Logout
              </button>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default AppShell
