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
      className="group flex w-full items-center gap-3.5 px-4 py-3.5 text-left border-b border-[#2f3336] hover:bg-white/[0.03] active:bg-white/[0.06] transition-colors cursor-pointer"
    >
      <div className="relative shrink-0">
        <Avatar src={conversation.avatar} alt={conversation.name} size="md" online={conversation.type === 'direct'} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[15px] font-bold text-[#e7e9ea] group-hover:text-[#1d9bf0] transition-colors">
            {conversation.name}
          </p>
          <span className="rounded-full bg-[#202327] px-2 py-0.5 text-[10px] font-bold uppercase text-[#71767b] tracking-wider">
            {conversation.type}
          </span>
        </div>
        <p className="mt-0.5 truncate text-[13px] text-[#71767b]">
          {snippet ?? conversation.lastMessage}
        </p>
      </div>
      <svg className="h-4 w-4 text-[#71767b] shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
      </svg>
    </button>
  )
}
