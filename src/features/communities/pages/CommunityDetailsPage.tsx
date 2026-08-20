import { useNavigate, useParams } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'
import { channels as allChannels } from '@/features/channels/data'
import { useCommunities } from '../context/useCommunities'

export default function CommunityDetailsPage() {
  const navigate = useNavigate()
  const { communityId } = useParams()
  const { communities, joinCommunity, leaveCommunity } = useCommunities()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]

  const groupCount = community.groupList?.length ?? 0
  const channelIds = community.channelIds ?? []
  const communityChannels = allChannels.filter((channel) => channelIds.includes(channel.id))

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PageContainer className="w-full px-4 pt-3 pb-10">
        <div className="mx-auto max-w-2xl">
          <BackButton to={ROUTES.COMMUNITY.ROOT} />

          {/* Community card */}
          <section className="mt-2 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
            <div className="border-b border-[#2f3336] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">المجتمع</p>
              <div className="mt-2 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="text-[22px] font-bold tracking-tight text-[#e7e9ea]">{community.name}</h1>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#71767b]">{community.description}</p>
                </div>
                {community.verified && (
                  <svg className="mt-1 h-6 w-6 shrink-0 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {community.joined ? (
                  <Button size="sm" onClick={() => navigate(`/communities/${community.id}/overview`)}>دخول</Button>
                ) : (
                  <Button size="sm" onClick={() => joinCommunity(community.id)}>انضمام</Button>
                )}
                {community.owner && (
                  <Button size="sm" variant="secondary" onClick={() => navigate(ROUTES.COMMUNITY.MANAGE.replace(':communityId', community.id))}>
                    إدارة المجتمع
                  </Button>
                )}
                <Button size="sm" variant="secondary" onClick={() => navigate(`/communities/${community.id}/about`)}>
                  حول
                </Button>
                {community.joined && (
                  <Button size="sm" variant="danger" onClick={() => leaveCommunity(community.id)}>
                    مغادرة
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-[#2f3336]">
              {[
                { label: 'الأعضاء', value: community.members },
                { label: 'المجموعات', value: String(groupCount) },
                { label: 'القنوات', value: String(communityChannels.length) },
              ].map((stat) => (
                <div key={stat.label} className="p-4 text-center">
                  <p className="text-[12px] font-medium text-[#71767b]">{stat.label}</p>
                  <p className="mt-0.5 text-lg font-bold text-[#e7e9ea] tabular-nums">{stat.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Nested groups */}
          <section className="mt-6">
            <div className="mb-2 flex items-center justify-between px-1">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#71767b]">المجموعات</h3>
              <button type="button" onClick={() => navigate(`/communities/${community.id}/groups`)} className="text-xs font-bold text-[#1d9bf0] hover:underline cursor-pointer">
                عرض الكل
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
              {groupCount === 0 ? (
                <p className="p-4 text-sm text-[#71767b]">لا توجد مجموعات بعد في هذا المجتمع.</p>
              ) : (
                community.groupList.slice(0, 4).map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => navigate(`/home/g/${group.id}`)}
                    className="flex w-full items-center gap-3 border-b border-[#2f3336] p-3.5 text-start transition-colors last:border-b-0 hover:bg-white/[0.03] cursor-pointer"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#202327] text-[#e7e9ea]">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-bold text-[#e7e9ea]">{group.name}</span>
                      <span className="mt-0.5 block truncate text-xs text-[#71767b]">{group.members} عضو · {group.lastMessage}</span>
                    </span>
                    {group.isMuted && <span className="shrink-0 text-xs text-[#71767b]">مكتوم</span>}
                    <svg className="h-4 w-4 shrink-0 text-[#71767b] rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ))
              )}
            </div>
          </section>

          {/* Nested channels */}
          <section className="mt-6">
            <div className="mb-2 flex items-center justify-between px-1">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#71767b]">القنوات</h3>
              <button type="button" onClick={() => navigate(`/communities/${community.id}/channels`)} className="text-xs font-bold text-[#1d9bf0] hover:underline cursor-pointer">
                عرض الكل
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
              {communityChannels.length === 0 ? (
                <p className="p-4 text-sm text-[#71767b]">لا توجد قنوات بعد في هذا المجتمع.</p>
              ) : (
                communityChannels.map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => navigate(`/channels/${channel.id}`)}
                    className="flex w-full items-center gap-3 border-b border-[#2f3336] p-3.5 text-start transition-colors last:border-b-0 hover:bg-white/[0.03] cursor-pointer"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1d9bf0]/15 text-[#1d9bf0]">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-bold text-[#e7e9ea]">{channel.name}</span>
                      <span className="mt-0.5 block truncate text-xs text-[#71767b]">{channel.category} · {channel.subscribers} مشترك</span>
                    </span>
                    <svg className="h-4 w-4 shrink-0 text-[#71767b] rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ))
              )}
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  )
}