import { useNavigate } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { channels } from '../data'

interface ChannelCardProps { channel: (typeof channels)[number]; discover?: boolean }

export function ChannelCard({ channel, discover = false }: ChannelCardProps) {
  const navigate = useNavigate()
  const destination = discover ? `/channels/${channel.id}/details` : `/channels/${channel.id}`
  return <article onClick={() => navigate(destination)} className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-[#2f3336] bg-[#16181c] p-4 transition-colors hover:bg-white/[0.03]"><Avatar alt={channel.name} size="lg" /><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h3 className="truncate text-[15px] font-bold text-[#e7e9ea]">{channel.name}</h3>{channel.verified && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1d9bf0] text-[10px] font-bold text-white">✓</span>}</div><p className="mt-1 text-xs text-[#71767b]">{channel.category} · {channel.subscribers} subscribers</p>{channel.joined && channel.lastPost && <p className="mt-2 line-clamp-1 text-xs text-[#71767b]">{channel.lastPost}</p>}</div><div className="shrink-0">{channel.joined ? channel.admin ? <span className="rounded-full bg-[#1d9bf0]/10 px-2.5 py-1 text-[10px] font-bold text-[#1d9bf0]">Admin</span> : <Button size="sm" variant="secondary" onClick={(event) => { event.stopPropagation(); navigate(destination) }}>Open</Button> : <Button size="sm" onClick={(event) => { event.stopPropagation(); navigate(destination) }}>{discover ? 'Preview' : 'Join'}</Button>}</div></article>
}
