import { createContext, useContext, type ReactNode } from 'react'
import { useStories } from '@/features/stories/hooks/useStories'
import type { StoryGroup } from '@/core/types/story'

interface StoriesContextValue {
  storyGroups: StoryGroup[]
  activeStoryIndex: { groupIndex: number; storyIndex: number } | null
  openStoryViewer: (groupId: string) => void
  closeStoryViewer: () => void
  goToNextStory: () => void
  goToPrevStory: () => void
  markCurrentAsViewed: () => void
  reactToStory: (emoji: string) => void
  addStory: (userId: string, content: string, type?: 'text' | 'image', backgroundColor?: string) => void
}

const StoriesContext = createContext<StoriesContextValue | null>(null)

export function StoriesProvider({ children }: { children: ReactNode }) {
  const stories = useStories()

  return (
    <StoriesContext.Provider value={stories}>
      {children}
    </StoriesContext.Provider>
  )
}

export function useStoriesContext() {
  const ctx = useContext(StoriesContext)
  if (!ctx) throw new Error('useStoriesContext must be used within StoriesProvider')
  return ctx
}
