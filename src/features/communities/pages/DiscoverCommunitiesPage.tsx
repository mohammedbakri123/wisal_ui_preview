import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { ROUTES } from '@/core/utils/routes'
import { CommunityCard } from '../components/CommunityCard'
import { useCommunities } from '../context/useCommunities'

export default function DiscoverCommunitiesPage() {
  const { communities } = useCommunities()
  return <div className="flex h-full flex-col bg-black text-[#e7e9ea]"><PageContainer className="w-full px-4 pt-3 pb-8 sm:px-6"><div className="mx-auto max-w-4xl"><BackButton to={ROUTES.COMMUNITY.ROOT} /><header className="mt-2 border-b border-[#2f3336] pb-5"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1d9bf0]">الدليل</p><h1 className="mt-2 text-2xl font-bold">استكشاف المجتمعات</h1><p className="mt-2 max-w-lg text-sm leading-relaxed text-[#71767b]">اعثر على المساحات العامة حسب الموضوع وعدد الأعضاء ومستوى النشاط.</p></header><section className="pt-6"><h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#71767b]">موصى به لك</h2><div className="grid gap-3 lg:grid-cols-2">{communities.map((community) => <CommunityCard key={community.id} community={community} discover />)}</div></section></div></PageContainer></div>
}
