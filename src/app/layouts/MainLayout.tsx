import { Outlet, useLocation } from 'react-router'
import { BottomNavigation } from '@/core/components/layout/BottomNavigation'
import { Sidebar } from '@/core/components/layout/Sidebar'
import { useOnlineStatus } from '@/core/hooks/useOnlineStatus'
import { ChatStoreProvider } from '@/features/chat/store/ChatStore'
import { StoriesProvider } from '@/features/stories/context/StoriesContext'
import { ROUTES } from '@/core/utils/routes'

export function MainLayout() {
  const isOnline = useOnlineStatus()
  const location = useLocation()
  
  // Hide bottom nav on chat conversation pages (desktop uses side-by-side)
  const isConversation = location.pathname.includes('/home/c/') || location.pathname.includes('/home/g/')

  return (
    <ChatStoreProvider>
      <StoriesProvider>
      <div className="flex h-dvh overflow-hidden">
        {/* Telegram-style narrow icon sidebar — always visible on desktop */}
        <div className="hidden lg:flex lg:w-[68px] lg:flex-col lg:border-r lg:border-border-light/40 lg:bg-panel-header lg:shrink-0">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
          {!isOnline && (
            <div className="border-b border-warning/20 bg-warning/10 px-4 py-2 text-center text-xs font-semibold text-warning">
              You're offline. Messages will be sent when you're back online.
            </div>
          )}
          <div className="flex-1 flex min-h-0">
            <Outlet />
          </div>
          {/* Hide bottom nav when viewing a conversation (shows on chat list only) */}
          {!isConversation && <BottomNavigation />}
        </div>
      </div>
      </StoriesProvider>
    </ChatStoreProvider>
  )
}
