import { useCallback } from 'react'
import type { Conversation, Message, User } from '@/core/types'
import { messagesService } from '../services/messages.service'
import { useChatStore } from '../store/ChatStore'

function createOptimisticMessage(conversationId: string, currentUser: User | null, content: string, type: Message['type'], replyTo: string | null): Message {
  const now = new Date().toISOString()
  return {
    id: `optimistic_${Date.now()}`,
    conversationId,
    sender: currentUser ?? {
      id: '1',
      name: 'Alex Morgan',
      avatar: null,
      bio: 'Building the future, one commit at a time.',
      phone: '+1234567890',
      email: 'alex@example.com',
      isOnline: true,
      lastSeen: null,
      createdAt: now,
    },
    content: content.trim(),
    type,
    replyTo,
    isEdited: false,
    isPinned: false,
    reactions: [],
    createdAt: now,
    updatedAt: now,
  }
}

export function useSendMessage(conversation: Conversation | undefined, currentUser: User | null) {
  const { dispatch } = useChatStore()
  const conversationId = conversation?.id

  return useCallback(
    async (content: string, type: Message['type'] = 'text', replyTo: string | null = null) => {
      if (!conversationId) return
      if (type === 'text' && !content.trim()) return

      dispatch({ type: 'CLEAR_ERROR' })
      dispatch({
        type: 'APPEND_MESSAGE',
        conversationId,
        message: createOptimisticMessage(conversationId, currentUser, content, type, replyTo),
      })

      if (!navigator.onLine) {
        dispatch({
          type: 'LOAD_ERROR',
          message: 'Message queued locally while offline.',
        })
        return
      }

      if (type === 'text' && conversation?.type !== 'channel') {
        dispatch({ type: 'SET_REPLYING', conversationId })
      }

      try {
        const updated = await messagesService.send(conversationId, content, type, currentUser, replyTo)
        const senderId = currentUser?.id ?? '1'
        const latestReply = type === 'text' && conversation?.type !== 'channel'
          ? [...updated]
              .reverse()
              .find((message) => message.sender.id !== senderId && message.type === 'text')
          : undefined
        const messagesWithoutPendingReply = latestReply
          ? updated.filter((message) => message.id !== latestReply.id)
          : updated

        dispatch({
          type: 'UPSERT_MESSAGES',
          conversationId,
          messages: messagesWithoutPendingReply,
        })
      } catch (err) {
        dispatch({
          type: 'LOAD_ERROR',
          message: err instanceof Error ? err.message : 'Failed to send message',
        })
      } finally {
        dispatch({ type: 'SET_REPLYING', conversationId: null })
      }
    },
    [conversation, conversationId, currentUser, dispatch],
  )
}
