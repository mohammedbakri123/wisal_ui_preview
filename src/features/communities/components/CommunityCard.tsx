import { useNavigate } from 'react-router'
import { Button } from '@/core/components/ui/Button'
import { Avatar } from '@/core/components/ui/Avatar'
import { cn } from '@/core/utils/cn'
import { communities } from '../data'

interface CommunityCardProps {
  community: (typeof communities)[number]
  discover?: boolean
}

const communityTheme: Record<string, { gradient: string; border: string; accent: string; badge: string }> = {
  'builders-hub': {
    gradient: 'from-amber-500/15 via-yellow-500/5 to-transparent',
    border: 'border-amber-500/20',
    accent: 'text-amber-400',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  },
  'design-guild': {
    gradient: 'from-violet-500/15 via-fuchsia-500/5 to-transparent',
    border: 'border-violet-500/20',
    accent: 'text-violet-400',
    badge: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
  },
  'startup-ops': {
    gradient: 'from-cyan-500/15 via-blue-500/5 to-transparent',
    border: 'border-cyan-500/20',
    accent: 'text-cyan-400',
    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  },
}

export function CommunityCard({ community, discover = false }: CommunityCardProps) {
  const navigate = useNavigate()
  const theme = communityTheme[community.id] ?? communityTheme['builders-hub']
  const hasUnread = !discover && community.joined && (community.unreadCount ?? 0) > 0

  const handleCardClick = () => {
    if (discover && !community.joined) {
      navigate(`/communities/join/${community.id}`)
    } else {
      navigate(`/communities/${community.id}`)
    }
  }

  return (
    <article
      onClick={handleCardClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer',
        theme.border,
        'bg-surface/30',
        'hover:scale-[1.005] hover:-translate-y-0.5 hover:shadow-lg',
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-90 transition-opacity duration-500',
          theme.gradient,
        )}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent animate-shimmer" />

      <div className="relative p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Avatar + info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', theme.badge)}>
                {community.category}
              </span>
              {community.joined && (
                <span className="text-[10px] text-muted-foreground/40 px-2 py-0.5 rounded-full border border-border-light/20">
                  Joined
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="shrink-0">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center border', theme.badge)}>
                  <Avatar alt={community.name} size="xs" className="rounded-lg!" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-lg leading-tight text-foreground truncate">
                    {community.name}
                  </h3>
                  {community.verified && (
                    <svg className="w-3.5 h-3.5 text-accent shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50 mt-0.5">
                  <span>{community.members} members</span>
                  <span className="text-muted-foreground/20">·</span>
                  <span>{community.groups} groups</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground/50 mt-2 line-clamp-2 leading-relaxed">
              {!discover && community.joined && community.lastMessage ? community.lastMessage : community.description}
            </p>

            {community.joined && community.lastMessage && (
              <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground/40">
                {hasUnread && (
                  <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[9px] font-bold text-white bg-accent rounded-full">
                    {community.unreadCount}
                  </span>
                )}
                <span>{community.lastMessageTime}</span>
              </div>
            )}
          </div>

          {/* Action */}
          <div className="shrink-0 pt-1">
            {community.joined ? (
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center border', theme.badge)}>
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ) : (
              <Button size="sm" variant="primary" className="text-xs px-3 py-1 h-auto rounded-full"
                onClick={(e) => { e.stopPropagation(); navigate(`/communities/join/${community.id}`); }}>
                Join
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
