import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Button } from '@/core/components/ui/Button'
import { PullToRefresh } from '@/core/components/ui/PullToRefresh'
import { ROUTES } from '@/core/utils/routes'
import { CommunityCard } from '../components/CommunityCard'
import { useCommunities } from '../context/useCommunities'

export default function JoinedCommunitiesPage() {
  const navigate = useNavigate()
  const { communities } = useCommunities()
  const joined = communities.filter((community) => community.joined)

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    await Promise.resolve()
  }

  return <div className="flex h-full flex-col bg-black text-[#e7e9ea]"><PullToRefresh onRefresh={handleRefresh} className="flex-1 overflow-hidden">{(setScrollRef) => <PageContainer ref={setScrollRef} className="mx-auto w-full max-w-4xl px-4 pt-5 pb-10 sm:px-6"><header className="border-b border-[#2f3336] pb-5"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1d9bf0]">Workspaces</p><h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Communities</h1><p className="mt-2 max-w-lg text-sm leading-relaxed text-[#71767b]">Focused spaces with dedicated groups, broadcast channels, and shared guidelines.</p></div><Button size="sm" onClick={() => navigate(ROUTES.COMMUNITY.CREATE)}>Create</Button></div></header><section className="pt-6"><div className="mb-3 flex items-center justify-between"><h2 className="text-xs font-bold uppercase tracking-wider text-[#71767b]">Joined communities</h2><button type="button" onClick={() => navigate(ROUTES.COMMUNITY.DISCOVER)} className="text-xs font-bold text-[#1d9bf0] hover:underline cursor-pointer">Discover</button></div>{joined.length ? <div className="grid gap-3 lg:grid-cols-2">{joined.map((community) => <CommunityCard key={community.id} community={community} />)}</div> : <div className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-8 text-center"><p className="text-sm text-[#71767b]">No communities joined yet.</p><Button size="sm" className="mt-4" onClick={() => navigate(ROUTES.COMMUNITY.DISCOVER)}>Discover communities</Button></div>}</section></PageContainer>}</PullToRefresh></div>
}
