import { useNavigate } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { Sheet } from '@/core/components/ui/Sheet'
import { ROUTES } from '@/core/utils/routes'
import { useCommunities } from '../context/useCommunities'

function MegaphoneIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
    </svg>
  )
}

function GroupIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  )
}

interface CommunityInfoDialogProps {
  communityId: string | null
  onClose: () => void
}

export function CommunityInfoDialog({ communityId, onClose }: CommunityInfoDialogProps) {
  const navigate = useNavigate()
  const { communities, joinCommunity, leaveCommunity } = useCommunities()
  const community = communities.find((item) => item.id === communityId) ?? null

  if (!community) return null

  const announcement = community.channels?.find((channel) => channel.isAnnouncement)
  const extraChannels = (community.channels ?? []).filter((channel) => !channel.isAnnouncement)
  const groups = community.groupList ?? []
  const groupCount = groups.length
  const canManage = community.owner

  const go = (path: string) => {
    onClose()
    navigate(path)
  }

  return (
    <Sheet open onClose={onClose} title="المجتمع">
      <div className="flex h-full flex-col gap-5">
        {/* Community header */}
        <section className="flex items-start gap-4">
          <Avatar alt={community.name} size="lg" shape="square" className="shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-[18px] font-bold text-[#e7e9ea]">{community.name}</h3>
              {community.verified && (
                <svg className="h-5 w-5 shrink-0 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[#71767b]">{community.description}</p>
          </div>
        </section>

        {/* Stats + actions */}
        <section className="grid grid-cols-3 divide-x divide-[#2f3336] overflow-hidden rounded-2xl border border-[#2f3336]">
          {[
            { label: 'الأعضاء', value: community.members },
            { label: 'المجموعات', value: String(groupCount) },
            { label: 'القنوات', value: String(community.channels?.length ?? 0) },
          ].map((stat) => (
            <div key={stat.label} className="p-4 text-center">
              <p className="text-lg font-bold text-[#e7e9ea] tabular-nums">{stat.value}</p>
              <p className="mt-0.5 text-[12px] font-medium text-[#71767b]">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap items-center gap-2">
          {community.joined ? (
            <>
              <Button size="sm" onClick={() => go(`/communities/${community.id}/overview`)}>دخول</Button>
              {canManage && (
                <Button size="sm" variant="secondary" onClick={() => go(ROUTES.COMMUNITY.MANAGE.replace(':communityId', community.id))}>
                  إدارة المجتمع
                </Button>
              )}
              <Button size="sm" variant="danger" onClick={() => leaveCommunity(community.id)}>مغادرة</Button>
            </>
          ) : (
            <Button size="sm" onClick={() => joinCommunity(community.id)}>انضمام</Button>
          )}
          <Button size="sm" variant="secondary" onClick={() => go(ROUTES.COMMUNITY.DETAILS.replace(':communityId', community.id))}>
            فتح صفحة المجتمع
          </Button>
        </section>

        {/* Announcement channel */}
        {announcement && (
          <section>
            <h4 className="mb-2 px-1 text-[13px] font-bold uppercase tracking-wider text-[#71767b]">قناة الإعلانات</h4>
            <button
              type="button"
              onClick={() => go(`/channels/${announcement.id}`)}
              className="flex w-full items-center gap-3 rounded-2xl border border-[#1d9bf0]/30 bg-[#16181c] p-3.5 text-start transition-colors hover:bg-white/[0.03] cursor-pointer"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1d9bf0]/15 text-[#1d9bf0]">
                <MegaphoneIcon />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-bold text-[#e7e9ea]">{announcement.name}</span>
                <span className="mt-0.5 block truncate text-xs text-[#71767b]">{announcement.lastPost}</span>
              </span>
              <svg className="h-4 w-4 shrink-0 text-[#71767b] rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </section>
        )}

        {/* Groups */}
        <section>
          <div className="mb-2 flex items-center justify-between px-1">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#71767b]">المجموعات</h4>
            {groupCount > 4 && (
              <button type="button" onClick={() => go(`/communities/${community.id}/groups`)} className="text-xs font-bold text-[#1d9bf0] hover:underline cursor-pointer">
                عرض الكل
              </button>
            )}
          </div>
          {groupCount === 0 ? (
            <p className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-4 text-sm text-[#71767b]">لا توجد مجموعات بعد في هذا المجتمع.</p>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
              {groups.slice(0, 4).map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => go(`/home/g/${group.id}`)}
                  className="flex w-full items-center gap-3 border-b border-[#2f3336] p-3.5 text-start transition-colors last:border-b-0 hover:bg-white/[0.03] cursor-pointer"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#202327] text-[#e7e9ea]">
                    <GroupIcon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-bold text-[#e7e9ea]">{group.name}</span>
                    <span className="mt-0.5 block truncate text-xs text-[#71767b]">{group.members} عضو · {group.lastMessage}</span>
                  </span>
                  <svg className="h-4 w-4 shrink-0 text-[#71767b] rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Extra channels */}
        {extraChannels.length > 0 && (
          <section>
            <h4 className="mb-2 px-1 text-[13px] font-bold uppercase tracking-wider text-[#71767b]">القنوات</h4>
            <div className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
              {extraChannels.slice(0, 4).map((channel) => (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => go(`/channels/${channel.id}`)}
                  className="flex w-full items-center gap-3 border-b border-[#2f3336] p-3.5 text-start transition-colors last:border-b-0 hover:bg-white/[0.03] cursor-pointer"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1d9bf0]/15 text-[#1d9bf0]">
                    <MegaphoneIcon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-bold text-[#e7e9ea]">{channel.name}</span>
                    <span className="mt-0.5 block truncate text-xs text-[#71767b]">{channel.subscribers} مشترك</span>
                  </span>
                  <svg className="h-4 w-4 shrink-0 text-[#71767b] rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </Sheet>
  )
}