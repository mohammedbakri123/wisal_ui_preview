import { useEffect } from 'react'
import type { Conversation } from '@/core/types'
import { realtimeConnection } from '../services/realtime.service'
import { useChatStore } from '../store/ChatStore'

export function useRealtimeMessages(conversation: Conversation | undefined) {
  const { dispatch } = useChatStore()
  const conversationId = conversation?.id

  useEffect(() => {
    if (!conversationId) return

    return realtimeConnection.subscribe(conversationId, (message) => {
      dispatch({ type: 'APPEND_MESSAGE', conversationId, message })
    })
  }, [conversationId, dispatch])
}
