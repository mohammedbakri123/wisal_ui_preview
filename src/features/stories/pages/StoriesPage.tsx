import { useState } from 'react'
import { Avatar } from '@/core/components/ui/Avatar'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { useAuth } from '@/app/providers/AuthProvider'
import { useStoriesContext } from '@/features/stories/context/StoriesContext'
import { StoryViewer } from '@/features/stories/components/StoryViewer'
import { StoryCreator } from '@/features/stories/components/StoryCreator'
import { cn } from '@/core/utils/cn'

export default function StoriesPage() {
  const { user } = useAuth()
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

  return (
    <div className="flex h-full flex-col bg-background">
      <PageContainer className="mx-auto w-full max-w-2xl px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton />
        {/* Your story - create new */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3 px-1">
            Your Story
          </p>
          <button
            onClick={() => setShowCreator(true)}
            className="flex items-center gap-4 w-full p-4 rounded-2xl bg-surface border border-border-light/40 hover:bg-surface-hover transition-all text-left cursor-pointer group"
          >
            <div className="relative shrink-0">
              <Avatar src={user?.avatar ?? null} alt={user?.name ?? 'You'} size="md" />
              <div className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-accent flex items-center justify-center border-2 border-surface group-hover:bg-accent/90 transition-colors">
                <svg className="h-3 w-3 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5v15m7.5-7.5h-15" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Create a story</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">Share what's on your mind</p>
            </div>
            <svg className="h-4 w-4 text-muted-foreground/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Recent stories */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3 px-1">
            Recent Updates
          </p>

          {storyGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23C3.588 7.812 2.25 9.318 2.25 11.11v3.697c0 1.793 1.338 3.299 2.936 3.882a2.31 2.31 0 0 1 1.641 1.055l1.43 2.146c.492.736 1.643.736 2.135 0l1.43-2.146a2.31 2.31 0 0 1 1.641-1.055c.168-.048.335-.102.5-.16M9 6.75a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-muted-foreground/70">No stories yet</p>
              <p className="text-xs text-muted-foreground/50 mt-1 max-w-xs">
                Stories disappear after 24 hours. Create one to get started!
              </p>
            </div>
          ) : (
            /* Story grid — like Instagram */
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {storyGroups.map((group) => {
                const hasUnseen = !group.allViewed
                return (
                  <button
                    key={group.userId}
                    onClick={() => openStoryViewer(group.userId)}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-surface border border-border-light/40 hover:bg-surface-hover active:scale-[0.97] transition-all cursor-pointer group"
                  >
                    <div className="relative">
                      <div className={cn(
                        'rounded-full p-0.5',
                        hasUnseen ? 'story-ring' : 'story-ring-seen',
                      )}>
                        <Avatar
                          src={group.userAvatar}
                          alt={group.userName}
                          size="lg"
                        />
                      </div>
                      {/* Active indicator */}
                      {hasUnseen && (
                        <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent border-2 border-surface" />
                      )}
                    </div>
                    <span className={cn(
                      'text-xs text-center truncate w-full',
                      hasUnseen ? 'font-semibold text-foreground' : 'text-muted-foreground',
                    )}>
                      {group.userName.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-muted-foreground/50">
                      {group.stories.length} {group.stories.length === 1 ? 'story' : 'stories'}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Active stories feed */}
        {storyGroups.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3 px-1">
              Latest Stories
            </p>
            <div className="space-y-3">
              {storyGroups.map((group) => (
                <button
                  key={group.userId}
                  onClick={() => openStoryViewer(group.userId)}
                  className="flex items-center gap-3 w-full p-3 rounded-2xl bg-surface border border-border-light/40 hover:bg-surface-hover transition-all text-left cursor-pointer"
                >
                  <Avatar
                    src={group.userAvatar}
                    alt={group.userName}
                    size="md"
                    story
                    storySeen={group.allViewed}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'text-sm truncate',
                      !group.allViewed ? 'font-semibold text-foreground' : 'text-muted-foreground',
                    )}>
                      {group.userName}
                    </p>
                    <p className="text-xs text-muted-foreground/50 truncate mt-0.5">
                      {group.stories[group.stories.length - 1]?.content.slice(0, 60)}
                      {group.stories[group.stories.length - 1]?.content.length > 60 ? '...' : ''}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-muted-foreground/50">
                      {group.stories.length} stories
                    </p>
                    {!group.allViewed && (
                      <span className="inline-block mt-1 h-2 w-2 rounded-full bg-accent" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </PageContainer>

      {/* Story Viewer overlay */}
      <StoryViewer
        storyGroups={storyGroups}
        activeIndex={activeStoryIndex}
        onNext={goToNextStory}
        onPrev={goToPrevStory}
        onClose={closeStoryViewer}
        onMarkViewed={markCurrentAsViewed}
        onReact={reactToStory}
      />

      {/* Story Creator */}
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
