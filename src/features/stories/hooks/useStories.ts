import { useState, useCallback } from 'react'
import type { StoryGroup } from '@/core/types/story'
import { mockStoryGroups } from '@/mocks/data/stories'

export function useStories() {
  const [storyGroups, setStoryGroups] = useState<StoryGroup[]>(mockStoryGroups)
  const [activeStoryIndex, setActiveStoryIndex] = useState<{
    groupIndex: number
    storyIndex: number
  } | null>(null)

  const openStoryViewer = useCallback((groupId: string) => {
    const groupIndex = storyGroups.findIndex((g) => g.userId === groupId)
    if (groupIndex !== -1) {
      setActiveStoryIndex({ groupIndex, storyIndex: 0 })
    }
  }, [storyGroups])

  const closeStoryViewer = useCallback(() => {
    setActiveStoryIndex(null)
  }, [])

  const goToNextStory = useCallback(() => {
    if (!activeStoryIndex) return
    const { groupIndex, storyIndex } = activeStoryIndex
    const group = storyGroups[groupIndex]
    if (!group) return

    if (storyIndex < group.stories.length - 1) {
      // Next story in same group
      setActiveStoryIndex({ groupIndex, storyIndex: storyIndex + 1 })
    } else if (groupIndex < storyGroups.length - 1) {
      // First story of next group
      setActiveStoryIndex({ groupIndex: groupIndex + 1, storyIndex: 0 })
    } else {
      // End of all stories
      closeStoryViewer()
    }
  }, [activeStoryIndex, storyGroups, closeStoryViewer])

  const goToPrevStory = useCallback(() => {
    if (!activeStoryIndex) return
    const { groupIndex, storyIndex } = activeStoryIndex

    if (storyIndex > 0) {
      setActiveStoryIndex({ groupIndex, storyIndex: storyIndex - 1 })
    } else if (groupIndex > 0) {
      const prevGroup = storyGroups[groupIndex - 1]
      setActiveStoryIndex({
        groupIndex: groupIndex - 1,
        storyIndex: prevGroup.stories.length - 1,
      })
    }
  }, [activeStoryIndex, storyGroups])

  const markCurrentAsViewed = useCallback(() => {
    if (!activeStoryIndex) return
    const { groupIndex, storyIndex } = activeStoryIndex
    setStoryGroups((prev) => {
      const updated = [...prev]
      const group = { ...updated[groupIndex] }
      const stories = [...group.stories]
      const story = { ...stories[storyIndex] }
      if (!story.viewedBy.includes('1')) {
        story.viewedBy = [...story.viewedBy, '1']
      }
      stories[storyIndex] = story
      group.stories = stories
      // Check if all stories in group are viewed
      group.allViewed = stories.every((s) => s.viewedBy.includes('1'))
      updated[groupIndex] = group
      return updated
    })
  }, [activeStoryIndex])

  const reactToStory = useCallback((emoji: string) => {
    if (!activeStoryIndex) return
    const { groupIndex, storyIndex } = activeStoryIndex
    setStoryGroups((prev) => {
      const updated = [...prev]
      const group = { ...updated[groupIndex] }
      const stories = [...group.stories]
      const story = { ...stories[storyIndex] }
      story.reactions = [...story.reactions, { emoji, userId: '1', timestamp: new Date().toISOString() }]
      stories[storyIndex] = story
      group.stories = stories
      updated[groupIndex] = group
      return updated
    })
  }, [activeStoryIndex])

  const addStory = useCallback((userId: string, content: string, type: 'text' | 'image' = 'text', backgroundColor?: string) => {
    const user = mockStoryGroups.find((g) => g.userId === userId)?.userName ?? 'You'
    const newStory = {
      id: `s${Date.now()}`,
      userId,
      userName: user,
      userAvatar: null,
      mediaUrl: null,
      content,
      type,
      backgroundColor: backgroundColor ?? '#1b2a1e',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 3600_000).toISOString(),
      viewedBy: [],
      reactions: [],
    }
    setStoryGroups((prev) => {
      const existing = prev.find((g) => g.userId === userId)
      if (existing) {
        return prev.map((g) =>
          g.userId === userId
            ? { ...g, stories: [newStory, ...g.stories], allViewed: false, lastUpdated: new Date().toISOString() }
            : g,
        )
      }
      return [
        {
          userId,
          userName: user,
          userAvatar: null,
          stories: [newStory],
          allViewed: false,
          lastUpdated: new Date().toISOString(),
        },
        ...prev,
      ]
    })
  }, [])

  return {
    storyGroups,
    activeStoryIndex,
    openStoryViewer,
    closeStoryViewer,
    goToNextStory,
    goToPrevStory,
    markCurrentAsViewed,
    reactToStory,
    addStory,
  }
}
