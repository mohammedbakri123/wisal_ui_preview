import { Navigate, Outlet, useLocation } from 'react-router'
import { useAdminAuth } from '@/app/providers/useAdminAuth'
import { ROUTES } from '@/core/utils/routes'

export function AdminGuard() {
  const { isAdmin } = useAdminAuth()
  const location = useLocation()
  if (!isAdmin) return <Navigate to={ROUTES.ADMIN.LOGIN} replace state={{ from: location.pathname }} />
  return <Outlet />
}
