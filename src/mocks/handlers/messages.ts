import { http, HttpResponse, delay } from 'msw'
import type { Message, User } from '@/core/types'
import { mockConversations } from '../data/conversations'
import { mockMessages } from '../data/messages'
import { mockUsers } from '../data/users'

const API = import.meta.env.VITE_API_URL ?? '/api'
const messageStore: Record<string, Message[]> = Object.fromEntries(
  Object.entries(mockMessages).map(([conversationId, messages]) => [conversationId, [...messages]]),
)

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

export const messageHandlers = [
  http.get(`${API}/conversations/:id/messages`, ({ params }) => {
    const conversationId = String(params.id)
    return HttpResponse.json({ data: messageStore[conversationId] ?? [] })
  }),

  http.post(`${API}/conversations/:id/messages`, async ({ params, request }) => {
    await delay(250)
    const conversationId = String(params.id)
    const conversation = mockConversations.find((item) => item.id === conversationId)
    if (!conversation) {
      return HttpResponse.json({ message: 'Conversation not found' }, { status: 404 })
    }

    const body = (await request.json()) as { content?: string; type?: Message['type']; sender?: User | null }
    const type = body.type ?? 'text'
    const content = body.content?.trim() ?? ''
    if (type === 'text' && !content) {
      return HttpResponse.json({ message: 'Message content is required' }, { status: 400 })
    }

    const current = messageStore[conversationId] ?? []
    const sender = body.sender ?? fallbackSender
    const sent = createMessage(conversationId, sender, content, type)
    const next = [...current, sent]

    if (type === 'text' && conversation.type !== 'channel') {
      const responder = conversation.members.find((member) => member.id !== sender.id) ?? {
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

    messageStore[conversationId] = next
    return HttpResponse.json({ data: next })
  }),

  http.delete(`${API}/conversations/:id/messages`, ({ params }) => {
    const conversationId = String(params.id)
    messageStore[conversationId] = []
    return HttpResponse.json({ data: [] })
  }),
]
