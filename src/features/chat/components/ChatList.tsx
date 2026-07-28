import { useEffect, useState, useRef } from 'react'
import type { Conversation } from '@/core/types'
import { ChatListItem } from './ChatListItem'
import { EmptyState } from '@/core/components/ui/EmptyState'
import { Button } from '@/core/components/ui/Button'
import { PullToRefresh } from '@/core/components/ui/PullToRefresh'
import { ROUTES } from '@/core/utils/routes'
import { useNavigate } from 'react-router'

interface ChatListProps {
  conversations: Conversation[]
  isLoading?: boolean
  onRefresh?: () => Promise<void> | void
}

export function ChatList({ conversations, isLoading, onRefresh }: ChatListProps) {
  const navigate = useNavigate()
  const [chatList, setChatList] = useState<Conversation[]>([])
  const [pinning, setPinning] = useState<string[]>([])
  const initialized = useRef(false)

  // Sync with prop on initial load or when conversations change externally
  useEffect(() => {
    if (!initialized.current || !isLoading) {
      setChatList(conversations)
      initialized.current = true
    }
  }, [conversations, isLoading])

  // Helper: a chat is effectively pinned if its toggle state flips the original
  const isEffectivelyPinned = (c: Conversation) =>
    pinning.includes(c.id) ? !c.isPinned : c.isPinned

  const handleTogglePin = (id: string) => {
    setPinning((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    )
  }

  const handleArchive = (id: string) => {
    const chat = chatList.find((c) => c.id === id)
    if (chat && isEffectivelyPinned(chat)) return // Pinned chats cannot be archived
    setChatList((prev) => prev.filter((c) => c.id !== id))
  }

  const handleDelete = (id: string) => {
    const chat = chatList.find((c) => c.id === id)
    if (chat && isEffectivelyPinned(chat)) return // Pinned chats cannot be deleted
    setChatList((prev) => prev.filter((c) => c.id !== id))
  }

  const handleMarkRead = (id: string) => {
    // Toggle unread count to 0 for this conversation
    // In a real app this would call an API
    setChatList((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, unreadCount: 0 } : c,
      ),
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3.5 animate-pulse border-b border-border-light/30">
            <div className="h-10 w-10 rounded-full bg-muted/60" />
            <div className="flex-1 space-y-2.5">
              <div className="h-3.5 bg-muted/50 rounded w-1/3" />
              <div className="h-3 bg-muted/30 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (chatList.length === 0) {
    return (
      <EmptyState
        title="No conversations yet"
        description="Start chatting with someone or join a group to begin"
        action={
          <Button variant="primary" size="sm" onClick={() => navigate(ROUTES.CHAT.ADD)}>
            New conversation
          </Button>
        }
      />
    )
  }

  // Separate pinned and unpinned using effective pinned state
  const pinned = chatList.filter((c) => isEffectivelyPinned(c))
  const unpinned = chatList.filter((c) => !isEffectivelyPinned(c))

  return (
    <PullToRefresh onRefresh={onRefresh ?? (() => {})}>
      {(setScrollRef) => (
        <div ref={setScrollRef} className="flex flex-col">
          {pinned.length > 0 && (
            <>
              {pinned.map((conversation) => (
                <ChatListItem
                  key={conversation.id}
                  conversation={conversation}
                  onTogglePin={handleTogglePin}
                  onArchive={handleArchive}
                  onDelete={handleDelete}
                  onMarkRead={handleMarkRead}
                />
              ))}
            </>
          )}
          {unpinned.length > 0 && (
            <>
              {unpinned.map((conversation) => (
                <ChatListItem
                  key={conversation.id}
                  conversation={conversation}
                  onTogglePin={handleTogglePin}
                  onArchive={handleArchive}
                  onDelete={handleDelete}
                  onMarkRead={handleMarkRead}
                />
              ))}
            </>
          )}

          {/* Archived link at bottom */}
          <button
            onClick={() => navigate(ROUTES.CHAT.ARCHIVED)}
            className="flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-150 cursor-pointer hover:bg-surface-hover border-b border-border-light/30"
          >
            <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center">
              <svg className="h-4.5 w-4.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-muted-foreground">Archived chats</span>
          </button>
        </div>
      )}
    </PullToRefresh>
  )
}
