import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { mockUsers } from '@/mocks/data/users'
import { useChannels } from '../context/useChannels'

export default function InviteMembersPage() {
  const { channelId } = useParams()
  const { channels } = useChannels()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]
  const [query, setQuery] = useState('')
  const [invited, setInvited] = useState<string[]>([])
  const [linkCopied, setLinkCopied] = useState(false)
  const results = useMemo(() => mockUsers.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()) || user.phone?.includes(query)), [query])
  const inviteLink = `https://wisaL.test/channels/${channel.id}/join`

  return <div className="flex h-full flex-col bg-black text-[#e7e9ea]"><PageContainer className="w-full px-4 pt-3 pb-8"><div className="mx-auto max-w-2xl"><BackButton to={`/channels/${channel.id}/details`} /><header className="mb-6 mt-2"><p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">{channel.name}</p><h1 className="mt-1 text-2xl font-bold">دعوة أعضاء</h1><p className="mt-2 text-sm leading-relaxed text-[#71767b]">قم بدعوة أشخاص من جهات اتصالك أو شارك رابطًا لجلب المشتركين إلى هذه القناة.</p></header><section className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-4"><h2 className="text-[15px] font-bold">الدعوة من جهات الاتصال</h2><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="البحث في جهات الاتصال" className="mt-3 h-11 w-full rounded-full border border-transparent bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:bg-black" /><div className="mt-3 overflow-hidden rounded-xl border border-[#2f3336]">{results.map((user) => { const isInvited = invited.includes(user.id); return <div key={user.id} className="flex items-center gap-3 border-b border-[#2f3336] p-3 last:border-b-0"><Avatar src={user.avatar} alt={user.name} size="sm" online={user.isOnline} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{user.name}</p><p className="text-xs text-[#71767b]">{user.phone}</p></div><Button size="sm" variant={isInvited ? 'secondary' : 'primary'} onClick={() => setInvited((current) => isInvited ? current.filter((id) => id !== user.id) : [...current, user.id])}>{isInvited ? 'تمت الدعوة' : 'دعوة'}</Button></div> })}{!results.length && <p className="p-5 text-center text-sm text-[#71767b]">{query ? 'لا توجد جهات اتصال مطابقة' : 'ابحث في جهات اتصالك لدعوة الأشخاص'}</p>}</div></section><section className="mt-6 rounded-2xl border border-[#2f3336] bg-[#16181c] p-4"><h2 className="text-[15px] font-bold">مشاركة رابط الدعوة</h2><div className="mt-3 flex flex-col gap-2 sm:flex-row"><code className="min-w-0 flex-1 truncate rounded-xl border border-[#2f3336] bg-[#202327] px-3 py-2.5 text-xs text-[#71767b]">{inviteLink}</code><Button size="sm" variant="secondary" onClick={() => setLinkCopied(true)}>{linkCopied ? 'تم النسخ' : 'نسخ الرابط'}</Button></div></section></div></PageContainer></div>
}
