import { useCallback, useEffect } from 'react'
import type { Conversation } from '@/core/types'
import { messagesService } from '../services/messages.service'
import { useChatStore } from '../store/ChatStore'

export function useMessages(conversation: Conversation | undefined) {
  const conversationId = conversation?.id
  const {
    messagesByConversation,
    loadingConversationId,
    replyingConversationId,
    error,
    dispatch,
  } = useChatStore()

  useEffect(() => {
    if (!conversationId) return
    let isActive = true
    const activeConversationId = conversationId

    async function loadMessages() {
      dispatch({ type: 'LOAD_START', conversationId: activeConversationId })
      try {
        const loaded = await messagesService.list(activeConversationId)
        if (isActive) {
          dispatch({ type: 'LOAD_SUCCESS', conversationId: activeConversationId, messages: loaded })
        }
      } catch (err) {
        if (isActive) {
          dispatch({
            type: 'LOAD_ERROR',
            message: err instanceof Error ? err.message : 'Failed to load messages',
          })
        }
      }
    }

    void loadMessages()

    return () => {
      isActive = false
    }
  }, [conversationId, dispatch])

  const clearMessages = useCallback(async () => {
    if (!conversationId) return
    dispatch({ type: 'CLEAR_ERROR' })
    try {
      await messagesService.clear(conversationId)
      dispatch({ type: 'CLEAR_MESSAGES', conversationId })
    } catch (err) {
      dispatch({
        type: 'LOAD_ERROR',
        message: err instanceof Error ? err.message : 'Failed to clear messages',
      })
    }
  }, [conversationId, dispatch])

  return {
    messages: conversationId ? messagesByConversation[conversationId] ?? [] : [],
    isLoading: loadingConversationId === conversationId,
    isReplying: replyingConversationId === conversationId,
    error,
    clearMessages,
  }
}
