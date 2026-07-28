import { useCallback, useEffect, useState } from 'react'
import type { Conversation } from '@/core/types'
import { mockConversations } from '@/mocks/data/conversations'

export function useConversations() {
  // Start with mock data so the UI is never empty
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConversations = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? '/api'}/conversations`)
      if (!res.ok) throw new Error('Failed to load conversations')
      const data = await res.json()
      setConversations(data.data)
    } catch (err) {
      // Silent fail — fallback to mock data already in state
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let isActive = true

    async function loadConversations() {
      setIsLoading(true)
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL ?? '/api'}/conversations`)
        if (!res.ok) throw new Error('Failed to load conversations')
        const data = await res.json()
        if (isActive) setConversations(data.data)
      } catch {
        // Failed to fetch — mock data fallback is already in state
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    void loadConversations()

    return () => {
      isActive = false
    }
  }, [])

  return { conversations, isLoading, error, refetch: fetchConversations }
}
