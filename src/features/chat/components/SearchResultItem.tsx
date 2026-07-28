import { useNavigate } from 'react-router'
import type { Conversation } from '@/core/types'
import { Avatar } from '@/core/components/ui/Avatar'

interface SearchResultItemProps {
  conversation: Conversation
  snippet?: string
}

export function SearchResultItem({ conversation, snippet }: SearchResultItemProps) {
  const navigate = useNavigate()
  const path = conversation.type === 'group' ? `/home/g/${conversation.id}` : `/home/c/${conversation.id}`

  return (
    <button
      type="button"
      onClick={() => navigate(path)}
      className="group flex w-full items-center gap-3.5 p-3.5 sm:p-4 text-left hover:bg-surface/30 transition-all duration-200"
    >
      <div className="relative shrink-0">
        <Avatar src={conversation.avatar} alt={conversation.name} size="sm" online={conversation.type === 'direct'} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">{conversation.name}</p>
          <span className="rounded-full bg-muted/50 px-2 py-0.5 text-[9px] font-semibold uppercase text-muted-foreground/60 tracking-wider">
            {conversation.type}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground/50">{snippet ?? conversation.lastMessage}</p>
      </div>
      <svg className="h-4 w-4 text-muted-foreground/15 group-hover:text-muted-foreground/40 transition-colors shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
      </svg>
    </button>
  )
}
