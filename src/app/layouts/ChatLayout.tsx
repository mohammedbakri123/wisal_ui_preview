import { Outlet, useLocation } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { useConversations } from '@/features/chat/hooks/useConversations'
import { ChatList } from '@/features/chat/components/ChatList'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/core/utils/routes'
import { StoryViewer } from '@/features/stories/components/StoryViewer'
import { StoryCreator } from '@/features/stories/components/StoryCreator'
import { useStoriesContext } from '@/features/stories/context/StoriesContext'
import { useState } from 'react'
import { Avatar } from '@/core/components/ui/Avatar'

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

  const hasActiveConversation = location.pathname.includes('/home/c/') || location.pathname.includes('/home/g/')

  return (
    <div className="flex h-full w-full">
      {/* Left Panel */}
      <div className={`flex flex-col h-full bg-surface border-r border-border-light/40 relative overflow-hidden ${
        hasActiveConversation ? 'hidden lg:flex lg:w-[400px] lg:shrink-0' : 'w-full lg:w-[400px] lg:shrink-0'
      }`}>
        {/* Background atmosphere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              width: '320px', height: '320px',
              background: 'radial-gradient(circle, rgba(14,165,131,0.08) 0%, transparent 70%)',
              top: '-100px', right: '-80px',
              animation: 'drift 25s ease-in-out infinite',
            }}
          />
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              width: '220px', height: '220px',
              background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
              bottom: '20%', left: '-60px',
              animation: 'drift 30s ease-in-out 6s infinite reverse',
            }}
          />
        </div>

        {/* Header */}
        <div className="relative shrink-0 z-10 bg-gradient-to-b from-panel-header/90 to-panel-header/40 backdrop-blur-md border-b border-border-light/10">
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/70">Messages</span>
                <h1 className="font-serif italic text-xl sm:text-2xl tracking-tight text-foreground mt-0.5 leading-none">
                  Wisal
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(ROUTES.CHAT.ADD)}
                  className="h-9 w-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent hover:bg-accent/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="New chat"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <Avatar src={user?.avatar} alt={user?.name ?? 'User'} size="sm" online />
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="px-4 pb-3">
            <button
              onClick={() => navigate(ROUTES.CHAT.SEARCH)}
              className="group flex w-full items-center gap-2.5 h-10 bg-background/60 rounded-xl px-3.5 text-left border border-border-light/10 hover:border-accent/25 hover:bg-background/80 focus-within:ring-2 focus-within:ring-accent/20 transition-all duration-300"
            >
              <svg className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <span className="text-sm text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors">Search or start a new chat</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground/20 border border-border-light/10 rounded-md px-1.5 py-0.5 hidden sm:inline">⌘K</span>
            </button>
          </div>
        </div>

        {/* Stories section */}
        {/* <div className="relative shrink-0 z-10">
          <div className="px-4 pt-3 pb-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" style={{ animationDuration: '3s' }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">Stories</span>
            </div>
          </div>
          <div className="border-b border-border-light/20">
            <StoriesRow
              storyGroups={storyGroups}
              onStoryPress={openStoryViewer}
              onAddStory={() => setShowCreator(true)}
              onSeeAll={() => navigate(ROUTES.EXPLORE)}
            />
          </div>
        </div> */}

        {/* Chat list */}
        <div className="relative flex-1 overflow-y-auto scrollbar-thin bg-surface z-10">
          {error && (
            <div className="px-4 py-12 text-center">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-3">
                <svg className="h-6 w-6 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{error}</p>
              <button onClick={() => window.location.reload()} className="text-sm text-accent hover:underline font-medium cursor-pointer">
                Try again
              </button>
            </div>
          )}
          {!error && <ChatList conversations={conversations} isLoading={isLoading} />}
        </div>
      </div>

      {/* Right Panel */}
      <div className={`flex-1 flex flex-col min-w-0 bg-background ${
        !hasActiveConversation ? 'hidden lg:flex' : 'flex'
      }`}>
        <Outlet />
      </div>

      {/* FAB */}
      {/* <button
        onClick={() => navigate(ROUTES.CHAT.ADD)}
        className="lg:hidden fixed bottom-24 right-4 w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg shadow-accent/30 hover:bg-accent/90 active:scale-95 transition-all cursor-pointer z-20"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.5v15m7.5-7.5h-15" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
        </svg>
      </button> */}

      <StoryViewer
        storyGroups={storyGroups}
        activeIndex={activeStoryIndex}
        onNext={goToNextStory}
        onPrev={goToPrevStory}
        onClose={closeStoryViewer}
        onMarkViewed={markCurrentAsViewed}
        onReact={reactToStory}
      />

      {showCreator && (
        <StoryCreator
          userName={user?.name ?? 'You'}
          userAvatar={user?.avatar ?? null}
          onPublish={(content, bgColor) => addStory(user?.id ?? '1', content, 'text', bgColor)}
          onClose={() => setShowCreator(false)}
        />
      )}
    </div>
  )
}
