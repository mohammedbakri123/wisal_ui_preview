import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { ROUTES } from '@/core/utils/routes'
import { useContacts } from '../context/useContacts'

export default function ContactsPage() {
  const navigate = useNavigate()
  const { contacts, removeContact } = useContacts()
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => contacts.filter((user) => `${user.name} ${user.phone ?? ''}`.toLowerCase().includes(query.toLowerCase())), [contacts, query])

  return <div className="flex h-full flex-col overflow-hidden bg-black text-[#e7e9ea]"><PageContainer className="w-full max-w-2xl px-3 pt-3 sm:px-4 sm:pt-4"><div className="flex items-end justify-between gap-4 border-b border-[#2f3336] pb-4"><div><p className="text-xs font-bold uppercase tracking-wider text-[#71767b]">الأشخاص</p><h1 className="mt-1 text-[20px] font-bold">جهات الاتصال</h1><p className="mt-1 text-[13px] text-[#71767b]">الأشخاص الذين يمكنك الوصول إليهم على وصال.</p></div><Button size="sm" onClick={() => navigate(ROUTES.CONTACTS.ADD)}>إضافة جهة اتصال</Button></div><div className="relative mt-4"><svg className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71767b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث في جهات الاتصال" className="h-11 w-full rounded-full border border-transparent bg-[#202327] ps-10 pe-4 text-[15px] text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:bg-black" /></div><div className="mt-4 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">{filtered.length ? filtered.map((user) => <div key={user.id} className="flex items-center gap-3 border-b border-[#2f3336] px-4 py-3 last:border-b-0"><Avatar src={user.avatar} alt={user.name} size="md" online={user.isOnline} /><button type="button" onClick={() => navigate(`/profile/${user.name.toLowerCase().replace(/\s+/g, '')}`)} className="min-w-0 flex-1 text-start cursor-pointer"><p className="truncate text-[15px] font-bold hover:underline">{user.name}</p><p className="mt-0.5 truncate text-xs text-[#71767b]">{user.phone ?? 'لا يوجد رقم هاتف'}{user.bio ? ` · ${user.bio}` : ''}</p></button><button type="button" onClick={() => removeContact(user.id)} className="rounded-full px-2.5 py-1.5 text-xs font-bold text-[#f4212e] hover:bg-[#f4212e]/10 cursor-pointer">إزالة</button></div>) : <div className="py-14 text-center text-sm text-[#71767b]">لم يتم العثور على جهات اتصال</div>}</div></PageContainer></div>
}
