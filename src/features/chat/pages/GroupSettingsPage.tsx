import { useState } from 'react'
import { useParams } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { mockConversations } from '@/mocks/data/conversations'

export default function GroupSettingsPage() {
  const { groupId } = useParams()
  const group = mockConversations.find((conversation) => conversation.id === groupId) ?? mockConversations.find((conversation) => conversation.type === 'group') ?? mockConversations[0]
  const [membersCanPost, setMembersCanPost] = useState(true)
  const [membersCanEdit, setMembersCanEdit] = useState(false)
  const [membersCanInvite, setMembersCanInvite] = useState(true)
  const [groupAlerts, setGroupAlerts] = useState(true)

  return <div className="flex h-full flex-col overflow-hidden bg-black text-[#e7e9ea]"><PageContainer className="w-full max-w-xl px-3 pt-3 sm:px-4 sm:pt-4"><BackButton to={`/home/g/${group.id}/details`} label="Group details" /><div className="mt-3"><p className="text-xs font-bold uppercase tracking-wider text-[#71767b]">Admin controls</p><h1 className="mt-1 text-[20px] font-bold">{group.name} settings</h1></div><section className="mt-4 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]"><SettingsRow label="Members can send messages" description="Allow regular members to post in the group." checked={membersCanPost} onChange={setMembersCanPost} /><SettingsRow label="Members can edit group info" description="Allow members to change the name or image." checked={membersCanEdit} onChange={setMembersCanEdit} /><SettingsRow label="Members can invite others" description="Allow members to add people from their contacts." checked={membersCanInvite} onChange={setMembersCanInvite} /><SettingsRow label="Group notifications" description="Receive alerts for activity in this group." checked={groupAlerts} onChange={setGroupAlerts} /></section><p className="mt-3 text-xs leading-relaxed text-[#71767b]">Changes apply to this prototype session. Permission choices follow the group rules in the user story.</p></PageContainer></div>
}

function SettingsRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex items-center justify-between gap-4 border-b border-[#2f3336] px-4 py-3.5 last:border-b-0"><div className="min-w-0"><p className="text-[15px] font-bold">{label}</p><p className="mt-0.5 text-xs leading-relaxed text-[#71767b]">{description}</p></div><Toggle checked={checked} onChange={onChange} label={label} /></div>
}
