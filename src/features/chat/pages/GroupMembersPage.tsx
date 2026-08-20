import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { mockConversations } from '@/mocks/data/conversations'
import { mockUsers } from '@/mocks/data/users'

export default function GroupMembersPage() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const group = mockConversations.find((conversation) => conversation.id === groupId) ?? mockConversations.find((conversation) => conversation.type === 'group') ?? mockConversations[0]
  const initialMembers = group.members.length > 0 ? group.members : mockUsers
  const [members, setMembers] = useState(initialMembers)
  const [admins, setAdmins] = useState(() => new Set(initialMembers.slice(0, 1).map((member) => member.id)))
  const availableMembers = mockUsers.filter((user) => !members.some((member) => member.id === user.id))

  return (
    <div className="flex h-full flex-col overflow-hidden bg-black text-[#e7e9ea]">
      <PageContainer className="w-full max-w-2xl px-3 pt-3 sm:px-4 sm:pt-4">
        <BackButton to={`/home/g/${group.id}/details`} label="Group details" />
        <div className="mb-4 mt-3 flex items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-wider text-[#71767b]">Group administration</p><h1 className="mt-1 text-[20px] font-bold">Members</h1><p className="mt-1 text-[13px] text-[#71767b]">{members.length} people in {group.name}</p></div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" disabled={!availableMembers.length} onClick={() => {
              const nextMember = availableMembers[0]
              if (nextMember) setMembers((current) => [...current, nextMember])
            }}>{availableMembers.length ? 'Add member' : 'All contacts added'}</Button>
            <Button variant="secondary" size="sm" onClick={() => navigate(`/home/g/${group.id}/details`)}>Done</Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
          {members.map((member) => {
            const isAdmin = admins.has(member.id)
            return <div key={member.id} className="flex items-center gap-3 border-b border-[#2f3336] px-4 py-3 last:border-b-0">
              <Avatar src={member.avatar} alt={member.name} size="md" online={member.isOnline} />
              <div className="min-w-0 flex-1"><p className="truncate text-[15px] font-bold">{member.name}</p><p className="text-xs text-[#71767b]">{isAdmin ? 'Admin' : 'Member'}</p></div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => setAdmins((current) => { const next = new Set(current); if (next.has(member.id)) next.delete(member.id); else next.add(member.id); return next })} className="rounded-full px-2.5 py-1.5 text-[11px] font-bold text-[#1d9bf0] hover:bg-[#1d9bf0]/10 cursor-pointer">{isAdmin ? 'Remove admin' : 'Make admin'}</button>
                <button type="button" onClick={() => setMembers((current) => current.filter((candidate) => candidate.id !== member.id))} className="rounded-full px-2.5 py-1.5 text-[11px] font-bold text-[#f4212e] hover:bg-[#f4212e]/10 cursor-pointer">Remove</button>
              </div>
            </div>
          })}
        </div>
        <p className="mt-3 text-center text-xs text-[#71767b]">The first admin remains highlighted so the group always has visible ownership.</p>
      </PageContainer>
    </div>
  )
}
