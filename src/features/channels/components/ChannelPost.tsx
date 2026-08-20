import { useState } from 'react'

interface ChannelPostProps {
  title: string
  body: string
  meta?: string
  onReport?: () => void
}

export function ChannelPost({ title, body, meta = 'Live', onReport }: ChannelPostProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [replyOpen, setReplyOpen] = useState(false)
  const [reply, setReply] = useState('')
  const [replySent, setReplySent] = useState(false)

  const sendReply = () => {
    if (!reply.trim()) return
    setReplySent(true)
    setReply('')
    setReplyOpen(false)
  }

  return (
    <article className="feed-row px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#71767b]">Wisal Channel</p>
          <h3 className="mt-1 text-[15px] font-bold text-[#e7e9ea]">{title}</h3>
        </div>
        <span className="text-[11px] font-medium text-[#71767b]">
          {meta}
        </span>
      </div>
      <p className="mt-3 text-[15px] leading-6 text-[#e7e9ea]">{body}</p>
      <div className="mt-4 flex items-center gap-1 text-xs text-[#71767b]">
        <button type="button" onClick={() => setLiked((value) => !value)} className={`flex items-center gap-1.5 rounded-full px-2 py-1.5 transition-colors cursor-pointer ${liked ? 'bg-[#f91880]/10 text-[#f91880]' : 'hover:bg-[#f91880]/10 hover:text-[#f91880]'}`}>
          <span>♥</span><span>{liked ? 25 : 24}</span>
        </button>
        <button type="button" onClick={() => setReplyOpen((value) => !value)} className={`flex items-center gap-1.5 rounded-full px-2 py-1.5 transition-colors cursor-pointer ${replyOpen ? 'bg-[#1d9bf0]/10 text-[#1d9bf0]' : 'hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]'}`}><span>↩</span><span>{replySent ? 9 : 8}</span></button>
        <button type="button" onClick={() => setBookmarked((value) => !value)} className={`ml-auto rounded-full px-2 py-1.5 transition-colors cursor-pointer ${bookmarked ? 'bg-[#1d9bf0]/10 text-[#1d9bf0]' : 'hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]'}`} aria-label="Bookmark post">{bookmarked ? 'Saved' : 'Save'}</button>
        {onReport && <button type="button" onClick={onReport} className="rounded-full px-2 py-1.5 hover:bg-[#f4212e]/10 hover:text-[#f4212e] transition-colors cursor-pointer">Report</button>}
      </div>
      {replyOpen && <div className="mt-3 flex gap-2"><input value={reply} onChange={(event) => setReply(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') sendReply() }} autoFocus placeholder="Reply to this post" className="h-10 min-w-0 flex-1 rounded-full border border-[#2f3336] bg-[#202327] px-3 text-sm text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0]" /><button type="button" onClick={sendReply} disabled={!reply.trim()} className="rounded-full px-3 text-xs font-bold text-[#1d9bf0] hover:bg-[#1d9bf0]/10 disabled:opacity-40">Send</button></div>}
      {replySent && !replyOpen && <p className="mt-2 text-xs text-[#00ba7c]">Reply sent to this channel thread.</p>}
    </article>
  )
}
