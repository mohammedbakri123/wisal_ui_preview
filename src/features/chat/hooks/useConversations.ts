import { useEffect, useState } from 'react'
import type { Conversation } from '@/core/types'
import { mockConversations } from '@/mocks/data/conversations'

const CONVERSATION_ADDED_EVENT = 'wisa:conversation-added'

function notifyConversationChange() {
  window.dispatchEvent(new Event(CONVERSATION_ADDED_EVENT))
}

export function addMockConversation(conversation: Conversation) {
  mockConversations.unshift(conversation)
  notifyConversationChange()
}

export function updateMockConversation(id: string, patch: Partial<Conversation>) {
  const conversation = mockConversations.find((item) => item.id === id)
  if (!conversation) return
  Object.assign(conversation, patch)
  notifyConversationChange()
}

export function removeMockConversation(id: string) {
  const index = mockConversations.findIndex((item) => item.id === id)
  if (index < 0) return
  mockConversations.splice(index, 1)
  notifyConversationChange()
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([...mockConversations])
  const [isLoading] = useState(false)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    const sync = () => setConversations([...mockConversations])
    window.addEventListener(CONVERSATION_ADDED_EVENT, sync)
    return () => window.removeEventListener(CONVERSATION_ADDED_EVENT, sync)
  }, [])

  return { conversations, isLoading, error, refetch: async () => {} }
}
