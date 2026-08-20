import { useState } from 'react'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { ROUTES } from '@/core/utils/routes'
import { mockUsers } from '@/mocks/data/users'
import { useContacts } from '../context/useContacts'

type Method = 'phone' | 'username'

export default function AddContactPage() {
  const [method, setMethod] = useState<Method>('phone')
  const [query, setQuery] = useState('')
  const { contacts, addContact, removeContact } = useContacts()
  const results = query.trim() ? mockUsers.filter((user) => method === 'phone' ? user.phone?.includes(query.trim()) : user.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))) : []

  return <div className="flex h-full flex-col overflow-hidden bg-black text-[#e7e9ea]"><PageContainer className="w-full max-w-xl px-3 pt-3 sm:px-4 sm:pt-4"><BackButton to={ROUTES.CONTACTS.ROOT} label="جهات الاتصال" /><div className="mt-3"><p className="text-xs font-bold uppercase tracking-wider text-[#71767b]">جهة اتصال جديدة</p><h1 className="mt-1 text-[20px] font-bold">إضافة شخص</h1><p className="mt-1 text-[13px] leading-relaxed text-[#71767b]">ابحث عن شخص برقم الهاتف أو اسم المستخدم.</p></div><div className="mt-5 flex rounded-full border border-[#2f3336] bg-[#16181c] p-1"><button type="button" onClick={() => { setMethod('phone'); setQuery('') }} className={`flex-1 rounded-full py-2 text-sm font-bold cursor-pointer ${method === 'phone' ? 'bg-[#1d9bf0] text-white' : 'text-[#71767b] hover:text-[#e7e9ea]'}`}>رقم الهاتف</button><button type="button" onClick={() => { setMethod('username'); setQuery('') }} className={`flex-1 rounded-full py-2 text-sm font-bold cursor-pointer ${method === 'username' ? 'bg-[#1d9bf0] text-white' : 'text-[#71767b] hover:text-[#e7e9ea]'}`}>اسم المستخدم</button></div><input value={query} onChange={(event) => setQuery(event.target.value)} autoFocus placeholder={method === 'phone' ? '+1 234 567 8900' : 'alexmorgan'} inputMode={method === 'phone' ? 'tel' : 'text'} className="mt-3 h-11 w-full rounded-full border border-transparent bg-[#202327] px-4 text-[15px] text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:bg-black" /><div className="mt-4 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">{results.length ? results.map((user) => { const isAdded = contacts.some((contact) => contact.id === user.id); return <div key={user.id} className="flex items-center gap-3 border-b border-[#2f3336] px-4 py-3 last:border-b-0"><Avatar src={user.avatar} alt={user.name} size="md" online={user.isOnline} /><div className="min-w-0 flex-1"><p className="truncate text-[15px] font-bold">{user.name}</p><p className="text-xs text-[#71767b]">{user.phone}</p></div><Button size="sm" variant={isAdded ? 'secondary' : 'primary'} onClick={() => isAdded ? removeContact(user.id) : addContact(user)}>{isAdded ? 'تمت الإضافة' : 'إضافة'}</Button></div> }) : <div className="py-14 text-center text-sm text-[#71767b]">{query ? 'لا يوجد مستخدمون مطابقون' : 'أدخل رقماً أو اسم مستخدم للبحث'}</div>}</div></PageContainer></div>
}
