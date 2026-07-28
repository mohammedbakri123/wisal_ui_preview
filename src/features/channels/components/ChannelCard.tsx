import { useNavigate } from 'react-router'
import { Button } from '@/core/components/ui/Button'
import { Avatar } from '@/core/components/ui/Avatar'
import { channels } from '../data'

interface ChannelCardProps {
  channel: (typeof channels)[number]
  discover?: boolean
}

export function ChannelCard({ channel, discover = false }: ChannelCardProps) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(discover ? `/channels/${channel.id}/details` : `/channels/${channel.id}`)
  }

  return (
    <article
      onClick={handleCardClick}
      className="flex items-center gap-3 rounded-xl border border-border-light/50 bg-surface p-3.5 cursor-pointer transition-all duration-150 hover:bg-surface-hover active:scale-[0.99]"
    >
      {/* Avatar with channel icon */}
      <div className="relative shrink-0">
        <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center ring-1 ring-border-light/50">
          <Avatar alt={channel.name} size="sm" className="rounded-xl!" />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent border-2 border-surface">
          <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.559 6.438V17.01a.472.472 0 00.707.405l4.037-2.48a.473.473 0 01.527 0l4.037 2.48a.472.472 0 00.707-.405V6.438a.472.472 0 00-.354-.457l-4.5-1a.473.473 0 01-.272 0l-4.5 1A.472.472 0 005.559 6.438z" />
          </svg>
        </span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold truncate">{channel.name}</span>
          {channel.verified && (
            <svg className="w-3.5 h-3.5 text-accent shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          )}
          <span className="text-[10px] text-muted-foreground/60 bg-muted/40 px-1.5 py-0.5 rounded-full">
            {channel.category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground/70 mt-0.5">
          {channel.subscribers} subscribers
        </p>
        {channel.joined && channel.lastPost && (
          <p className="text-xs text-muted-foreground/50 mt-1 line-clamp-1 italic">
            "{channel.lastPost}"
          </p>
        )}
      </div>

      {/* Action */}
      <div className="shrink-0">
        {channel.joined ? (
          channel.admin ? (
            <span className="text-[10px] text-muted-foreground/60 bg-muted/30 px-2.5 py-1 rounded-full">Admin</span>
          ) : (
            <Button size="sm" variant="secondary" className="text-xs px-3 py-1 h-auto rounded-full"
              onClick={(e) => { e.stopPropagation(); navigate(`/channels/${channel.id}`); }}>
              Open
            </Button>
          )
        ) : (
          <Button size="sm" variant="primary" className="text-xs px-3 py-1 h-auto rounded-full"
            onClick={(e) => { e.stopPropagation(); navigate(discover ? `/channels/${channel.id}/details` : `/channels/${channel.id}`); }}>
            {discover ? 'Preview' : 'Join'}
          </Button>
        )}
      </div>
    </article>
  )
}
