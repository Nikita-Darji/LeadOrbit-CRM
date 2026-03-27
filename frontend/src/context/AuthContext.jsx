import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../services/authService'
import { clearSessionToken, extractApiError, getSessionToken, setSessionToken } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => getSessionToken())
  const [isBootstrapping, setIsBootstrapping] = useState(true)

  useEffect(() => {
    let active = true

    async function bootstrapSession() {
      const savedToken = getSessionToken()

      if (!savedToken) {
        if (active) {
          setToken(null)
          setUser(null)
          setIsBootstrapping(false)
        }
        return
      }

      try {
        setSessionToken(savedToken)
        const currentUser = await getCurrentUser()

        if (active) {
          setToken(savedToken)
          setUser(currentUser)
        }
      } catch {
        clearSessionToken()
        if (active) {
          setToken(null)
          setUser(null)
        }
      } finally {
        if (active) {
          setIsBootstrapping(false)
        }
      }
    }

    bootstrapSession()

    return () => {
      active = false
    }
  }, [])

  async function login(credentials) {
    try {
      const data = await loginUser(credentials)
      setSessionToken(data.token)
      setToken(data.token)
      setUser(data.user)
      return data.user
    } catch (error) {
      throw new Error(extractApiError(error))
    }
  }

  async function register(details) {
    try {
      await registerUser(details)
      return await login({
        email: details.email,
        password: details.password,
      })
    } catch (error) {
      throw new Error(extractApiError(error))
    }
  }

  function logout() {
    clearSessionToken()
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        isBootstrapping,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
