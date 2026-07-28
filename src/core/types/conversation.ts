import type { User } from './user'

export interface Conversation {
  id: string
  name: string
  avatar: string | null
  type: 'direct' | 'group' | 'channel'
  lastMessage: string | null
  lastMessageAt: string | null
  unreadCount: number
  members: User[]
  isMuted: boolean
  isPinned: boolean
  createdAt: string
}
