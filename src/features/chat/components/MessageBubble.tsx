import { Avatar } from '@/core/components/ui/Avatar'
import { formatMessageTime } from '@/core/utils/formatters'
import type { Conversation, Message } from '@/core/types'
import { cn } from '@/core/utils/cn'

interface MessageBubbleProps {
  message: Message
  conversation: Conversation
  isOwn: boolean
}

export function MessageBubble({ message, conversation, isOwn }: MessageBubbleProps) {
  if (message.type === 'system' || message.sender.id === 'system') {
    return (
      <div className="flex justify-center py-2 animate-fade-in">
        <span className="rounded-full bg-white/5 backdrop-blur-sm px-4 py-1.5 text-[11px] font-medium text-muted-foreground/80 border border-white/5">
          {message.content}
        </span>
      </div>
    )
  }

  return (
    <div className={cn('flex max-w-[82%] items-end gap-1.5 animate-message-in', isOwn ? 'self-end flex-row-reverse' : 'self-start')}>
      {!isOwn && (
        <div className="shrink-0 self-end mb-1">
          <Avatar src={message.sender.avatar} alt={message.sender.name} size="xs" />
        </div>
      )}

      <div className="flex min-w-0 flex-col">
        {!isOwn && conversation.type !== 'direct' && (
          <span className="mb-0.5 ml-1 text-[10px] font-semibold text-accent">
            {message.sender.name}
          </span>
        )}

        <div
          className={cn(
            'group relative px-3 py-2 text-sm leading-relaxed shadow-sm',
            isOwn
              ? 'bubble-own text-white'
              : 'bubble-other text-foreground',
            message.type === 'image' ? 'p-1.5' : '',
            message.type === 'file' ? 'p-2' : '',
          )}
        >
          {message.type === 'image' && (
            <div className="space-y-1.5">
              <div className="flex aspect-video w-56 max-w-full items-center justify-center rounded-lg bg-black/20">
                <svg className="h-8 w-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.16-5.16a2.25 2.25 0 0 1 3.18 0l5.16 5.16m-1.5-1.5 1.41-1.41a2.25 2.25 0 0 1 3.18 0l2.91 2.91M3.75 19.5h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
                </svg>
              </div>
              <p className="px-1.5 text-xs italic opacity-75">{message.content}</p>
            </div>
          )}

          {message.type === 'file' && (
            <div className="flex w-64 max-w-full items-center gap-2.5 rounded-lg bg-black/15 p-2">
              <div className="rounded-lg bg-accent/20 p-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.63a3.38 3.38 0 0 0-3.38-3.37h-1.5a1.13 1.13 0 0 1-1.12-1.13v-1.5a3.38 3.38 0 0 0-3.38-3.37H5.63A1.13 1.13 0 0 0 4.5 3.38v17.25c0 .62.5 1.12 1.13 1.12h12.75c.62 0 1.12-.5 1.12-1.12v-6.38Z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{message.content}</p>
                <span className="text-[10px] opacity-60">Document</span>
              </div>
            </div>
          )}

          {message.type === 'text' && <p className="break-words leading-[1.45]">{message.content}</p>}

          {/* Timestamp and read status */}
          <div className="mt-0.5 flex items-center justify-end gap-1">
            <span className={cn('text-[9px] font-medium', isOwn ? 'text-white/60' : 'text-muted-foreground/60')}>
              {formatMessageTime(message.createdAt)}
            </span>
            {isOwn && (
              <svg className="h-3.5 w-3.5 text-white/50" viewBox="0 0 16 11" fill="currentColor">
                <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.337-.149.476.476 0 0 0-.343.14.477.477 0 0 0-.011.674l2.47 2.574a.475.475 0 0 0 .332.15h.021a.475.475 0 0 0 .346-.144l6.503-8.02a.48.48 0 0 0-.106-.69a.446.446 0 0 0-.02-.02z" />
                <path d="M14.917.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.063-1.107a.475.475 0 0 0-.663.68l1.423 1.483a.475.475 0 0 0 .687-.012l6.616-8.16a.48.48 0 0 0-.106-.69a.446.446 0 0 0-.02-.02z" />
              </svg>
            )}
          </div>

          {/* Reactions */}
          {message.reactions.length > 0 && (
            <div className={cn(
              'absolute -bottom-2 flex items-center gap-0.5 rounded-full border border-border-light bg-surface px-1.5 py-0.5 text-xs shadow-sm',
              isOwn ? 'right-1' : 'left-1',
            )}>
              {message.reactions.map((reaction) => (
                <span key={reaction.emoji} title={`${reaction.count} reactions`} className="flex items-center gap-0.5">
                  {reaction.emoji}
                  {reaction.count > 1 && <span className="text-[9px] font-semibold text-muted-foreground">{reaction.count}</span>}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
