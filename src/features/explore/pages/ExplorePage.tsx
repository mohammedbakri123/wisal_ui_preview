import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { PullToRefresh } from '@/core/components/ui/PullToRefresh'
import { useAuth } from '@/app/providers/AuthProvider'
import { useStoriesContext } from '@/features/stories/context/StoriesContext'
import { StoryViewer } from '@/features/stories/components/StoryViewer'
import { StoryCreator } from '@/features/stories/components/StoryCreator'
import { channels as channelsData } from '@/features/channels/data'
import { ROUTES } from '@/core/utils/routes'
import { cn } from '@/core/utils/cn'

const channelTheme: Record<string, { gradient: string; border: string; accent: string; badge: string; icon: string }> = {
  'product-updates': {
    gradient: 'from-amber-500/15 via-yellow-500/5 to-transparent',
    border: 'border-amber-500/20',
    accent: 'text-amber-400',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  'design-systems': {
    gradient: 'from-violet-500/15 via-fuchsia-500/5 to-transparent',
    border: 'border-violet-500/20',
    accent: 'text-violet-400',
    badge: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z',
  },
  'engineering-briefs': {
    gradient: 'from-cyan-500/15 via-blue-500/5 to-transparent',
    border: 'border-cyan-500/20',
    accent: 'text-cyan-400',
    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
}

export default function ExplorePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [channels, setChannels] = useState(channelsData)
  const joined = channels.filter((c) => c.joined)

  const {
    storyGroups,
    activeStoryIndex,
    openStoryViewer,
    closeStoryViewer,
    goToNextStory,
    goToPrevStory,
    markCurrentAsViewed,
    reactToStory,
    addStory,
  } = useStoriesContext()
  const [showCreator, setShowCreator] = useState(false)

  const handleRefresh = async () => {
    await new Promise((r) => setTimeout(r, 800))
    setChannels([...channelsData])
  }

  return (
    <div className="flex h-full flex-col bg-background relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '420px', height: '420px',
            background: 'radial-gradient(circle, rgba(14,165,131,0.10) 0%, transparent 70%)',
            top: '-120px', left: '-80px',
            animation: 'drift 22s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '320px', height: '320px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
            bottom: '-60px', right: '-40px',
            animation: 'drift 25s ease-in-out 2s infinite reverse',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '260px', height: '260px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
            top: '35%', left: '55%',
            animation: 'drift 28s ease-in-out 4s infinite',
          }}
        />
      </div>


      <PullToRefresh onRefresh={handleRefresh} className="flex-1 overflow-hidden">
        {(setScrollRef) => (
          <PageContainer className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl px-3 sm:px-5 lg:px-6" ref={setScrollRef}>
            {/* ===== EDITORIAL HERO ===== */}
            <section className="pt-5 sm:pt-7 lg:pt-9 pb-1">
              <div className="animate-reveal">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/80">
                  Discover
                </span>
                <h1 className="font-serif italic text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] leading-[1.1] mt-2 text-foreground tracking-tight">
                  Explore
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground/60 mt-2 max-w-md lg:max-w-lg leading-relaxed">
                  Stories, channels, and updates from across the network.
                </p>
              </div>
              <div className="mt-5 sm:mt-6 h-px bg-gradient-to-r from-accent/25 via-accent/5 to-transparent" />
            </section>

            {/* ===== STORIES ===== */}
            <section className="pt-5 sm:pt-6 lg:pt-7 pb-1">
              <div className="animate-reveal" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" style={{ animationDuration: '3s' }} />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                    </span>
                    <h2 className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
                      Stories
                    </h2>
                  </div>
                  <button
                    onClick={() => navigate(ROUTES.STORIES)}
                    className="text-[11px] sm:text-xs font-semibold text-accent/80 hover:text-accent transition-colors cursor-pointer"
                  >
                    See all
                  </button>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-border-light/20 bg-surface/40 p-4 sm:p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent pointer-events-none" />

                  <div className="relative">
                    {/* Create story trigger */}
                    <button
                      onClick={() => setShowCreator(true)}
                      className="flex items-center gap-3 w-full mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-xl hover:bg-white/[0.03] transition-all text-left cursor-pointer group"
                    >
                      <div className="relative shrink-0">
                        <Avatar src={user?.avatar ?? null} alt={user?.name ?? 'You'} size="sm" />
                        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent flex items-center justify-center border-2 border-surface group-hover:scale-110 transition-transform">
                          <svg className="h-2 w-2 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.5v15m7.5-7.5h-15" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm font-medium text-foreground/70">Add a story</span>
                        <p className="text-[10px] sm:text-xs text-muted-foreground/40 leading-tight mt-0.5">Share what's happening</p>
                      </div>
                      <kbd className="hidden sm:inline-flex text-[10px] text-muted-foreground/30 border border-border-light/20 rounded px-1.5 py-0.5">
                        +
                      </kbd>
                    </button>

                    <div className="h-px bg-border-light/20 mb-3 sm:mb-4" />

                    {storyGroups.length > 0 ? (
                      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center sm:justify-start">
                        {storyGroups.map((group, idx) => {
                          const hasUnseen = !group.allViewed
                          return (
                            <button
                              key={group.userId}
                              onClick={() => openStoryViewer(group.userId)}
                              className="flex flex-col items-center gap-1.5 p-2 sm:p-2.5 rounded-xl hover:bg-white/[0.03] active:scale-95 transition-all cursor-pointer group/story"
                            >
                              <div className="relative">
                                <div
                                  className={cn(
                                    'rounded-full p-[2px]',
                                    hasUnseen ? 'animate-pulse-glow' : 'opacity-60',
                                  )}
                                >
                                  <div
                                    className={cn(
                                      'rounded-full p-[2px]',
                                      hasUnseen ? 'story-ring' : 'story-ring-seen',
                                    )}
                                  >
                                    <Avatar
                                      src={group.userAvatar}
                                      alt={group.userName}
                                      size="md"
                                    />
                                  </div>
                                </div>
                                {hasUnseen && (
                                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent border-2 border-surface" />
                                )}
                              </div>
                              <span
                                className={cn(
                                  'text-[9px] sm:text-[10px] truncate w-12 sm:w-14 text-center leading-tight',
                                  hasUnseen ? 'font-semibold text-foreground/70' : 'text-muted-foreground/40',
                                )}
                              >
                                {group.userName.split(' ')[0]}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-6">
                        <p className="text-xs sm:text-sm text-muted-foreground/40">No stories yet — be the first!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ===== CHANNELS ===== */}
            <section className="pt-6 sm:pt-7 lg:pt-8 pb-10 sm:pb-12 lg:pb-16">
              <div className="animate-reveal" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent/60" />
                    </span>
                    <h2 className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
                      Your Channels
                    </h2>
                  </div>
                  <button
                    onClick={() => navigate(ROUTES.CHANNEL.DISCOVER)}
                    className="text-[11px] sm:text-xs font-semibold text-accent/80 hover:text-accent transition-colors cursor-pointer"
                  >
                    Discover more
                  </button>
                </div>

                {joined.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                    {joined.map((channel, idx) => {
                      const theme = channelTheme[channel.id] ?? channelTheme['product-updates']
                      const isFirst = idx === 0

                      return (
                        <article
                          key={channel.id}
                          onClick={() => navigate(`/channels/${channel.id}`)}
                          className={cn(
                            'group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer',
                            theme.border,
                            'bg-surface/30',
                            'hover:scale-[1.005] hover:-translate-y-0.5 hover:shadow-lg',
                          )}
                        >
                          <div
                            className={cn(
                              'absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-90 transition-opacity duration-500',
                              theme.gradient,
                            )}
                          />

                          <div
                            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent animate-shimmer"
                          />

                          <div className="relative p-4 sm:p-5 lg:p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  {isFirst && joined.length > 1 && (
                                    <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', theme.badge)}>
                                      Featured
                                    </span>
                                  )}
                                  {channel.admin && (
                                    <span className="text-[10px] text-muted-foreground/40 px-2 py-0.5 rounded-full border border-border-light/20">
                                      Admin
                                    </span>
                                  )}
                                </div>

                                <h3 className={cn(
                                  'font-serif leading-tight text-foreground mt-2',
                                  'text-xl sm:text-2xl lg:text-[1.75rem]',
                                )}>
                                  {channel.name}
                                </h3>

                                <p className="text-xs sm:text-sm text-muted-foreground/50 mt-1.5 line-clamp-2 leading-relaxed">
                                  {channel.description}
                                </p>

                                <div className="flex items-center gap-3 mt-3 sm:mt-4">
                                  <span className="text-[11px] sm:text-xs text-muted-foreground/40">
                                    <span className="font-medium text-muted-foreground/60">{channel.subscribers}</span> subscribers
                                  </span>
                                  <span className="text-[11px] sm:text-xs text-muted-foreground/20">·</span>
                                  <span className={cn('text-[11px] sm:text-xs', theme.accent)}>
                                    {channel.posts} posts
                                  </span>
                                </div>

                                {channel.lastPost && (
                                  <div className="mt-3 sm:mt-4 flex items-start gap-2.5 text-xs sm:text-sm bg-white/[0.015] rounded-lg p-2.5 sm:p-3 border border-border-light/10">
                                    <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5 mt-0.5 shrink-0 opacity-30 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179z" />
                                    </svg>
                                    <span className="italic leading-relaxed text-muted-foreground/45">
                                      "{channel.lastPost}"
                                    </span>
                                    <span className="shrink-0 text-muted-foreground/30 ml-auto whitespace-nowrap">
                                      {channel.lastPostTime}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="shrink-0 flex flex-col items-center gap-2">
                                {channel.verified && (
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent/70" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                  </svg>
                                )}
                                <div className={cn('w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border', theme.badge)}>
                                  <svg className="w-[18px] h-[18px] sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={theme.icon} />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl border border-border-light/20 bg-surface/30 p-8 sm:p-10 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent pointer-events-none" />
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground/50 mb-4">No channels joined yet</p>
                      <Button size="sm" onClick={() => navigate(ROUTES.CHANNEL.DISCOVER)}>
                        Discover channels
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </PageContainer>
        )}
      </PullToRefresh>

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
