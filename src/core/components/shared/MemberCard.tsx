import { Avatar } from '@/core/components/ui/Avatar'
import type { User } from '@/core/types'

interface MemberCardProps {
  user: User
  role?: string
  onClick?: () => void
}

export function MemberCard({ user, role = 'Member', onClick }: MemberCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-border-light/50 bg-surface p-3 text-start transition-all duration-150 enabled:hover:bg-surface-hover disabled:cursor-default"
    >
      <Avatar src={user.avatar} alt={user.name} size="sm" online={user.isOnline} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{user.name}</p>
        <p className="truncate text-xs text-muted-foreground/70">{user.bio ?? user.email ?? user.phone}</p>
      </div>
      <span className="rounded-full bg-muted/50 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground border border-border-light/30">
        {role}
      </span>
    </button>
  )
}
