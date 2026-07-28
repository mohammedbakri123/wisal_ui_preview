import type { NotificationRecord } from '../services/notifications.service'
import { NotificationItem } from './NotificationItem'

interface NotificationListProps {
  notifications: NotificationRecord[]
  onOpen: (item: NotificationRecord) => void
}

export function NotificationList({ notifications, onOpen }: NotificationListProps) {
  return (
    <div className="space-y-2.5">
      {notifications.map((item) => (
        <NotificationItem key={item.id} item={item} onOpen={onOpen} />
      ))}
    </div>
  )
}
