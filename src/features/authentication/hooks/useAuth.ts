import { useAuth as useAuthProvider } from '@/app/providers/AuthProvider'

export { useAuth as useAuthProvider }

export function useAuth() {
  return useAuthProvider()
}
