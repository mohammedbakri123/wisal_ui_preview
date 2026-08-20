import { useState, useRef, useEffect } from 'react'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'

interface StoryCreatorProps {
  userName: string
  userAvatar: string | null
  onPublish: (content: string, backgroundColor: string, type: 'text' | 'image' | 'video', mediaUrl: string, privacy: 'contacts' | 'contacts-except' | 'only-share-with') => void
  onClose: () => void
}

const COLORS = [
  '#1a1a2e', '#2d1b00', '#0d2137', '#1b2a1e',
  '#2e1616', '#1a2e3a', '#2a1e2e', '#1e2e1a',
]

export function StoryCreator({ userName, userAvatar, onPublish, onClose }: StoryCreatorProps) {
  const [content, setContent] = useState('')
  const [bgColor, setBgColor] = useState(COLORS[0])
  const [type, setType] = useState<'text' | 'image' | 'video'>('text')
  const [mediaUrl, setMediaUrl] = useState('')
  const [privacy, setPrivacy] = useState<'contacts' | 'contacts-except' | 'only-share-with'>('contacts')
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
    const hasContent = content.trim() || mediaUrl.trim()
    if (!hasContent) return
    onPublish(content.trim() || `${type === 'image' ? 'Image' : 'Video'} story`, bgColor, type, mediaUrl.trim(), privacy)
    onClose()
  }

  const canPublish = Boolean(content.trim() || mediaUrl.trim())

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
          <Button variant="primary" size="sm" onClick={handlePublish} disabled={!canPublish}>
            Publish
          </Button>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <Avatar src={userAvatar} alt={userName} size="lg" />
          <p className="mt-2 text-sm text-white/70">{userName}</p>
          <div className="mt-5 flex rounded-full border border-white/15 bg-black/20 p-1 text-xs text-white/60">
            {(['text', 'image', 'video'] as const).map((option) => (
              <button key={option} type="button" onClick={() => setType(option)} className={`flex-1 rounded-full px-3 py-1.5 capitalize transition-colors ${type === option ? 'bg-white text-black' : 'hover:text-white'}`}>
                {option}
              </button>
            ))}
          </div>
          {type !== 'text' && (
            <input value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} placeholder={`${type === 'image' ? 'Image' : 'Video'} URL (optional)`} className="mt-4 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none" />
          )}
          {type === 'image' && mediaUrl && <img src={mediaUrl} alt="Story preview" className="mt-6 max-h-44 max-w-full rounded-xl object-contain" />}
          {type === 'video' && mediaUrl && <video src={mediaUrl} autoPlay muted loop playsInline className="mt-6 max-h-44 max-w-full rounded-xl object-contain" />}
          <textarea
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={type === 'text' ? "What's on your mind?" : 'Add a caption (optional)'}
            className="mt-6 w-full bg-transparent text-white text-xl sm:text-2xl font-medium text-center leading-relaxed placeholder:text-white/30 focus:outline-none resize-none"
            rows={4}
            maxLength={280}
          />
          <span className="mt-2 text-xs text-white/40">{content.length}/280</span>
          <label className="mt-5 flex items-center gap-2 text-xs text-white/65">
            Who can see this?
            <select value={privacy} onChange={(e) => setPrivacy(e.target.value as typeof privacy)} className="rounded-lg border border-white/15 bg-black/30 px-2 py-1 text-white focus:outline-none">
              <option value="contacts">Contacts</option>
              <option value="contacts-except">Contacts except…</option>
              <option value="only-share-with">Only share with…</option>
            </select>
          </label>
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
