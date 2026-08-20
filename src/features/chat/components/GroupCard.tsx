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
      className="flex w-full items-center gap-3 border-b border-[#2f3336] bg-transparent p-4 text-start transition-colors hover:bg-white/[0.03] active:bg-white/[0.06] cursor-pointer"
    >
      <Avatar src={group.avatar} alt={group.name} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-bold text-[#e7e9ea]">{group.name}</p>
        <p className="mt-0.5 truncate text-[13px] text-[#71767b]">{group.lastMessage}</p>
      </div>
      <span className="text-xs text-[#71767b]">{group.isMuted ? 'مكتومة' : 'نشطة'}</span>
    </button>
  )
}
