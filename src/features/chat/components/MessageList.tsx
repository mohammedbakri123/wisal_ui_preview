import { useEffect, useMemo, useRef, useState } from 'react'
import { Avatar } from '@/core/components/ui/Avatar'
import type { Conversation, Message } from '@/core/types'
import { MessageBubble } from './MessageBubble'

interface MessageListProps {
  conversation: Conversation
  currentUserId: string | undefined
  messages: Message[]
  isReplying: boolean
}

export function MessageList({ conversation, currentUserId, messages, isReplying }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null)
  const [windowSize, setWindowSize] = useState(60)
  const hiddenCount = Math.max(messages.length - windowSize, 0)
  const visibleMessages = useMemo(() => messages.slice(-windowSize), [messages, windowSize])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isReplying])

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <Avatar src={conversation.avatar} alt={conversation.name} size="xl" />
        <h2 className="mt-4 text-lg font-semibold">{conversation.name}</h2>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Start the conversation with a message, file, or image.
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col justify-end gap-4">
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setWindowSize((current) => current + 60)}
          className="self-center rounded-full border border-border/50 bg-surface/90 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm hover:text-foreground"
        >
          Load {Math.min(60, hiddenCount)} earlier messages
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
          isOwn={message.sender.id === currentUserId || (!currentUserId && message.sender.id === '1')}
        />
      ))}

      {isReplying && (
        <div className="flex max-w-[86%] items-end gap-2 self-start">
          <Avatar src={conversation.avatar} alt={conversation.name} size="xs" />
          <div className="rounded-2xl rounded-bl-md border border-border/40 bg-surface px-3.5 py-3 shadow-sm">
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  )
}
