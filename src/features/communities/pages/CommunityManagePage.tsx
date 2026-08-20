import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { mockConversations } from '@/mocks/data/conversations'
import { mockUsers } from '@/mocks/data/users'
import { communities } from '../data'

export default function CommunityManagePage() {
  const { communityId } = useParams()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]
  const groups = mockConversations.filter((conversation) => conversation.type === 'group')
  const [groupIds, setGroupIds] = useState(groups.slice(0, 2).map((group) => group.id))
  const [adminIds, setAdminIds] = useState(['1'])
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedAdmin, setSelectedAdmin] = useState('')
  const activeGroups = useMemo(() => groups.filter((group) => groupIds.includes(group.id)), [groupIds, groups])
  const activeAdmins = mockUsers.filter((user) => adminIds.includes(user.id))

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PageContainer className="w-full px-4 pt-3 pb-8">
        <div className="mx-auto max-w-2xl">
          <BackButton to={`/communities/${community.id}`} />
          <header className="mb-6 mt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">{community.name}</p>
            <h1 className="mt-1 text-2xl font-bold">إدارة المجتمع</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#71767b]">نظم المجموعات المرتبطة واختر الأشخاص الذين يساعدون في الحفاظ على صحة هذه المساحة.</p>
          </header>

          <section className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
            <div className="border-b border-[#2f3336] p-4"><h2 className="text-[15px] font-bold">المجموعات المرتبطة</h2><p className="mt-1 text-xs text-[#71767b]">تظهر المجموعات كمساحات محادثة داخل المجتمع.</p></div>
            {activeGroups.map((group) => <div key={group.id} className="flex items-center gap-3 border-b border-[#2f3336] p-4 last:border-b-0"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d9bf0]/10 text-[#1d9bf0]">#</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{group.name}</p><p className="mt-0.5 truncate text-xs text-[#71767b]">{group.lastMessage ?? 'لا يوجد نشاط حديث'}</p></div><Button size="sm" variant="danger" onClick={() => setGroupIds((current) => current.filter((id) => id !== group.id))}>إزالة</Button></div>)}
            <div className="flex flex-col gap-2 p-4 sm:flex-row"><select value={selectedGroup} onChange={(event) => setSelectedGroup(event.target.value)} className="h-10 min-w-0 flex-1 rounded-full border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0]"><option value="">إضافة مجموعة</option>{groups.filter((group) => !groupIds.includes(group.id)).map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}</select><Button size="sm" disabled={!selectedGroup} onClick={() => { setGroupIds((current) => [...current, selectedGroup]); setSelectedGroup('') }}>إضافة مجموعة</Button></div>
          </section>

          <section className="mt-6 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
            <div className="border-b border-[#2f3336] p-4"><h2 className="text-[15px] font-bold">مشرفو المجتمع</h2><p className="mt-1 text-xs text-[#71767b]">يمكن للمشرفين المساعدة في إدارة المجموعات وإرشادات المجتمع.</p></div>
            {activeAdmins.map((user) => <div key={user.id} className="flex items-center gap-3 border-b border-[#2f3336] p-4 last:border-b-0"><Avatar src={user.avatar} alt={user.name} size="md" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{user.name}</p><p className="mt-0.5 text-xs text-[#71767b]">مشرف المجتمع</p></div>{user.id !== '1' && <Button size="sm" variant="danger" onClick={() => setAdminIds((current) => current.filter((id) => id !== user.id))}>إزالة</Button>}</div>)}
            <div className="flex flex-col gap-2 p-4 sm:flex-row"><select value={selectedAdmin} onChange={(event) => setSelectedAdmin(event.target.value)} className="h-10 min-w-0 flex-1 rounded-full border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0]"><option value="">إضافة مشرف</option>{mockUsers.filter((user) => !adminIds.includes(user.id)).map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</select><Button size="sm" disabled={!selectedAdmin} onClick={() => { setAdminIds((current) => [...current, selectedAdmin]); setSelectedAdmin('') }}>إضافة مشرف</Button></div>
          </section>
        </div>
      </PageContainer>
    </div>
  )
}
