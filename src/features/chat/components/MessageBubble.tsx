import { useState } from 'react'
import { Avatar } from '@/core/components/ui/Avatar'
import { formatMessageTime } from '@/core/utils/formatters'
import type { Conversation, Message } from '@/core/types'
import { cn } from '@/core/utils/cn'
import { useTheme } from '@/app/providers/ThemeProvider'

interface MessageBubbleProps {
  message: Message
  conversation: Conversation
  isOwn: boolean
  replyTo?: Message | null
  onReply?: (message: Message) => void
  onEdit?: (message: Message, content: string) => void
  onDelete?: (message: Message) => void
  onTogglePin?: (message: Message) => void
  highlighted?: boolean
  onOpenMember?: (member: Message['sender']) => void
}

export function MessageBubble({ message, conversation, isOwn, replyTo, onReply, onEdit, onDelete, onTogglePin, highlighted = false, onOpenMember }: MessageBubbleProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(message.content)
  const { bubbleStyle, chatFontSize } = useTheme()
  const bubbleShape = bubbleStyle === 'sharp' ? 'rounded-none' : bubbleStyle === 'compact' ? 'rounded-lg' : 'rounded-[18px]'
  const fontClass = chatFontSize === 'small' ? 'text-[13px]' : chatFontSize === 'large' ? 'text-[17px]' : 'text-[15px]'

  if (message.type === 'system' || message.sender.id === 'system') {
    return (
      <div className="flex justify-center py-2 animate-fade-in">
        <span className="rounded-full bg-[#16181c] px-3.5 py-1 text-xs font-medium text-[#71767b] border border-[#2f3336]">{message.content}</span>
      </div>
    )
  }

  const saveEdit = () => {
    if (!draft.trim()) return
    onEdit?.(message, draft)
    setEditing(false)
  }

  return (
    <div data-message-id={message.id} className={cn('group flex max-w-[80%] items-end gap-2 animate-message-in transition-[filter,opacity]', isOwn ? 'self-end flex-row-reverse' : 'self-start', highlighted && 'rounded-2xl ring-2 ring-[#1d9bf0] ring-offset-4 ring-offset-black')}>
      {!isOwn && <div className="mb-1 shrink-0 self-end">{conversation.type !== 'direct' && onOpenMember ? <button type="button" onClick={() => onOpenMember(message.sender)} className="rounded-full cursor-pointer hover:ring-2 hover:ring-[#1d9bf0]/50"><Avatar src={message.sender.avatar} alt={message.sender.name} size="xs" /></button> : <Avatar src={message.sender.avatar} alt={message.sender.name} size="xs" />}</div>}

      <div className="flex min-w-0 flex-col">
        {!isOwn && conversation.type !== 'direct' && (onOpenMember ? <button type="button" onClick={() => onOpenMember(message.sender)} className="mb-1 ml-1 w-fit text-xs font-bold text-[#1d9bf0] hover:underline cursor-pointer">{message.sender.name}</button> : <span className="mb-1 ml-1 text-xs font-bold text-[#1d9bf0]">{message.sender.name}</span>)}

        <div className="relative">
          <div className={cn(
            `relative px-4 py-2.5 ${fontClass} leading-relaxed`,
            isOwn ? `${bubbleShape} rounded-br-[4px] bg-[#1d9bf0] text-white` : `${bubbleShape} rounded-bl-[4px] border border-[#2f3336] bg-[#16181c] text-[#e7e9ea]`,
            message.type === 'image' && 'p-2', message.type === 'file' && 'p-2.5',
          )}>
            {replyTo && (
              <div className={cn('mb-2 border-l-2 border-white/50 pl-2 text-xs', isOwn ? 'text-white/75' : 'text-[#71767b]')}>
                <p className="font-bold">Reply</p><p className="truncate">{replyTo.content}</p>
              </div>
            )}

            {editing ? (
              <div className="min-w-[220px]">
                <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={2} autoFocus className="w-full resize-none rounded-lg bg-black/20 p-2 text-sm text-current outline-none ring-1 ring-white/40" />
                <div className="mt-2 flex justify-end gap-2 text-xs font-bold">
                  <button type="button" onClick={() => { setDraft(message.content); setEditing(false) }} className="cursor-pointer text-white/70 hover:text-white">Cancel</button>
                  <button type="button" onClick={saveEdit} className="cursor-pointer text-white hover:underline">Save</button>
                </div>
              </div>
            ) : (
              <MessageContent message={message} />
            )}

            <div className="mt-1 flex items-center justify-end gap-1.5">
              {message.isPinned && <span className={cn('text-[10px]', isOwn ? 'text-white/80' : 'text-[#1d9bf0]')} title="Pinned message">📌</span>}
              <span className={cn('text-[11px] tabular-nums', isOwn ? 'text-white/70' : 'text-[#71767b]')}>{formatMessageTime(message.createdAt)}</span>
              {message.isEdited && <span className={cn('text-[10px]', isOwn ? 'text-white/60' : 'text-[#71767b]')}>edited</span>}
              {isOwn && <svg className="h-3.5 w-3.5 text-white/80" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>}
            </div>

            {message.reactions.length > 0 && <div className={cn('absolute -bottom-2.5 flex items-center gap-1 rounded-full border border-[#2f3336] bg-[#16181c] px-2 py-0.5 text-xs shadow-md', isOwn ? 'right-2' : 'left-2')}>
              {message.reactions.map((reaction) => <span key={reaction.emoji} className="flex items-center gap-0.5"><span>{reaction.emoji}</span>{reaction.count > 1 && <span className="text-[10px] font-bold text-[#71767b]">{reaction.count}</span>}</span>)}
            </div>}
          </div>

          <button type="button" onClick={() => setMenuOpen((open) => !open)} className={cn('absolute top-1/2 z-10 -translate-y-1/2 rounded-full p-1.5 text-[#71767b] opacity-0 transition-opacity hover:bg-white/[0.08] hover:text-[#e7e9ea] group-hover:opacity-100 cursor-pointer', isOwn ? '-left-9' : '-right-9')} aria-label="Message actions">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" /></svg>
          </button>

          {menuOpen && <div className={cn('absolute top-7 z-30 w-40 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c] py-1 shadow-xl', isOwn ? 'right-full mr-2' : 'left-full ml-2')}>
            {onReply && <ActionButton label="Reply" onClick={() => { onReply(message); setMenuOpen(false) }} />}
            {onTogglePin && <ActionButton label={message.isPinned ? 'Unpin message' : 'Pin message'} onClick={() => { onTogglePin(message); setMenuOpen(false) }} />}
            {isOwn && onEdit && <ActionButton label="Edit message" onClick={() => { setEditing(true); setMenuOpen(false) }} />}
            {isOwn && onDelete && <ActionButton label="Delete message" danger onClick={() => { onDelete(message); setMenuOpen(false) }} />}
          </div>}
        </div>
      </div>
    </div>
  )
}

function ActionButton({ label, onClick, danger = false }: { label: string; onClick: () => void; danger?: boolean }) {
  return <button type="button" onClick={onClick} className={cn('block w-full px-3 py-2 text-left text-xs font-bold hover:bg-white/[0.04] cursor-pointer', danger ? 'text-[#f4212e]' : 'text-[#e7e9ea]')}>{label}</button>
}

function MessageContent({ message }: { message: Message }) {
  if (message.type === 'image') return <div className="space-y-2"><div className="flex aspect-video w-64 max-w-full items-center justify-center rounded-xl border border-white/10 bg-black/40"><svg className="h-10 w-10 text-[#71767b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.16-5.16a2.25 2.25 0 0 1 3.18 0l5.16 5.16m-1.5-1.5 1.41-1.41a2.25 2.25 0 0 1 3.18 0l2.91 2.91M3.75 19.5h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" /></svg></div><p className="px-1 text-xs text-[#71767b]">{message.content}</p></div>
  if (message.type === 'file') return <div className="flex w-64 max-w-full items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-2.5"><div className="rounded-lg bg-[#1d9bf0]/20 p-2 text-[#1d9bf0]"><span className="text-sm font-bold">DOC</span></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{message.content}</p><span className="text-xs text-[#71767b]">Document</span></div></div>
  return <p className="break-words leading-relaxed">{message.content}</p>
}
