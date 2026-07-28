import { useRef, useState } from 'react'
import { Avatar } from '@/core/components/ui/Avatar'
import type { StoryGroup } from '@/core/types/story'
import { cn } from '@/core/utils/cn'

interface StoriesRowProps {
  storyGroups: StoryGroup[]
  onStoryPress: (userId: string) => void
  onAddStory?: () => void
  onSeeAll?: () => void
}

export function StoriesRow({ storyGroups, onStoryPress, onAddStory, onSeeAll }: StoriesRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = direction === 'left' ? -200 : 200
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Left scroll arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-surface border border-border-light/60 shadow-lg flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
        >
          <svg className="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-center gap-5 overflow-x-auto no-scrollbar px-4 pb-3"
      >
        {/* My story (add story) */}
        {onAddStory && (
          <button
            onClick={onAddStory}
            className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
          >
            <div className="relative">
              <Avatar src={null} alt="You" size="md" />
              <div className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-accent flex items-center justify-center border-2 border-surface group-hover:scale-110 transition-transform">
                <svg className="h-3 w-3 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground truncate max-w-[56px] text-center">Your story</span>
          </button>
        )}

        {storyGroups.map((group) => {
          const hasUnseen = !group.allViewed
          return (
            <button
              key={group.userId}
              onClick={() => onStoryPress(group.userId)}
              className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
            >
              <div className="relative">
                {hasUnseen ? (
                  <div className="animate-pulse-glow rounded-full p-[2px]">
                    <Avatar
                      src={group.userAvatar}
                      alt={group.userName}
                      size="md"
                      story
                      storySeen={false}
                    />
                  </div>
                ) : (
                  <Avatar
                    src={group.userAvatar}
                    alt={group.userName}
                    size="md"
                    story
                    storySeen={true}
                  />
                )}
                {hasUnseen && (
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent border-2 border-surface" />
                )}
              </div>
              <span className={cn(
                'text-[10px] truncate max-w-[56px] text-center',
                hasUnseen ? 'text-foreground font-medium' : 'text-muted-foreground/50',
              )}>
                {group.userName.split(' ')[0]}
              </span>
            </button>
          )
        })}

        {/* See all link */}
        {onSeeAll && storyGroups.length > 0 && (
          <button
            onClick={onSeeAll}
            className="flex flex-col items-center justify-center gap-1 shrink-0 cursor-pointer group h-[72px] w-[60px]"
            title="See all stories"
          >
            <div className="h-[48px] w-[48px] rounded-full border-2 border-dashed border-border-light/40 flex items-center justify-center group-hover:border-accent/50 transition-colors">
              <svg className="h-4 w-4 text-muted-foreground/40 group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
              </svg>
            </div>
            <span className="text-[10px] text-muted-foreground/50 truncate max-w-[56px] text-center group-hover:text-foreground transition-colors">
              See all
            </span>
          </button>
        )}
      </div>

      {/* Right scroll arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-surface border border-border-light/60 shadow-lg flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
        >
          <svg className="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  )
}
