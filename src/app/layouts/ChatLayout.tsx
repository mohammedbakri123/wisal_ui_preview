import { Outlet, useLocation, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { useConversations } from '@/features/chat/hooks/useConversations'
import { ChatList } from '@/features/chat/components/ChatList'
import { ROUTES } from '@/core/utils/routes'
import { StoryViewer } from '@/features/stories/components/StoryViewer'
import { StoryCreator } from '@/features/stories/components/StoryCreator'
import { useStoriesContext } from '@/features/stories/context/useStoriesContext'

export function ChatLayout() {
  const { user } = useAuth()
  const { conversations, isLoading, error } = useConversations()
  const navigate = useNavigate()
  const location = useLocation()
  const {
    storyGroups,
    activeStoryIndex,
    closeStoryViewer,
    goToNextStory,
    goToPrevStory,
    markCurrentAsViewed,
    reactToStory,
    addStory,
  } = useStoriesContext()
  const [showCreator, setShowCreator] = useState(false)

  const hasActiveConversation =
    location.pathname.startsWith('/home/c/') || location.pathname.startsWith('/home/g/')

  return (
    <div className="flex h-full w-full bg-black overflow-hidden">
      {/* Left List Panel (Messages feed) */}
      <div
        className={`flex flex-col h-full bg-black border-e border-[#2f3336] relative overflow-hidden ${
          hasActiveConversation ? 'hidden md:flex md:w-[380px] lg:w-[420px] xl:w-[460px] shrink-0' : 'w-full md:w-[380px] lg:w-[420px] xl:w-[460px] shrink-0'
        }`}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-black/65 backdrop-blur-md border-b border-[#2f3336] shrink-0 px-4 py-3">
          <div className="flex items-center justify-between mb-2.5">
            <h1 className="text-[20px] font-bold text-[#e7e9ea] leading-none">
              الرسائل
            </h1>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate(ROUTES.SETTINGS.CHATS)}
                className="w-[34.75px] h-[34.75px] rounded-full flex items-center justify-center text-[#e7e9ea] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors cursor-pointer"
                title="إعدادات الرسائل"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.59 3.2c.38-1.6 2.44-1.6 2.82 0a1.65 1.65 0 002.46 1.02c1.4-.86 2.86.6 2 2a1.65 1.65 0 001.02 2.46c1.6.38 1.6 2.44 0 2.82a1.65 1.65 0 00-1.02 2.46c.86 1.4-.6 2.86-2 2a1.65 1.65 0 00-2.46 1.02c-.38 1.6-2.44 1.6-2.82 0a1.65 1.65 0 00-2.46-1.02c-1.4.86-2.86-.6-2-2a1.65 1.65 0 00-1.02-2.46c-1.6-.38-1.6-2.44 0-2.82a1.65 1.65 0 001.02-2.46c-.86-1.4.6-2.86 2-2a1.65 1.65 0 002.46-1.02z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button
                onClick={() => navigate(ROUTES.CHAT.ADD)}
                className="w-[34.75px] h-[34.75px] rounded-full flex items-center justify-center text-[#1d9bf0] hover:bg-[#1d9bf0]/10 active:bg-[#1d9bf0]/20 transition-colors cursor-pointer"
                title="رسالة جديدة"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Pill Input */}
          <div className="relative flex items-center">
            <div className="absolute start-3.5 text-[#71767b] pointer-events-none">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              type="text"
              readOnly
              onClick={() => navigate(ROUTES.CHAT.SEARCH)}
              placeholder="ابحث في الرسائل المباشرة"
              className="h-10 w-full rounded-full bg-[#202327] border border-transparent ps-10 pe-4 text-sm text-[#e7e9ea] placeholder:text-[#71767b] hover:bg-[#272c30] focus:bg-black focus:border-[#1d9bf0] focus:outline-none transition-colors cursor-pointer"
            />
          </div>
        </div>

        {/* Conversation List Feed */}
        <div className="flex-1 overflow-y-auto scrollbar-thin bg-black">
          {error && (
            <div className="p-8 text-center">
              <p className="text-sm text-[#f4212e] mb-3">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-sm font-bold text-[#1d9bf0] hover:underline"
              >
                إعادة المحاولة
              </button>
            </div>
          )}
          {!error && <ChatList conversations={conversations} isLoading={isLoading} />}
        </div>
      </div>

      {/* Right Conversation Panel */}
      <div
        className={`flex-1 flex flex-col min-w-0 bg-black ${
          !hasActiveConversation ? 'hidden md:flex' : 'flex'
        }`}
      >
        <Outlet />
      </div>

      {/* Stories Viewer Modal */}
      <StoryViewer
        storyGroups={storyGroups}
        activeIndex={activeStoryIndex}
        onNext={goToNextStory}
        onPrev={goToPrevStory}
        onClose={closeStoryViewer}
        onMarkViewed={markCurrentAsViewed}
        onReact={reactToStory}
      />

      {/* Story Creator Modal */}
      {showCreator && (
        <StoryCreator
          userName={user?.name ?? 'أنت'}
          userAvatar={user?.avatar ?? null}
          onPublish={(content, bgColor) => addStory(user?.id ?? '1', content, 'text', bgColor)}
          onClose={() => setShowCreator(false)}
        />
      )}
    </div>
  )
}
