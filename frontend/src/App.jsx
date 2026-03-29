import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import CreateLeadPage from './pages/leads/CreateLeadPage'
import EditLeadPage from './pages/leads/EditLeadPage'
import LeadsPage from './pages/leads/LeadsPage'

function HomeRedirect() {
  const { isAuthenticated } = useAuth()

  return <Navigate replace to={isAuthenticated ? '/dashboard' : '/login'} />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/leads/new" element={<CreateLeadPage />} />
        <Route path="/leads/:id/edit" element={<EditLeadPage />} />
      </Route>

      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default App
