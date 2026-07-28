/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react'
import type { Message } from '@/core/types'

interface ChatState {
  messagesByConversation: Record<string, Message[]>
  loadingConversationId: string | null
  replyingConversationId: string | null
  error: string | null
}

type ChatAction =
  | { type: 'LOAD_START'; conversationId: string }
  | { type: 'LOAD_SUCCESS'; conversationId: string; messages: Message[] }
  | { type: 'LOAD_ERROR'; message: string }
  | { type: 'SET_REPLYING'; conversationId: string | null }
  | { type: 'UPSERT_MESSAGES'; conversationId: string; messages: Message[] }
  | { type: 'APPEND_MESSAGE'; conversationId: string; message: Message }
  | { type: 'CLEAR_MESSAGES'; conversationId: string }
  | { type: 'CLEAR_ERROR' }

const initialState: ChatState = {
  messagesByConversation: {},
  loadingConversationId: null,
  replyingConversationId: null,
  error: null,
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loadingConversationId: action.conversationId, error: null }
    case 'LOAD_SUCCESS':
      return {
        ...state,
        loadingConversationId: null,
        messagesByConversation: {
          ...state.messagesByConversation,
          [action.conversationId]: action.messages,
        },
      }
    case 'LOAD_ERROR':
      return { ...state, loadingConversationId: null, replyingConversationId: null, error: action.message }
    case 'SET_REPLYING':
      return { ...state, replyingConversationId: action.conversationId }
    case 'UPSERT_MESSAGES':
      return {
        ...state,
        error: null,
        messagesByConversation: {
          ...state.messagesByConversation,
          [action.conversationId]: action.messages,
        },
      }
    case 'APPEND_MESSAGE': {
      const current = state.messagesByConversation[action.conversationId] ?? []
      if (current.some((message) => message.id === action.message.id)) return state

      return {
        ...state,
        messagesByConversation: {
          ...state.messagesByConversation,
          [action.conversationId]: [...current, action.message],
        },
      }
    }
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messagesByConversation: {
          ...state.messagesByConversation,
          [action.conversationId]: [],
        },
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

interface ChatContextValue extends ChatState {
  dispatch: React.Dispatch<ChatAction>
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)
  const value = useMemo(() => ({ ...state, dispatch }), [state])

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChatStore() {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChatStore must be used within ChatStoreProvider')
  return context
}
