import type { User } from './user'

export interface Message {
  id: string
  conversationId: string
  sender: User
  content: string
  type: 'text' | 'image' | 'file' | 'system'
  replyTo: string | null
  isEdited: boolean
  isPinned: boolean
  reactions: Reaction[]
  createdAt: string
  updatedAt: string
}

export interface Reaction {
  emoji: string
  count: number
  userIds: string[]
}
