import { useState, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { EmptyState } from '@/core/components/ui/EmptyState'
import { Spinner } from '@/core/components/ui/Spinner'
import { Sheet } from '@/core/components/ui/Sheet'
import { ROUTES } from '@/core/utils/routes'
import { useAuth } from '@/app/providers/AuthProvider'
import { mockConversations } from '@/mocks/data/conversations'
import { ConversationDetailsPanel } from '../components/ConversationDetailsPanel'
import { MessageInput } from '../components/MessageInput'
import { MessageList } from '../components/MessageList'
import { useMessages } from '../hooks/useMessages'
import { useRealtimeMessages } from '../hooks/useRealtimeMessages'
import { useSendMessage } from '../hooks/useSendMessage'

export default function ConversationPage() {
  const { conversationId, groupId } = useParams<{ conversationId?: string; groupId?: string }>()
  const activeConversationId = conversationId ?? groupId
  const navigate = useNavigate()
  const { user: currentUser } = useAuth()
  const [showDetails, setShowDetails] = useState(false)
  const [mutedByConversation, setMutedByConversation] = useState<Record<string, boolean>>({})
  const [blockedByConversation, setBlockedByConversation] = useState<Record<string, boolean>>({})
  const [swipeTranslate, setSwipeTranslate] = useState(0)
  const swipeStartRef = useRef(0)
  const swipeTranslateRef = useRef(0)
  const isSwipingRef = useRef(false)

  const conversation = mockConversations.find((item) => item.id === activeConversationId)
  const { messages, isLoading, isReplying, error, clearMessages } = useMessages(conversation)
  const sendMessage = useSendMessage(conversation, currentUser)
  useRealtimeMessages(conversation)
  const isMuted = conversation ? mutedByConversation[conversation.id] ?? conversation.isMuted : false
  const isBlocked = conversation ? blockedByConversation[conversation.id] ?? false : false

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.innerWidth >= 1024) return
    const touch = e.touches[0]
    if (touch.clientX < 40) {
      swipeStartRef.current = touch.clientX
      isSwipingRef.current = true
      swipeTranslateRef.current = 0
      setSwipeTranslate(0)
    }
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwipingRef.current) return
    const diff = e.touches[0].clientX - swipeStartRef.current
    if (diff > 0) {
      const val = Math.min(diff, 250)
      swipeTranslateRef.current = val
      setSwipeTranslate(val)
    }
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!isSwipingRef.current) return
    const didSwipe = swipeTranslateRef.current > 80
    isSwipingRef.current = false
    swipeTranslateRef.current = 0
    setSwipeTranslate(0)
    if (didSwipe) navigate(ROUTES.CHAT.LIST)
  }, [navigate])

  if (!activeConversationId) {
    return (
      <div className="flex h-full items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center bg-background p-6">
        <EmptyState
          title="Conversation not found"
          description="This chat may have been deleted or moved."
          action={<Button onClick={() => navigate(ROUTES.CHAT.LIST)}>Back to chats</Button>}
        />
      </div>
    )
  }

  return (
    <div className="relative flex h-full overflow-hidden bg-background">
      {/* Gradient orbs for atmosphere */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0ea583]/5 blur-[128px]" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#0ea583]/3 blur-[100px]" />
      </div>

      <div
        className="flex h-full min-w-0 flex-1 flex-col"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: swipeTranslate > 0 ? `translateX(${swipeTranslate}px)` : '',
          transition: swipeTranslate > 0 ? 'none' : 'transform 0.3s ease-out',
          opacity: swipeTranslate > 0 ? 1 - (swipeTranslate / 300) : 1,
        }}
      >
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.04] bg-background/80 px-4 backdrop-blur-xl">
          {/* Mobile back */}
          <button
            type="button"
            onClick={() => navigate(ROUTES.CHAT.LIST)}
            className="-ml-1 flex items-center gap-1 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground lg:hidden cursor-pointer"
            title="Back to chats"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 0 1-.02 1.06L8.83 10l3.94 3.71a.75.75 0 1 1-1.04 1.08l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 0 1 1.06.02Z" clipRule="evenodd" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="flex min-w-0 flex-1 items-center gap-3 text-left transition-opacity hover:opacity-85"
          >
            <Avatar src={conversation.avatar} alt={conversation.name} size="sm" online={conversation.type === 'direct'} />
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-sm font-semibold">{conversation.name}</h1>
              <p className="truncate text-xs text-muted-foreground/70">
                {conversation.type === 'direct'
                  ? isMuted ? 'Notifications muted' : 'Online'
                  : `${conversation.members.length || 0} members`}
              </p>
            </div>
          </button>

          <button
            type="button"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground cursor-pointer"
            title="Search in conversation"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground cursor-pointer"
            title="Conversation details"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
          </button>
        </header>

        <main className="relative flex-1 overflow-y-auto chat-bg scrollbar-thin">
          <div className="relative z-10 h-full px-4 py-2">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <Spinner size="lg" />
              </div>
            ) : (
              <MessageList
                conversation={conversation}
                currentUserId={currentUser?.id}
                messages={messages}
                isReplying={isReplying}
              />
            )}
          </div>
        </main>

        <footer className="shrink-0 border-t border-white/[0.04] bg-background/80 px-3 py-2.5 backdrop-blur-xl">
          {error && <p className="mb-1.5 text-center text-[11px] text-destructive">{error}</p>}
          <MessageInput disabled={isBlocked} onSend={sendMessage} />
        </footer>
      </div>

      <Sheet open={showDetails} onClose={() => setShowDetails(false)} title="Conversation details">
        <ConversationDetailsPanel
          conversation={conversation}
          isMuted={isMuted}
          isBlocked={isBlocked}
          onMutedChange={(value) => {
            setMutedByConversation((current) => ({ ...current, [conversation.id]: value }))
          }}
          onBlockedChange={(value) => {
            setBlockedByConversation((current) => ({ ...current, [conversation.id]: value }))
          }}
          onClearMessages={clearMessages}
          onClose={() => setShowDetails(false)}
        />
      </Sheet>
    </div>
  )
}
