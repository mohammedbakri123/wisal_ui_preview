import { useState, useRef, useEffect } from 'react'
import type { Message } from '@/core/types'

const EMOJIS = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','🥰','😘','😗','😙','😚','🙂','🤗','🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','😳','🤪','😵','😡','😠','🤬','👍','👎','👊','✊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✌️','🤟','🤘','👌','💪','❤️','🧡','💛','💚','💙','💜','🖤','💔','💖','💫','⭐','🌟','✨','🔥','💯','🎉','🎊','🎈','🎁','🎀','🕊️','💀','👋','🖐️','✋','👌','🤌']

interface MessageInputProps {
  disabled?: boolean
  onSend: (content: string, type?: Message['type']) => void
}

export function MessageInput({ disabled = false, onSend }: MessageInputProps) {
  const [value, setValue] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea (like WhatsApp/Telegram)
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [value])

  const sendText = () => {
    if (!value.trim()) return
    onSend(value.trim())
    setValue('')
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
    textareaRef.current?.focus()
  }

  const insertEmoji = (emoji: string) => {
    setValue((prev) => prev + emoji)
    textareaRef.current?.focus()
  }

  if (disabled) {
    return (
      <div className="rounded-xl bg-compose-bg border border-border-light/50 py-2.5 text-center text-xs text-muted-foreground/70">
        You've blocked this contact. Unblock in details to send messages.
      </div>
    )
  }

  return (
    <div className="flex items-end gap-1.5 relative">
      {/* Emoji picker button */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className={`rounded-full p-2 transition-all cursor-pointer ${
            showEmoji ? 'text-accent bg-accent/10' : 'text-muted-foreground/60 hover:text-foreground'
          }`}
          title="Emoji"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
          </svg>
        </button>

        {showEmoji && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setShowEmoji(false)} />
            <div className="absolute bottom-12 left-0 z-40 w-[280px] sm:w-[320px] max-h-48 bg-surface border border-border-light/60 rounded-2xl shadow-2xl p-3 overflow-y-auto animate-slide-up">
              <div className="flex flex-wrap gap-1">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => insertEmoji(emoji)}
                    className="w-9 h-9 flex items-center justify-center text-lg hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Input field - auto-resizing textarea like WhatsApp */}
      <div className="flex min-h-[40px] flex-1 items-end rounded-xl bg-compose-bg border border-border-light/40 px-3 py-2 focus-within:border-accent/30 transition-colors">
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
          placeholder="Type a message"
          rows={1}
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none resize-none max-h-[120px] leading-5"
        />
      </div>

      {/* Send / Voice button */}
      {value.trim() ? (
        <button
          type="button"
          onClick={sendText}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm shadow-accent/20 transition-all hover:bg-accent/90 active:scale-90 cursor-pointer animate-scale-in"
          title="Send"
        >
          <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground/50 hover:text-foreground transition-all cursor-pointer"
          title="Voice message"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
          </svg>
        </button>
      )}
    </div>
  )
}
