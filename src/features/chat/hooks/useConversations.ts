import { useState } from 'react'
import type { Conversation } from '@/core/types'
import { mockConversations } from '@/mocks/data/conversations'

export function useConversations() {
  const [conversations] = useState<Conversation[]>(mockConversations)
  const [isLoading] = useState(false)
  const [error] = useState<string | null>(null)

  return { conversations, isLoading, error, refetch: async () => {} }
}
