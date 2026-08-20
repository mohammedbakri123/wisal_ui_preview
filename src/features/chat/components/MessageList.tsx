import { useEffect, useMemo, useRef, useState } from 'react'
import { Avatar } from '@/core/components/ui/Avatar'
import type { Conversation, Message } from '@/core/types'
import { MessageBubble } from './MessageBubble'
import { messagesService } from '../services/messages.service'
import { useChatStore } from '../store/ChatStore'
import { useTheme } from '@/app/providers/ThemeProvider'

interface MessageListProps {
  conversation: Conversation
  currentUserId: string | undefined
  messages: Message[]
  isReplying: boolean
  onReply: (message: Message) => void
  highlightMessageId?: string
  onOpenMember?: (member: Message['sender']) => void
}

export function MessageList({ conversation, currentUserId, messages, isReplying, onReply, highlightMessageId, onOpenMember }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null)
  const [windowSize, setWindowSize] = useState(60)
  const { dispatch } = useChatStore()
  const { chatBackground } = useTheme()
  const hiddenCount = Math.max(messages.length - windowSize, 0)
  const visibleMessages = useMemo(() => messages.slice(-windowSize), [messages, windowSize])

  const updateMessages = async (action: () => Promise<Message[]>) => {
    try {
      dispatch({ type: 'UPSERT_MESSAGES', conversationId: conversation.id, messages: await action() })
    } catch (error) {
      dispatch({ type: 'LOAD_ERROR', message: error instanceof Error ? error.message : 'فشلت العملية على الرسالة' })
    }
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isReplying])

  useEffect(() => {
    if (!highlightMessageId) return
    const target = document.querySelector(`[data-message-id="${highlightMessageId}"]`)
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [highlightMessageId, visibleMessages])

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center bg-black">
        <Avatar src={conversation.avatar} alt={conversation.name} size="xl" verified verifiedType="blue" />
        <h2 className="mt-4 text-[20px] font-bold text-[#e7e9ea]">{conversation.name}</h2>
        <p className="mt-1 max-w-xs text-[15px] text-[#71767b]">
          الرسائل الخاصة مشفرة من طرف إلى طرف على وصال.
        </p>
      </div>
    )
  }

  return (
    <div className={`chat-background-${chatBackground} flex min-h-full flex-col justify-end gap-3 p-4`}>
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setWindowSize((current) => current + 60)}
          className="self-center rounded-full border border-[#2f3336] bg-[#16181c] px-4 py-1.5 text-xs font-bold text-[#71767b] hover:text-[#e7e9ea] hover:bg-[#202327] transition-colors cursor-pointer"
        >
          تحميل {Math.min(60, hiddenCount)} رسائل سابقة
        </button>
      )}

      {hiddenCount > 0 && (
        <div style={{ height: Math.min(hiddenCount * 72, 480) }} aria-hidden="true" />
      )}

      {visibleMessages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          conversation={conversation}
          highlighted={message.id === highlightMessageId}
          isOwn={message.sender.id === currentUserId || (!currentUserId && message.sender.id === '1')}
          replyTo={message.replyTo ? messages.find((candidate) => candidate.id === message.replyTo) : null}
          onReply={onReply}
          onEdit={(target, content) => void updateMessages(() => messagesService.edit(conversation.id, target.id, content))}
          onDelete={(target) => void updateMessages(() => messagesService.remove(conversation.id, target.id))}
          onTogglePin={(target) => void updateMessages(() => messagesService.togglePinned(conversation.id, target.id))}
          onOpenMember={onOpenMember}
        />
      ))}

      {isReplying && (
        <div className="flex max-w-[86%] items-end gap-2 self-start">
          <Avatar src={conversation.avatar} alt={conversation.name} size="xs" />
          <div className="rounded-2xl rounded-bl-sm border border-[#2f3336] bg-[#16181c] px-4 py-3">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#1d9bf0] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#1d9bf0] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#1d9bf0] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  )
}
