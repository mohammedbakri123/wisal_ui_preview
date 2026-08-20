import { useNavigate } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { communities } from '../data'

interface CommunityCardProps {
  community: (typeof communities)[number]
  discover?: boolean
}

export function CommunityCard({ community, discover = false }: CommunityCardProps) {
  const navigate = useNavigate()
  const hasUnread = !discover && community.joined && (community.unreadCount ?? 0) > 0
  const destination = discover && !community.joined ? `/communities/join/${community.id}` : `/communities/${community.id}`

  return (
    <article onClick={() => navigate(destination)} className="group cursor-pointer overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c] transition-colors hover:bg-white/[0.03]">
      <div className="flex items-start gap-4 p-4 sm:p-5">
        <Avatar alt={community.name} size="lg" className="shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-[17px] font-bold text-[#e7e9ea]">{community.name}</h3>
            {community.verified && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1d9bf0] text-[10px] font-bold text-white" aria-label="موثق">✓</span>}
          </div>
          <p className="mt-1 text-xs text-[#71767b]">{community.category} · {community.members} أعضاء · {community.groups} مجموعات</p>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#71767b]">{!discover && community.joined && community.lastMessage ? community.lastMessage : community.description}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-[#71767b]">
            {hasUnread && <span className="rounded-full bg-[#1d9bf0]/15 px-2 py-1 font-bold text-[#1d9bf0]">{community.unreadCount} جديد</span>}
            {community.joined && community.lastMessageTime && <span>{community.lastMessageTime}</span>}
          </div>
        </div>
        <div className="shrink-0">
          {community.joined ? <span className="flex h-9 w-9 items-center justify-center rounded-full text-[#71767b] transition-colors group-hover:bg-[#1d9bf0]/10 group-hover:text-[#1d9bf0]" aria-hidden="true">→</span> : <Button size="sm" onClick={(event) => { event.stopPropagation(); navigate(`/communities/join/${community.id}`) }}>انضمام</Button>}
        </div>
      </div>
    </article>
  )
}
