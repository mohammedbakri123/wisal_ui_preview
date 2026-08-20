import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { mockUsers } from '@/mocks/data/users'
import { useCommunities } from '../context/useCommunities'

export default function CommunityManagePage() {
  const navigate = useNavigate()
  const { communityId } = useParams()
  const { communities, addGroup, removeGroup, addChannel, removeChannel } = useCommunities()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]

  const officialChannels = community.channels ?? []
  const announcement = officialChannels.find((channel) => channel.isAnnouncement)
  const extraChannels = officialChannels.filter((channel) => !channel.isAnnouncement)

  const [adminIds, setAdminIds] = useState(['1'])
  const [selectedAdmin, setSelectedAdmin] = useState('')
  const [groupName, setGroupName] = useState('')
  const [channelName, setChannelName] = useState('')

  const activeAdmins = useMemo(() => mockUsers.filter((user) => adminIds.includes(user.id)), [adminIds])

  const createGroup = () => {
    if (!groupName.trim()) return
    addGroup(community.id, groupName.trim())
    setGroupName('')
  }

  const createChannel = () => {
    if (!channelName.trim()) return
    addChannel(community.id, {
      name: channelName.trim(),
      description: 'قناة جديدة داخل المجتمع.',
      category: 'عام',
      subscribers: '1',
      joined: true,
      admin: true,
      verified: false,
      hasNewUpdate: false,
      lastPost: 'تم إنشاء القناة.',
      lastPostTime: 'الآن',
    })
    setChannelName('')
  }

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PageContainer className="w-full px-4 pt-3 pb-8">
        <div className="mx-auto max-w-2xl">
          <BackButton to={`/communities/${community.id}`} />
          <header className="mb-6 mt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">{community.name}</p>
            <h1 className="mt-1 text-2xl font-bold">إدارة المجتمع</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#71767b]">أضف القنوات والمجموعات التي يحتاجها مجتمعك، واختر الأشخاص الذين يساعدون في إدارتها.</p>
          </header>

          {/* Announcement channel — read only */}
          {announcement && (
            <section className="overflow-hidden rounded-2xl border border-[#1d9bf0]/25 bg-[#16181c]">
              <div className="border-b border-[#2f3336] p-4">
                <h2 className="text-[15px] font-bold">قناة الإعلانات</h2>
                <p className="mt-1 text-xs text-[#71767b]">القناة الافتراضية للمجتمع. لا يمكن حذفها أو تعديلها.</p>
              </div>
              <div className="flex items-center gap-3 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1d9bf0]/15 text-[#1d9bf0]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{announcement.name}</p>
                  <p className="mt-0.5 truncate text-xs text-[#71767b]">{announcement.subscribers} مشترك · {announcement.lastPost}</p>
                </div>
                <Button size="sm" variant="secondary" onClick={() => navigate(`/channels/${announcement.id}`)}>فتح</Button>
              </div>
            </section>
          )}

          {/* Channels */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
            <div className="border-b border-[#2f3336] p-4">
              <h2 className="text-[15px] font-bold">القنوات</h2>
              <p className="mt-1 text-xs text-[#71767b]">أضف قنوات بث جديدة أو أزل القنوات الموجودة. قناة الإعلانات محمية.</p>
            </div>
            {extraChannels.map((channel) => (
              <div key={channel.id} className="flex items-center gap-3 border-b border-[#2f3336] p-4 last:border-b-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1d9bf0]/10 text-[#1d9bf0]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{channel.name}</p>
                  <p className="mt-0.5 truncate text-xs text-[#71767b]">{channel.category} · {channel.subscribers} مشترك</p>
                </div>
                <Button size="sm" variant="danger" onClick={() => removeChannel(community.id, channel.id)}>إزالة</Button>
              </div>
            ))}
            <div className="flex flex-col gap-2 p-4 sm:flex-row">
              <input
                type="text"
                value={channelName}
                onChange={(event) => setChannelName(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && createChannel()}
                placeholder="اسم القناة الجديدة"
                className="h-10 min-w-0 flex-1 rounded-full border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] placeholder:text-[#71767b] outline-none focus:border-[#1d9bf0]"
              />
              <Button size="sm" disabled={!channelName.trim()} onClick={createChannel}>إضافة قناة</Button>
            </div>
          </section>

          {/* Groups */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
            <div className="border-b border-[#2f3336] p-4">
              <h2 className="text-[15px] font-bold">المجموعات</h2>
              <p className="mt-1 text-xs text-[#71767b]">تظهر المجموعات كمساحات محادثة داخل المجتمع وعلى شاشة الرسائل.</p>
            </div>
            {community.groupList.map((group) => (
              <div key={group.id} className="flex items-center gap-3 border-b border-[#2f3336] p-4 last:border-b-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1d9bf0]/10 text-[#1d9bf0]">#</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{group.name}</p>
                  <p className="mt-0.5 truncate text-xs text-[#71767b]">{group.members} عضو · {group.lastMessage ?? 'لا يوجد نشاط حديث'}</p>
                </div>
                <Button size="sm" variant="danger" onClick={() => removeGroup(community.id, group.id)}>إزالة</Button>
              </div>
            ))}
            <div className="flex flex-col gap-2 p-4 sm:flex-row">
              <input
                type="text"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && createGroup()}
                placeholder="اسم المجموعة الجديدة"
                className="h-10 min-w-0 flex-1 rounded-full border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] placeholder:text-[#71767b] outline-none focus:border-[#1d9bf0]"
              />
              <Button size="sm" disabled={!groupName.trim()} onClick={createGroup}>إضافة مجموعة</Button>
            </div>
          </section>

          {/* Admins */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
            <div className="border-b border-[#2f3336] p-4"><h2 className="text-[15px] font-bold">مشرفو المجتمع</h2><p className="mt-1 text-xs text-[#71767b]">يمكن للمشرفين المساعدة في إدارة المجموعات والقنوات وإرشادات المجتمع.</p></div>
            {activeAdmins.map((user) => <div key={user.id} className="flex items-center gap-3 border-b border-[#2f3336] p-4 last:border-b-0"><Avatar src={user.avatar} alt={user.name} size="md" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{user.name}</p><p className="mt-0.5 text-xs text-[#71767b]">مشرف المجتمع</p></div>{user.id !== '1' && <Button size="sm" variant="danger" onClick={() => setAdminIds((current) => current.filter((id) => id !== user.id))}>إزالة</Button>}</div>)}
            <div className="flex flex-col gap-2 p-4 sm:flex-row"><select value={selectedAdmin} onChange={(event) => setSelectedAdmin(event.target.value)} className="h-10 min-w-0 flex-1 rounded-full border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0]"><option value="">إضافة مشرف</option>{mockUsers.filter((user) => !adminIds.includes(user.id)).map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</select><Button size="sm" disabled={!selectedAdmin} onClick={() => { setAdminIds((current) => [...current, selectedAdmin]); setSelectedAdmin('') }}>إضافة مشرف</Button></div>
          </section>
        </div>
      </PageContainer>
    </div>
  )
}