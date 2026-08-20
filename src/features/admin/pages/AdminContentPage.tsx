import { useState } from 'react'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { ROUTES } from '@/core/utils/routes'

const areas = ['Channels', 'Groups', 'Communities']

export default function AdminContentPage() {
  const [area, setArea] = useState(areas[0])
  return <div className="flex h-full flex-col bg-black"><PageContainer className="w-full max-w-3xl px-3 pt-3 sm:px-5"><BackButton to={ROUTES.ADMIN.ROOT} label="Overview" /><div className="mt-3"><p className="text-xs font-bold uppercase tracking-wider text-[#71767b]">Platform content</p><h1 className="mt-1 text-2xl font-bold text-[#e7e9ea]">Content management</h1><p className="mt-1 text-sm text-[#71767b]">Review platform-owned spaces. Detailed moderation actions remain under decision.</p></div><div className="mt-5 flex gap-1 border-b border-[#2f3336]">{areas.map((item) => <button type="button" key={item} onClick={() => setArea(item)} className={`border-b-2 px-3 pb-3 text-sm font-bold cursor-pointer ${area === item ? 'border-[#1d9bf0] text-[#1d9bf0]' : 'border-transparent text-[#71767b]'}`}>{item}</button>)}</div><section className="mt-4 rounded-2xl border border-[#2f3336] bg-[#16181c] p-4"><p className="text-sm font-bold text-[#e7e9ea]">{area} review queue</p><p className="mt-2 text-sm leading-relaxed text-[#71767b]">No pending actions in this prototype. Audit log and destructive moderation controls are intentionally marked as undecided in the product specification.</p></section></PageContainer></div>
}
