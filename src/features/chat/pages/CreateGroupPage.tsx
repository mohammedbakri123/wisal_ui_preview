import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { ROUTES } from '@/core/utils/routes'
import { mockUsers } from '@/mocks/data/users'
import { addMockConversation } from '../hooks/useConversations'

export default function CreateGroupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [selected, setSelected] = useState<string[]>(['1'])

  function createGroup() {
    if (!name.trim() || selected.length < 2) return
    const id = `g-${Date.now()}`
    addMockConversation({
      id,
      name: name.trim(),
      avatar: null,
      type: 'group',
      lastMessage: 'تم إنشاء المجموعة. ابدأ المحادثة.',
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0,
      members: mockUsers.filter((user) => selected.includes(user.id)),
      isMuted: false,
      isPinned: false,
      createdAt: new Date().toISOString(),
    })
    navigate(`/home/g/${id}`)
  }

  return <div className="flex h-full flex-col bg-black text-[#e7e9ea]"><PageContainer className="w-full px-4 pt-3 pb-8"><div className="mx-auto max-w-2xl"><BackButton to={ROUTES.CHAT.ADD} /><header className="mb-6 mt-2"><p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">محادثة جديدة</p><h1 className="mt-1 text-2xl font-bold">إنشاء مجموعة</h1><p className="mt-2 text-sm leading-relaxed text-[#71767b]">اختر اسماً وأعضاء. يمكنك ضبط الصلاحيات بعد فتح المجموعة.</p></header><section className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-4"><label className="block text-sm font-bold">اسم المجموعة<input value={name} onChange={(event) => setName(event.target.value)} placeholder="مثال: مراجعة التصميم" className="mt-2 h-11 w-full rounded-xl border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0]" /></label></section><section className="mt-6 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]"><div className="border-b border-[#2f3336] p-4"><h2 className="text-[15px] font-bold">اختر الأعضاء</h2><p className="mt-1 text-xs text-[#71767b]">{selected.length} محدد · يلزم شخصان على الأقل</p></div>{mockUsers.map((user) => { const isSelected = selected.includes(user.id); return <button type="button" key={user.id} onClick={() => setSelected((current) => isSelected ? current.filter((id) => id !== user.id) : [...current, user.id])} className={`flex w-full items-center gap-3 border-b border-[#2f3336] p-4 text-start transition-colors last:border-b-0 ${isSelected ? 'bg-[#1d9bf0]/10' : 'hover:bg-white/[0.03]'}`}><Avatar src={user.avatar} alt={user.name} size="md" online={user.isOnline} /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{user.name}</span><span className="mt-0.5 block truncate text-xs text-[#71767b]">{user.bio ?? 'متاح للدردشة الجماعية'}</span></span><span className={`flex h-5 w-5 items-center justify-center rounded-full border ${isSelected ? 'border-[#1d9bf0] bg-[#1d9bf0] text-white' : 'border-[#536471]'}`}>{isSelected && '✓'}</span></button>})}</section><Button className="mt-6 w-full" onClick={createGroup} disabled={!name.trim() || selected.length < 2}>إنشاء المجموعة</Button></div></PageContainer></div>
}
