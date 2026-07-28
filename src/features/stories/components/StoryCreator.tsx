import { useState, useRef, useEffect } from 'react'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'

interface StoryCreatorProps {
  userName: string
  userAvatar: string | null
  onPublish: (content: string, backgroundColor: string) => void
  onClose: () => void
}

const COLORS = [
  '#1a1a2e', '#2d1b00', '#0d2137', '#1b2a1e',
  '#2e1616', '#1a2e3a', '#2a1e2e', '#1e2e1a',
]

export function StoryCreator({ userName, userAvatar, onPublish, onClose }: StoryCreatorProps) {
  const [content, setContent] = useState('')
  const [bgColor, setBgColor] = useState(COLORS[0])
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handlePublish = () => {
    if (!content.trim()) return
    onPublish(content.trim(), bgColor)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fade-in">
      <div
        className="relative w-full max-w-lg h-full max-h-[90vh] sm:h-[80vh] sm:rounded-2xl overflow-hidden flex flex-col"
        style={{ backgroundColor: bgColor }}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4">
          <button onClick={onClose} className="p-1 rounded-full text-white/80 hover:bg-white/10 cursor-pointer">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Button variant="primary" size="sm" onClick={handlePublish} disabled={!content.trim()}>
            Publish
          </Button>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <Avatar src={userAvatar} alt={userName} size="lg" />
          <p className="mt-2 text-sm text-white/70">{userName}</p>
          <textarea
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="mt-6 w-full bg-transparent text-white text-xl sm:text-2xl font-medium text-center leading-relaxed placeholder:text-white/30 focus:outline-none resize-none"
            rows={4}
            maxLength={280}
          />
          <span className="mt-2 text-xs text-white/40">{content.length}/280</span>
        </div>

        {/* Color picker */}
        <div className="absolute bottom-4 left-0 right-0 z-20 px-4">
          <div className="flex items-center justify-center gap-3">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setBgColor(color)}
                className={`h-8 w-8 rounded-full border-2 transition-all cursor-pointer ${
                  bgColor === color ? 'border-white scale-110' : 'border-white/30 hover:border-white/60'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
