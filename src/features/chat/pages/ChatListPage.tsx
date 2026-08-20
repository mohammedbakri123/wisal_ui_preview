import { Navigate } from 'react-router'
import { ROUTES } from '@/core/utils/routes'

/**
 * The home chat list is rendered by ChatLayout so it can stay visible beside
 * a selected conversation. This route-level component preserves the planned
 * screen artifact for consumers that resolve screens independently.
 */
export default function ChatListPage() {
  return <Navigate to={ROUTES.CHAT.LIST} replace />
}
