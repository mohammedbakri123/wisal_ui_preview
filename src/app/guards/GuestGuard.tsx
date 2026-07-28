import { Navigate, useLocation } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { Spinner } from '@/core/components/ui/Spinner'
import { ROUTES } from '@/core/utils/routes'

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isAuthenticated) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? ROUTES.HOME
    return <Navigate to={from} replace />
  }

  return <>{children}</>
}
