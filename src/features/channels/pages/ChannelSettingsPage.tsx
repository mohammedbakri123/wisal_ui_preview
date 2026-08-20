import { useState } from 'react'
import { useParams } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { useChannels } from '../context/useChannels'

export default function ChannelSettingsPage() {
  const { channelId } = useParams()
  const { channels } = useChannels()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]
  const [adminPosting, setAdminPosting] = useState(true)
  const [reactions, setReactions] = useState(true)
  const [replies, setReplies] = useState(false)
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState(channel.name)
  const [description, setDescription] = useState(channel.description)

  return <div className="flex h-full flex-col bg-black text-[#e7e9ea]"><PageContainer className="w-full px-4 pt-3 pb-8"><div className="mx-auto max-w-2xl"><BackButton to={`/channels/${channel.id}/details`} /><header className="mb-6 mt-2"><p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">{channel.name}</p><h1 className="mt-1 text-2xl font-bold">إعدادات القناة</h1><p className="mt-2 text-sm leading-relaxed text-[#71767b]">إدارة هوية القناة وصلاحيات النشر وسلوك التفاعل.</p></header><section className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-4"><h2 className="text-[15px] font-bold">هوية القناة</h2><label className="mt-4 block text-xs font-bold text-[#71767b]">الاسم<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0]" /></label><label className="mt-4 block text-xs font-bold text-[#71767b]">الوصف<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} className="mt-2 w-full resize-none rounded-xl border border-[#2f3336] bg-[#202327] p-3 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0]" /></label><Button size="sm" className="mt-4" onClick={() => setSaved(true)}>{saved ? 'تم الحفظ' : 'حفظ التغييرات'}</Button></section><section className="mt-6 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]"><ToggleRow label="النشر للمشرفين فقط" description="يمكن للمالكين والمشرفين فقط نشر التحديثات." checked={adminPosting} onChange={setAdminPosting} /><ToggleRow label="التفاعلات" description="السماح للمشتركين بالتفاعل مع منشورات القناة." checked={reactions} onChange={setReactions} /><ToggleRow label="الردود والتعليقات" description="السماح بالردود المتسلسلة تحت منشورات القناة." checked={replies} onChange={setReplies} /></section><section className="mt-6 rounded-2xl border border-[#f4212e]/30 bg-[#f4212e]/[0.04] p-4"><p className="text-sm font-bold text-[#f4212e]">حذف القناة</p><p className="mt-1 text-xs leading-relaxed text-[#71767b]">إزالة المنشورات والمشتركين والتحليلات بشكل دائم. هذا الإجراء المدمر محمي في النموذج الأولي.</p><Button size="sm" variant="danger" className="mt-3" disabled>حذف القناة</Button></section></div></PageContainer></div>
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) { return <div className="flex items-center justify-between gap-4 border-b border-[#2f3336] p-4 last:border-b-0"><div className="min-w-0"><p className="text-sm font-bold">{label}</p><p className="mt-1 text-xs leading-relaxed text-[#71767b]">{description}</p></div><Toggle checked={checked} onChange={onChange} label={label} /></div> }
