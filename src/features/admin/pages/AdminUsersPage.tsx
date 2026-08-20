import { useMemo, useState } from 'react'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Button } from '@/core/components/ui/Button'
import { Avatar } from '@/core/components/ui/Avatar'
import { mockUsers } from '@/mocks/data/users'
import { ROUTES } from '@/core/utils/routes'
import { BackButton } from '@/core/components/ui/BackButton'

export default function AdminUsersPage() {
  const [query, setQuery] = useState('')
  const [suspended, setSuspended] = useState<string[]>([])
  const users = useMemo(() => mockUsers.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()) || user.phone?.includes(query)), [query])
  return <div className="flex h-full flex-col bg-black"><PageContainer className="w-full max-w-4xl px-3 pt-3 sm:px-5"><BackButton to={ROUTES.ADMIN.ROOT} label="نظرة عامة" /><div className="mt-3 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-[#71767b]">الإدارة</p><h1 className="mt-1 text-2xl font-bold text-[#e7e9ea]">المستخدمون والحسابات</h1></div><span className="text-xs text-[#71767b]">{users.length} معروض</span></div><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث بالاسم أو الهاتف" className="mt-5 h-11 w-full rounded-full border border-transparent bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:bg-black" /><div className="mt-4 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">{users.map((user) => { const isSuspended = suspended.includes(user.id); return <div key={user.id} className="flex items-center gap-3 border-b border-[#2f3336] px-4 py-3 last:border-b-0"><Avatar src={user.avatar} alt={user.name} size="md" online={user.isOnline && !isSuspended} /><div className="min-w-0 flex-1"><p className="truncate text-[15px] font-bold text-[#e7e9ea]">{user.name}</p><p className="text-xs text-[#71767b]">{user.phone} · {isSuspended ? 'موقوف' : 'نشط'}</p></div><Button size="sm" variant={isSuspended ? 'secondary' : 'danger'} onClick={() => setSuspended((current) => isSuspended ? current.filter((id) => id !== user.id) : [...current, user.id])}>{isSuspended ? 'استعادة' : 'إيقاف'}</Button></div> })}</div></PageContainer></div>
}
