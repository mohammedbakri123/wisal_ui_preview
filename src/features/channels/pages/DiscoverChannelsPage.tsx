import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'
import { ChannelCard } from '../components/ChannelCard'
import { useChannels } from '../context/useChannels'

export default function DiscoverChannelsPage() {
  const navigate = useNavigate()
  const { channels } = useChannels()
  return <div className="flex h-full flex-col bg-black text-[#e7e9ea]"><PageContainer className="w-full px-4 pt-3 pb-8 sm:px-6"><div className="mx-auto max-w-4xl"><BackButton to={ROUTES.CHANNEL.ROOT} /><header className="mt-2 flex items-start justify-between gap-4 border-b border-[#2f3336] pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1d9bf0]">الدليل</p><h1 className="mt-2 text-2xl font-bold">استكشاف القنوات</h1><p className="mt-2 max-w-lg text-sm leading-relaxed text-[#71767b]">تابع مساحات البث العامة للإعلانات والتحديثات.</p></div><Button size="sm" onClick={() => navigate(ROUTES.CHANNEL.CREATE)}>إنشاء</Button></header><section className="pt-6"><h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#71767b]">القنوات المميزة</h2><div className="grid gap-3 lg:grid-cols-2">{channels.map((channel) => <ChannelCard key={channel.id} channel={channel} discover />)}</div></section></div></PageContainer></div>
}
