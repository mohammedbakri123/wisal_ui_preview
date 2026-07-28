import { http, HttpResponse } from 'msw'
import { mockConversations } from '../data/conversations'

const API = import.meta.env.VITE_API_URL ?? '/api'

export const conversationHandlers = [
  // GET /conversations — list all conversations
  http.get(`${API}/conversations`, () => {
    return HttpResponse.json({
      data: mockConversations,
      total: mockConversations.length,
    })
  }),

  // GET /conversations/:id — single conversation
  http.get(`${API}/conversations/:id`, ({ params }) => {
    const conversation = mockConversations.find((c) => c.id === params.id)
    if (!conversation) {
      return HttpResponse.json({ message: 'Conversation not found' }, { status: 404 })
    }
    return HttpResponse.json({ data: conversation })
  }),
]
