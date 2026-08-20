import { useNavigate } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import type { Community } from '../context/communities-context'

function GroupIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  )
}

interface CommunityTabSectionProps {
  community: Community
  onOpen: (communityId: string) => void
}

export function CommunityTabSection({ community, onOpen }: CommunityTabSectionProps) {
  const navigate = useNavigate()
  const groups = community.groupList ?? []
  const recentGroups = groups.slice(0, 4)

  const openGroups = () => {
    onOpen(community.id)
    navigate(`/communities/${community.id}/groups`)
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
      {/* Community header */}
      <div className="flex items-center gap-3 border-b border-[#2f3336] p-3.5">
        <button
          type="button"
          onClick={() => onOpen(community.id)}
          className="flex min-w-0 flex-1 items-center gap-3 text-start cursor-pointer"
        >
          <Avatar alt={community.name} size="md" shape="square" className="shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5">
              <span className="truncate text-[15px] font-bold text-[#e7e9ea]">{community.name}</span>
              {community.verified && (
                <svg className="h-4 w-4 shrink-0 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            <span className="mt-0.5 block truncate text-xs text-[#71767b]">
              {community.members} أعضاء · {groups.length} مجموعات
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={openGroups}
          aria-label="عرض كل مجموعات المجتمع"
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[#2f3336] px-3 text-xs font-bold text-[#1d9bf0] transition-colors hover:bg-white/[0.03] cursor-pointer"
        >
          عرض الكل
          <svg className="h-3.5 w-3.5 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Recent group chats */}
      {recentGroups.length > 0 ? (
        <div className="flex flex-col">
          {recentGroups.map((group, index) => (
            <button
              key={group.id}
              type="button"
              onClick={() => navigate(`/home/g/${group.id}`)}
              className={`flex w-full items-center gap-3 p-3.5 text-start transition-colors hover:bg-white/[0.03] cursor-pointer ${index < recentGroups.length - 1 ? 'border-b border-[#2f3336]/60' : ''}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#202327] text-[#e7e9ea]">
                <GroupIcon />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-semibold text-[#e7e9ea]">{group.name}</span>
                <span className="mt-0.5 block truncate text-[13px] text-[#71767b]">{group.lastMessage}</span>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="px-4 py-4 text-sm text-[#71767b]">لا توجد مجموعات بعد في هذا المجتمع.</p>
      )}
    </article>
  )
}