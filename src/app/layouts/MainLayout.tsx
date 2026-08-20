import { Outlet, useLocation } from 'react-router'
import { BottomNavigation } from '@/core/components/layout/BottomNavigation'
import { Sidebar } from '@/core/components/layout/Sidebar'
import { useOnlineStatus } from '@/core/hooks/useOnlineStatus'
import { ChatStoreProvider } from '@/features/chat/store/ChatStore'
import { StoriesProvider } from '@/features/stories/context/StoriesContext'

export function MainLayout() {
  const isOnline = useOnlineStatus()
  const location = useLocation()

  // Hide bottom nav on mobile when deep in a chat or conversation details
  const isDeepChat =
    (location.pathname.startsWith('/home/c/') && location.pathname.length > 8) ||
    (location.pathname.startsWith('/home/g/') && location.pathname.length > 8)

  return (
    <ChatStoreProvider>
      <StoriesProvider>
        <div className="flex justify-center h-dvh bg-black overflow-hidden select-none">
          {/* Main App Container Shell (max-width: 1280px) */}
          <div className="flex w-full max-w-[1280px] h-full overflow-hidden">
            {/* Desktop / Tablet Nav Rail */}
            <aside className="hidden lg:flex lg:w-[68px] xl:w-[275px] shrink-0 border-r border-[#2f3336] bg-black h-full">
              <Sidebar />
            </aside>

            {/* Center Main Stage / Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full bg-black overflow-hidden">
              {!isOnline && (
                <div className="border-b border-[#f4212e]/20 bg-[#f4212e]/10 px-4 py-2 text-center text-xs font-bold text-[#f4212e]">
                  You're offline. Reconnecting to Wisal...
                </div>
              )}

              <main className="flex-1 flex min-h-0 min-w-0 overflow-hidden">
                <Outlet />
              </main>

              {/* Mobile Bottom Navigation (hidden on desktop) */}
              {!isDeepChat && <BottomNavigation />}
            </div>
          </div>
        </div>
      </StoriesProvider>
    </ChatStoreProvider>
  )
}
