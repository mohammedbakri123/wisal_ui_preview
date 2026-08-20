import { useState, useRef, useEffect } from 'react'
import type { Message, User } from '@/core/types'

const EMOJIS = [
  '😀','😂','😍','🥰','😎','🤔','👍','🔥','❤️','🎉','✨','🙏','👏','💯','🕊️','💪','🤩','🚀','🤝','😊',
  '😭','🥳','👀','🙌','✌️','👌','💡','📌','🖤','💔','⚡','🌟','☕','🍔','🍕','🍉','⚽','🎵','💎','👑'
]

interface MessageInputProps {
  disabled?: boolean
  initialValue?: string
  mentionUsers?: User[]
  onSend: (content: string, type?: Message['type'], replyTo?: string | null) => void
  replyingTo?: Message | null
  onCancelReply?: () => void
}

export function MessageInput({ disabled = false, initialValue = '', mentionUsers = [], onSend, replyingTo, onCancelReply }: MessageInputProps) {
  const [value, setValue] = useState(initialValue)
  const [showEmoji, setShowEmoji] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [value])

  const sendText = () => {
    if (!value.trim()) return
    onSend(value.trim(), 'text', replyingTo?.id ?? null)
    setValue('')
    onCancelReply?.()
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
    textareaRef.current?.focus()
  }

  const insertEmoji = (emoji: string) => {
    setValue((prev) => prev + emoji)
    textareaRef.current?.focus()
  }

  const mentionMatch = value.match(/(?:^|\s)@([^\s@]*)$/)
  const mentionQuery = mentionMatch?.[1].toLowerCase() ?? null
  const mentionSuggestions = mentionQuery === null
    ? []
    : mentionUsers.filter((user) => user.name.toLowerCase().replace(/\s+/g, '').startsWith(mentionQuery)).slice(0, 5)

  const insertMention = (user: User) => {
    const match = value.match(/(?:^|\s)@[^\s@]*$/)
    if (!match || match.index === undefined) return
    setValue(`${value.slice(0, match.index)}${match[0].startsWith(' ') ? ' ' : ''}@${user.name.replace(/\s+/g, '')} `)
    textareaRef.current?.focus()
  }

  if (disabled) {
    return (
      <div className="rounded-full bg-[#16181c] border border-[#2f3336] py-3 text-center text-xs font-bold text-[#71767b]">
        You cannot send messages to this conversation.
      </div>
    )
  }

  return (
    <div className="relative flex items-end gap-2 bg-black px-4 pb-3 pt-2 border-t border-[#2f3336]">
      {replyingTo && (
        <div className="absolute bottom-full left-0 right-0 flex items-center gap-3 border-t border-[#2f3336] bg-[#16181c] px-4 py-2">
          <div className="h-8 w-0.5 bg-[#1d9bf0]" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#1d9bf0]">Replying to {replyingTo.sender.name}</p>
            <p className="truncate text-xs text-[#71767b]">{replyingTo.content}</p>
          </div>
          <button type="button" onClick={onCancelReply} className="rounded-full p-1.5 text-[#71767b] hover:bg-white/[0.06] hover:text-[#e7e9ea] cursor-pointer" aria-label="Cancel reply">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}
      {/* Media Attach button */}
      <button
        type="button"
        onClick={() => onSend('Attached photo.jpg', 'image')}
        className="w-[34.75px] h-[34.75px] rounded-full flex items-center justify-center text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer shrink-0"
        title="Add photo or video"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.16-5.16a2.25 2.25 0 0 1 3.18 0l5.16 5.16m-1.5-1.5 1.41-1.41a2.25 2.25 0 0 1 3.18 0l2.91 2.91M3.75 19.5h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
        </svg>
      </button>

      {/* Emoji picker button */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className={`w-[34.75px] h-[34.75px] rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            showEmoji ? 'text-[#1d9bf0] bg-[#1d9bf0]/10' : 'text-[#1d9bf0] hover:bg-[#1d9bf0]/10'
          }`}
          title="Add emoji"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
          </svg>
        </button>

        {showEmoji && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setShowEmoji(false)} />
            <div className="absolute bottom-12 left-0 z-40 w-[280px] sm:w-[320px] max-h-48 bg-[#16181c] border border-[#2f3336] rounded-2xl shadow-2xl p-3 overflow-y-auto animate-dropdown-in">
              <div className="flex flex-wrap gap-1">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => insertEmoji(emoji)}
                    className="w-9 h-9 flex items-center justify-center text-lg hover:bg-white/[0.08] rounded-full transition-colors cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Input container */}
      <div className="relative flex min-h-[44px] flex-1 items-center rounded-2xl bg-[#202327] border border-transparent px-4 py-2 focus-within:border-[#1d9bf0] focus-within:bg-black transition-colors">
        {mentionSuggestions.length > 0 && (
          <div className="absolute bottom-full left-0 right-0 z-40 mb-2 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c] shadow-xl">
            {mentionSuggestions.map((user) => (
              <button key={user.id} type="button" onClick={() => insertMention(user)} className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-white/[0.04] cursor-pointer">
                <AvatarFallback user={user} />
                <span className="min-w-0"><span className="block truncate text-sm font-bold text-[#e7e9ea]">{user.name}</span><span className="block text-xs text-[#71767b]">Mention member</span></span>
              </button>
            ))}
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendText()
            }
          }}
          placeholder="Start a new message"
          rows={1}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-[#e7e9ea] placeholder:text-[#71767b] focus:outline-none resize-none max-h-[120px] leading-5"
        />
      </div>

      {/* Send Button */}
      <button
        type="button"
        disabled={!value.trim()}
        onClick={sendText}
        className={`w-[34.75px] h-[34.75px] rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
          value.trim()
            ? 'text-[#1d9bf0] hover:bg-[#1d9bf0]/10 active:scale-95'
            : 'text-[#71767b]/40 cursor-default'
        }`}
        title="Send"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.504 21.866l19.228-9.452a1 1 0 000-1.788L2.504 1.174a1 1 0 00-1.393 1.258l2.96 7.402a1 1 0 00.73.614l8.199 1.552-8.199 1.552a1 1 0 00-.73.614l-2.96 7.402a1 1 0 001.393 1.298z" />
        </svg>
      </button>
    </div>
  )
}

function AvatarFallback({ user }: { user: User }) {
  return <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d9bf0]/15 text-xs font-bold text-[#1d9bf0]">{user.name.slice(0, 1)}</div>
}
