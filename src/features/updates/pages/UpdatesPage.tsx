import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { PullToRefresh } from '@/core/components/ui/PullToRefresh'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { StoriesRow } from '@/features/stories/components/StoriesRow'
import { useStoriesContext } from '@/features/stories/context/useStoriesContext'
import { useChannels } from '@/features/channels/context/useChannels'
import { ChannelCard } from '@/features/channels/components/ChannelCard'
import { ROUTES } from '@/core/utils/routes'

export default function UpdatesPage() {
  const navigate = useNavigate()
  const { storyGroups } = useStoriesContext()
  const { channels } = useChannels()
  const joined = channels.filter((channel) => channel.joined)

  const handleRefresh = async () => { await new Promise((resolve) => setTimeout(resolve, 500)) }

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PullToRefresh onRefresh={handleRefresh} className="flex-1 overflow-hidden">
        {(setScrollRef) => (
          <PageContainer ref={setScrollRef} className="mx-auto w-full max-w-4xl px-4 pt-5 pb-10 sm:px-6">
            <header className="border-b border-[#2f3336] pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1d9bf0]">البقاء على اطلاع</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">التحديثات</h1>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#71767b]">الحالات والقنوات والمحتوى من شبكتك.</p>
            </header>

            {/* Status / Stories */}
            <section className="pt-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#71767b]">الحالات</h2>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c] p-4">
                <button type="button" onClick={() => navigate(ROUTES.STORY_CREATE)} className="flex w-full items-center gap-3 rounded-xl p-2 text-start transition-colors hover:bg-white/[0.03] cursor-pointer">
                  <Avatar alt="قصتك" size="sm" />
                  <span>
                    <span className="block text-sm font-bold">إضافة حالة</span>
                    <span className="mt-0.5 block text-xs text-[#71767b]">شارك صوراً ونصوصاً وفيديو</span>
                  </span>
                  <span className="ms-auto text-xl text-[#1d9bf0]">+</span>
                </button>
                {storyGroups.length > 0 && (
                  <div className="mt-2">
                    <StoriesRow
                      storyGroups={storyGroups}
                      onStoryPress={(userId) => navigate(`${ROUTES.STORY_VIEWER}?userId=${userId}`)}
                      onAddStory={() => navigate(ROUTES.STORY_CREATE)}
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Channels */}
            <section className="pt-7">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#71767b]">القنوات</h2>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => navigate(ROUTES.CHANNEL.CREATE)} className="text-xs font-bold text-[#1d9bf0] hover:underline cursor-pointer">
                    إنشاء قناة
                  </button>
                  <button type="button" onClick={() => navigate(ROUTES.CHANNEL.DISCOVER)} className="text-xs font-bold text-[#1d9bf0] hover:underline cursor-pointer">
                    اكتشف المزيد
                  </button>
                </div>
              </div>
              {joined.length ? (
                <div className="grid gap-3 lg:grid-cols-2">
                  {joined.map((channel) => (
                    <ChannelCard key={channel.id} channel={channel} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-8 text-center">
                  <p className="text-sm text-[#71767b]">لم تنضم إلى أي قناة بعد.</p>
                  <Button size="sm" className="mt-4" onClick={() => navigate(ROUTES.CHANNEL.DISCOVER)}>استكشاف القنوات</Button>
                </div>
              )}
            </section>
          </PageContainer>
        )}
      </PullToRefresh>
    </div>
  )
}