import { useCallback, useState, type ReactNode } from 'react'
import { AdminAuthContext } from './admin-auth-context'
const ADMIN_SESSION_KEY = 'wisaL_admin_session'

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'active')

  const login = useCallback((username: string, password: string) => {
    const valid = username.trim() === 'admin' && password === 'admin'
    if (valid) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'active')
      setIsAdmin(true)
    }
    return valid
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    setIsAdmin(false)
  }, [])

  return <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>{children}</AdminAuthContext.Provider>
}
