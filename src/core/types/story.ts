import type { User } from './user'

export interface Story {
  id: string
  userId: string
  userName: string
  userAvatar: string | null
  mediaUrl: string | null
  content: string
  type: 'text' | 'image' | 'video'
  backgroundColor?: string
  createdAt: string
  expiresAt: string
  viewedBy: string[]
  reactions: StoryReaction[]
}

export interface StoryReaction {
  emoji: string
  userId: string
  timestamp: string
}

export interface StoryGroup {
  userId: string
  userName: string
  userAvatar: string | null
  stories: Story[]
  allViewed: boolean
  lastUpdated: string
}
