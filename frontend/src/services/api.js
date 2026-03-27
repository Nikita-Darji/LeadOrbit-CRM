import axios from 'axios'

const SESSION_TOKEN_KEY = 'leadorbit_token'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_BASE_URL,
})

export function setSessionToken(token) {
  if (token) {
    localStorage.setItem(SESSION_TOKEN_KEY, token)
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    return
  }

  localStorage.removeItem(SESSION_TOKEN_KEY)
  delete api.defaults.headers.common.Authorization
}

export function getSessionToken() {
  return localStorage.getItem(SESSION_TOKEN_KEY)
}

export function clearSessionToken() {
  setSessionToken(null)
}

export function extractApiError(error) {
  return error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.'
}

const savedToken = getSessionToken()

if (savedToken) {
  setSessionToken(savedToken)
}
