import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import type { Conversation } from '@/core/types'
import { ChatListItem } from './ChatListItem'
import { EmptyState } from '@/core/components/ui/EmptyState'
import { Button } from '@/core/components/ui/Button'
import { PullToRefresh } from '@/core/components/ui/PullToRefresh'
import { ROUTES } from '@/core/utils/routes'
import { removeMockConversation, updateMockConversation } from '../hooks/useConversations'

interface ChatListProps {
  conversations: Conversation[]
  isLoading?: boolean
  onRefresh?: () => Promise<void> | void
}

export function ChatList({ conversations, isLoading, onRefresh }: ChatListProps) {
  const navigate = useNavigate()
  const [chatList, setChatList] = useState<Conversation[]>([])
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current || !isLoading) {
      setChatList(conversations)
      initialized.current = true
    }
  }, [conversations, isLoading])

  const isEffectivelyPinned = (c: Conversation) => c.isPinned

  const handleTogglePin = (id: string) => {
    const chat = chatList.find((conversation) => conversation.id === id)
    if (!chat) return
    updateMockConversation(id, { isPinned: !isEffectivelyPinned(chat) })
  }

  const handleArchive = (id: string) => {
    const chat = chatList.find((c) => c.id === id)
    if (chat && isEffectivelyPinned(chat)) return
    updateMockConversation(id, { isMuted: true })
    setChatList((prev) => prev.filter((c) => c.id !== id))
  }

  const handleDelete = (id: string) => {
    const chat = chatList.find((c) => c.id === id)
    if (chat && isEffectivelyPinned(chat)) return
    removeMockConversation(id)
    setChatList((prev) => prev.filter((c) => c.id !== id))
  }

  const handleMarkRead = (id: string) => {
    updateMockConversation(id, { unreadCount: 0 })
    setChatList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)),
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col divide-y divide-[#2f3336]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3.5 animate-pulse bg-transparent">
            <div className="h-10 w-10 rounded-full bg-[#202327]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[#202327] rounded-full w-1/3" />
              <div className="h-3.5 bg-[#202327] rounded-full w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (chatList.length === 0) {
    return (
      <EmptyState
        title="مرحباً بك في صندوق الوارد!"
        description="ابدأ محادثة، شارك المنشورات والمزيد عبر محادثات خاصة بينك وبين الآخرين على وصال."
        action={
          <Button variant="primary" size="md" onClick={() => navigate(ROUTES.CHAT.ADD)}>
            Write a message
          </Button>
        }
      />
    )
  }

  const pinned = chatList.filter((c) => isEffectivelyPinned(c))
  const unpinned = chatList.filter((c) => !isEffectivelyPinned(c))

  return (
    <PullToRefresh onRefresh={onRefresh ?? (() => {})}>
      {(setScrollRef) => (
        <div ref={setScrollRef} className="flex flex-col bg-black">
          {pinned.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#71767b] border-b border-[#2f3336] bg-[#16181c]/40">
                الرسائل المثبتة
              </div>
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
            </div>
          )}

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

          {/* Archived Link row */}
          <button
            onClick={() => navigate(ROUTES.CHAT.ARCHIVED)}
            className="flex items-center gap-3 px-4 py-3.5 text-start transition-colors cursor-pointer hover:bg-white/[0.03] border-b border-[#2f3336] text-[#71767b] hover:text-[#e7e9ea]"
          >
            <div className="w-10 h-10 rounded-full bg-[#202327] flex items-center justify-center text-[#71767b]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <span className="text-[15px] font-bold">الرسائل المؤرشفة</span>
          </button>
        </div>
      )}
    </PullToRefresh>
  )
}
