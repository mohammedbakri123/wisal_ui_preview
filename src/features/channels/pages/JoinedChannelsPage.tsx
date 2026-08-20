import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Button } from '@/core/components/ui/Button'
import { PullToRefresh } from '@/core/components/ui/PullToRefresh'
import { ROUTES } from '@/core/utils/routes'
import { ChannelCard } from '../components/ChannelCard'
import { useChannels } from '../context/useChannels'

export default function JoinedChannelsPage() {
  const navigate = useNavigate()
  const { channels } = useChannels()
  const joined = channels.filter((channel) => channel.joined)
  const handleRefresh = async () => { await new Promise((resolve) => setTimeout(resolve, 500)) }
  return <div className="flex h-full flex-col bg-black text-[#e7e9ea]"><PullToRefresh onRefresh={handleRefresh} className="flex-1 overflow-hidden">{(setScrollRef) => <PageContainer ref={setScrollRef} className="mx-auto w-full max-w-4xl px-4 pt-5 pb-10 sm:px-6"><header className="flex items-start justify-between gap-4 border-b border-[#2f3336] pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1d9bf0]">Broadcasts</p><h1 className="mt-2 text-2xl font-bold">Joined channels</h1><p className="mt-2 max-w-lg text-sm leading-relaxed text-[#71767b]">Follow product, design, and engineering updates from the channels you care about.</p></div><Button size="sm" onClick={() => navigate(ROUTES.CHANNEL.DISCOVER)}>Discover</Button></header><section className="pt-6"><h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#71767b]">Your channels</h2><div className="grid gap-3 lg:grid-cols-2">{joined.map((channel) => <ChannelCard key={channel.id} channel={channel} />)}</div></section></PageContainer>}</PullToRefresh></div>
}
