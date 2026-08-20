import { createContext } from 'react'
import type { StoryGroup } from '@/core/types/story'

export interface StoriesContextValue {
  storyGroups: StoryGroup[]
  activeStoryIndex: { groupIndex: number; storyIndex: number } | null
  openStoryViewer: (groupId: string) => void
  closeStoryViewer: () => void
  goToNextStory: () => void
  goToPrevStory: () => void
  markCurrentAsViewed: () => void
  reactToStory: (emoji: string) => void
  addStory: (userId: string, content: string, type?: 'text' | 'image' | 'video', backgroundColor?: string, mediaUrl?: string, privacy?: StoryGroup['stories'][number]['privacy']) => void
  deleteStory: (storyId: string) => void
}

export const StoriesContext = createContext<StoriesContextValue | null>(null)
