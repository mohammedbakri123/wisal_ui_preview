import { useEffect, useRef, useState } from 'react'
import { Avatar } from '@/core/components/ui/Avatar'
import type { StoryGroup } from '@/core/types/story'
import { cn } from '@/core/utils/cn'

interface StoryViewerProps {
  storyGroups: StoryGroup[]
  activeIndex: { groupIndex: number; storyIndex: number } | null
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  onMarkViewed: () => void
  onReact: (emoji: string) => void
  currentUserId?: string
  onReply?: (content: string) => void
  onDelete?: (storyId: string) => void
}

const STORY_DURATION = 5000
const EMOJI_REACTIONS = ['❤️', '🔥', '😂', '😮', '😢', '🙏']

export function StoryViewer({
  storyGroups,
  activeIndex,
  onNext,
  onPrev,
  onClose,
  onMarkViewed,
  onReact,
  currentUserId = '1',
  onReply,
  onDelete,
}: StoryViewerProps) {
  const [progress, setProgress] = useState(0)
  const [showReactions, setShowReactions] = useState(false)
  const [pause, setPause] = useState(false)
  const [reply, setReply] = useState('')
  const [showOwnerMenu, setShowOwnerMenu] = useState(false)
  const [showViewers, setShowViewers] = useState(false)
  const [muted, setMuted] = useState(true)
  const progressRef = useRef(0)
  const animFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const lastFrameTimeRef = useRef<number>(0)

  const groupIndex = activeIndex?.groupIndex ?? -1
  const storyIndex = activeIndex?.storyIndex ?? -1
  const group = activeIndex ? storyGroups[groupIndex] : undefined
  const story = group?.stories[storyIndex]

  // ALL useEffect hooks before any early return — follows Rules of Hooks
  useEffect(() => {
    if (!activeIndex) return
    progressRef.current = 0
    startTimeRef.current = 0
    lastFrameTimeRef.current = 0
    const frame = requestAnimationFrame(() => {
      setProgress(0)
      setShowReactions(false)
      setPause(false)
      setReply('')
      setShowOwnerMenu(false)
      setShowViewers(false)
      setMuted(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [activeIndex, groupIndex, storyIndex, story?.id])

  useEffect(() => {
    if (!activeIndex) return
    onMarkViewed()
  }, [activeIndex, story?.id, onMarkViewed])

  useEffect(() => {
    if (pause || !story || !activeIndex) return

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
        lastFrameTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const newProgress = Math.min((elapsed / STORY_DURATION) * 100, 100)
      progressRef.current = newProgress

      if (Math.abs(timestamp - lastFrameTimeRef.current) >= 32) {
        setProgress(newProgress)
        lastFrameTimeRef.current = timestamp
      }

      if (newProgress >= 100) {
        onNext()
        return
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [pause, story, groupIndex, storyIndex, activeIndex, onNext])

  useEffect(() => {
    if (!activeIndex) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex, onClose, onNext, onPrev])

  // Early returns are now safe — all hooks are above
  if (!activeIndex || !group || !story) return null

  const isOwner = story.userId === currentUserId
  const submitReply = () => {
    const message = reply.trim()
    if (!message) return
    onReply?.(message)
    setReply('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fade-in">
      {/* Story container */}
      <div
        className="relative w-full max-w-lg h-full max-h-[90vh] sm:h-[80vh] sm:rounded-2xl overflow-hidden flex flex-col"
        style={{ backgroundColor: story.backgroundColor ?? '#1a1a2e' }}
      >
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2">
          {group.stories.map((s, i) => (
            <div key={s.id} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full bg-white rounded-full transition-none',
                  i < storyIndex && 'w-full',
                  i === storyIndex && 'bg-white',
                  i > storyIndex && 'w-0',
                )}
                style={i === storyIndex ? { width: `${progress}%`, transition: 'width 0.1s linear' } : undefined}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-4 left-0 right-0 z-20 flex items-center gap-3 px-3 pt-1">
          <button onClick={onClose} className="p-1 rounded-full text-white/80 hover:bg-white/10 cursor-pointer">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Avatar src={story.userAvatar} alt={story.userName} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{story.userName}</p>
            <p className="text-[10px] text-white/60">
              {new Date(story.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <button
            onClick={() => setShowReactions(!showReactions)}
            className="p-2 rounded-full text-white/80 hover:bg-white/10 cursor-pointer"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </button>
          {isOwner && (
            <button onClick={() => setShowOwnerMenu((visible) => !visible)} className="p-2 rounded-full text-white/80 hover:bg-white/10 cursor-pointer" aria-label="Story options">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>
            </button>
          )}
        </div>

        {isOwner && showOwnerMenu && (
          <div className="absolute right-3 top-16 z-40 w-44 rounded-xl border border-white/15 bg-black/85 p-1 text-sm shadow-xl backdrop-blur-md">
            <button onClick={() => setShowViewers(true)} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-white/85 hover:bg-white/10">
              View viewers <span className="text-xs text-white/45">{story.viewedBy.length}</span>
            </button>
            <button onClick={() => { onDelete?.(story.id); onClose() }} className="w-full rounded-lg px-3 py-2 text-left text-red-300 hover:bg-red-500/15">
              Delete story
            </button>
          </div>
        )}

        {/* Tap areas for navigation */}
        <div
          className="absolute inset-0 z-10 flex"
          onMouseDown={() => setPause(true)}
          onMouseUp={() => setPause(false)}
          onTouchStart={() => setPause(true)}
          onTouchEnd={() => setPause(false)}
        >
          <div className="flex-1" onClick={(e) => { e.stopPropagation(); onPrev(); }} />
          <div className="flex-1" onClick={(e) => { e.stopPropagation(); onNext(); }} />
        </div>

        {/* Story content */}
        <div className="flex-1 flex items-center justify-center p-8 z-0">
          {story.type === 'text' && (
            <p className="text-white text-xl sm:text-2xl font-medium text-center leading-relaxed whitespace-pre-line">
              {story.content}
            </p>
          )}
          {story.type === 'image' && story.mediaUrl && (
            <img src={story.mediaUrl} alt="Story" className="max-w-full max-h-full object-contain rounded-lg" />
          )}
          {story.type === 'video' && story.mediaUrl && (
            <video src={story.mediaUrl} autoPlay playsInline muted={muted} className="max-h-full max-w-full rounded-lg object-contain" />
          )}
          {story.type !== 'text' && !story.mediaUrl && (
            <div className="rounded-2xl border border-white/15 bg-black/20 px-6 py-5 text-center text-sm text-white/60">
              {story.type === 'video' ? 'Video story' : 'Image story'}
              <p className="mt-1 text-xs text-white/35">Media preview unavailable</p>
            </div>
          )}
        </div>

        {/* Bottom: reply input */}
        <div className="absolute bottom-4 left-0 right-0 z-20 px-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white/10 rounded-full px-4 py-2.5 border border-white/20">
              <input
                type="text"
                placeholder="Send a message"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') submitReply() }}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
              <button onClick={submitReply} disabled={!reply.trim()} className="text-white/70 hover:text-white disabled:opacity-30 transition-colors cursor-pointer" aria-label="Send reply">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.48 2.4a.75.75 0 0 0-.93.94l2.43 7.91h8.52a.75.75 0 0 1 0 1.5H4.98l-2.43 7.9a.75.75 0 0 0 .93.95 60.52 60.52 0 0 0 18.44-8.99.75.75 0 0 0 0-1.22A60.52 60.52 0 0 0 3.48 2.4Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {story.type === 'video' && story.mediaUrl && (
          <button onClick={() => setMuted((value) => !value)} className="absolute bottom-20 right-4 z-30 rounded-full bg-black/45 p-2 text-white/80 hover:bg-black/70" aria-label={muted ? 'Unmute video' : 'Mute video'}>
            {muted ? '🔇' : '🔊'}
          </button>
        )}

        {showViewers && (
          <div className="absolute inset-x-4 top-20 z-40 rounded-2xl border border-white/15 bg-black/85 p-4 text-white shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div><p className="font-semibold">Story viewers</p><p className="text-xs text-white/45">{story.viewedBy.length} viewer{story.viewedBy.length === 1 ? '' : 's'}</p></div>
              <button onClick={() => setShowViewers(false)} className="rounded-full p-1 text-white/60 hover:bg-white/10">✕</button>
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              {story.viewedBy.length > 0 ? story.viewedBy.map((viewerId) => <div key={viewerId} className="rounded-lg bg-white/5 px-3 py-2">{viewerId === currentUserId ? 'You' : `Viewer ${viewerId}`}</div>) : <p className="text-white/45">No viewers yet.</p>}
            </div>
          </div>
        )}

        {/* Reactions panel */}
        {showReactions && (
          <div className="absolute bottom-20 left-0 right-0 z-30 animate-slide-up px-4">
            <div className="flex items-center justify-center gap-3 bg-black/60 backdrop-blur-md rounded-full px-4 py-3 border border-white/10">
              {EMOJI_REACTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => { onReact(emoji); setShowReactions(false); }}
                  className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Existing reactions */}
        {story.reactions.length > 0 && !showReactions && (
          <div className="absolute bottom-20 left-4 right-4 z-20 flex flex-wrap gap-2">
            {story.reactions.slice(-3).map((r, i) => (
              <span key={`${r.emoji}-${i}`} className="text-xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                {r.emoji}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
