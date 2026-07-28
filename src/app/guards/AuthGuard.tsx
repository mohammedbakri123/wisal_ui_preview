import { Navigate, useLocation } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { Spinner } from '@/core/components/ui/Spinner'
import { ROUTES } from '@/core/utils/routes'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />
  }

  return <>{children}</>
}
