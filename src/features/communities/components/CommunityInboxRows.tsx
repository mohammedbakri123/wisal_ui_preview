import { Avatar } from '@/core/components/ui/Avatar'
import { cn } from '@/core/utils/cn'
import { useCommunities } from '../context/useCommunities'

interface CommunityInboxRowsProps {
  onOpen: (communityId: string) => void
}

function GroupBadgeIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  )
}

export function CommunityInboxRows({ onOpen }: CommunityInboxRowsProps) {
  const { communities } = useCommunities()
  const joined = communities.filter((community) => community.joined)
  if (joined.length === 0) return null

  return (
    <div className="flex flex-col">
      {joined.map((community) => {
        const groupCount = community.groupList?.length ?? 0
        const hasUnread = (community.unreadCount ?? 0) > 0
        const subtitle = community.lastMessage ?? `${community.members} أعضاء · ${groupCount} مجموعات`

        return (
          <div key={community.id} className="border-b border-[#2f3336]">
            <button
              type="button"
              onClick={() => onOpen(community.id)}
              className="group w-full flex items-center gap-3 px-4 py-3.5 text-start transition-colors cursor-pointer bg-transparent hover:bg-white/[0.03] active:bg-white/[0.06]"
            >
              <Avatar alt={community.name} size="md" shape="square" className="shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="shrink-0 text-[#71767b]">
                      <GroupBadgeIcon />
                    </span>
                    <span className={cn('text-[15px] truncate', hasUnread ? 'font-bold text-[#e7e9ea]' : 'font-semibold text-[#e7e9ea]')}>
                      {community.name}
                    </span>
                    {community.verified && (
                      <svg className="h-4 w-4 shrink-0 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13px] text-[#71767b] shrink-0 tabular-nums">{community.lastMessageTime ?? ''}</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <p className={cn('text-[15px] truncate flex-1', hasUnread ? 'text-[#e7e9ea] font-medium' : 'text-[#71767b]')}>
                    {subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {hasUnread && (
                      <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-bold text-white bg-[#1d9bf0] rounded-full tabular-nums">
                        {community.unreadCount > 99 ? '99+' : community.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          </div>
        )
      })}
    </div>
  )
}