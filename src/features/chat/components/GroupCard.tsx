import { useNavigate } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import type { Conversation } from '@/core/types'

interface GroupCardProps {
  group: Conversation
}

export function GroupCard({ group }: GroupCardProps) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(`/home/g/${group.id}`)}
      className="flex w-full items-center gap-3 rounded-lg border border-border/50 bg-surface p-4 text-left transition-colors hover:bg-surface-hover"
    >
      <Avatar src={group.avatar} alt={group.name} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{group.name}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{group.lastMessage}</p>
      </div>
      <span className="text-xs text-muted-foreground">{group.isMuted ? 'Muted' : 'Active'}</span>
    </button>
  )
}
