import { createContext } from 'react'

export interface AdminAuthContextValue {
  isAdmin: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)
