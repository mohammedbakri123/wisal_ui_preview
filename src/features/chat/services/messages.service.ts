import type { Message, User } from '@/core/types'
import { mockMessages } from '@/mocks/data/messages'
import { mockConversations } from '@/mocks/data/conversations'
import { mockUsers } from '@/mocks/data/users'
import { realtimeConnection } from './realtime.service'

const fallbackSender = mockUsers[0]
const quickReplies = [
  'That works for me.',
  'I am checking this now.',
  'Can you send the latest version?',
  'Let us circle back after the review.',
  'Thanks, I have what I need.',
]

function createMessage(conversationId: string, sender: User, content: string, type: Message['type']): Message {
  const now = new Date().toISOString()
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    conversationId,
    sender,
    content,
    type,
    replyTo: null,
    isEdited: false,
    isPinned: false,
    reactions: [],
    createdAt: now,
    updatedAt: now,
  }
}

const store: Record<string, Message[]> = Object.fromEntries(
  Object.entries(mockMessages).map(([conversationId, messages]) => [conversationId, [...messages]]),
)

export const messagesService = {
  async list(conversationId: string): Promise<Message[]> {
    return store[conversationId] ?? []
  },

  async send(
    conversationId: string,
    content: string,
    type: Message['type'] = 'text',
    sender?: User | null,
  ): Promise<Message[]> {
    const conversation = mockConversations.find((item) => item.id === conversationId)
    const current = store[conversationId] ?? []
    const msgSender = sender ?? fallbackSender
    const sent = createMessage(conversationId, msgSender, content, type)
    const next = [...current, sent]

    if (type === 'text' && conversation && conversation.type !== 'channel') {
      const responder = conversation.members.find((member) => member.id !== msgSender.id) ?? {
        ...fallbackSender,
        id: `reply_${conversation.id}`,
        name: conversation.name,
        avatar: conversation.avatar,
        email: null,
        phone: null,
      }
      const reply = quickReplies[Math.floor(Math.random() * quickReplies.length)]
      next.push(createMessage(conversationId, responder, reply, 'text'))
    }

    store[conversationId] = next

    const senderId = msgSender.id
    const messages = next
    const latestReply = type === 'text'
      ? messages
          .slice()
          .reverse()
          .find((message) => message.sender.id !== senderId && message.type === 'text')
      : undefined

    if (latestReply) {
      window.setTimeout(() => realtimeConnection.publish(latestReply), 450)
    }

    return next
  },

  async clear(conversationId: string): Promise<void> {
    store[conversationId] = []
  },
}
