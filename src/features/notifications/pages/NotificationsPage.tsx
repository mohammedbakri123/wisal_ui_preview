import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { NotificationList } from '../components/NotificationList'
import { notificationsService, type NotificationRecord } from '../services/notifications.service'

export default function NotificationsPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<NotificationRecord['type'] | 'all'>('all')
  const [notifications, setNotifications] = useState<NotificationRecord[]>(() => [])

  useEffect(() => {
    let isActive = true
    void notificationsService.list().then((items) => {
      if (isActive) setNotifications(items)
    })
    return () => {
      isActive = false
    }
  }, [])

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isUnread: false })))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const handleOpen = (item: NotificationRecord) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === item.id ? { ...notification, isUnread: false } : notification,
      ),
    )
    navigate(item.path)
  }

  const filteredNotifications =
    activeFilter === 'all'
      ? notifications
      : notifications.filter((notification) => notification.type === activeFilter)

  const filters: Array<{ id: NotificationRecord['type'] | 'all'; label: string }> = [
    { id: 'all', label: 'الكل' },
    { id: 'message', label: 'الرسائل' },
    { id: 'mention', label: 'الإشارات' },
    { id: 'invite', label: 'الدعوات' },
    { id: 'system', label: 'النظام' },
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      <PageContainer className="mx-auto w-full max-w-2xl px-3 sm:px-4 pt-3 sm:pt-4">
        {notifications.length > 0 && (
          <div className="mb-4 flex items-center justify-end gap-2">
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-accent hover:text-accent/80 font-semibold transition-colors cursor-pointer px-2 py-1 rounded"
            >
              تعليم كمقروءة
            </button>
            <button
              onClick={handleClearAll}
              className="text-xs text-muted-foreground hover:text-foreground font-semibold transition-colors cursor-pointer px-2 py-1 rounded"
            >
              مسح الكل
            </button>
          </div>
        )}
        {notifications.length > 0 && (
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeFilter === filter.id
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border-light/40 bg-surface text-muted-foreground/80 hover:text-foreground'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {filteredNotifications.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-4 py-24 text-center">
            <div className="mb-4 rounded-full border border-border-light/30 bg-muted/40 p-4">
              <svg className="h-10 w-10 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <h3 className="text-base font-bold">لا توجد إشعارات</h3>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground/70">
              أنت على اطلاع بكل شيء! لا توجد إشعارات نشطة.
            </p>
          </div>
        ) : (
          <NotificationList notifications={filteredNotifications} onOpen={handleOpen} />
        )}
      </PageContainer>
    </div>
  )
}
