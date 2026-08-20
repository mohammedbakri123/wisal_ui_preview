import { useState } from 'react'
import { useParams } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { mockUsers } from '@/mocks/data/users'

export default function OrganizationSettingsPage() {
  const { orgId = 'org-acme' } = useParams()
  const [inviteApproval, setInviteApproval] = useState(true)
  const [roles, setRoles] = useState<Record<string, string>>({ '1': 'Owner', '2': 'Admin', '3': 'Member' })

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PageContainer className="w-full px-4 pt-3 pb-8">
        <div className="mx-auto max-w-2xl">
          <BackButton to={`/organizations/${orgId}`} />
          <header className="mb-6 mt-2"><p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">Workspace administration</p><h1 className="mt-1 text-2xl font-bold">Organization settings</h1><p className="mt-2 text-sm leading-relaxed text-[#71767b]">Manage members, roles, invitations, and workspace identity.</p></header>
          <section className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]"><div className="border-b border-[#2f3336] p-4"><h2 className="text-[15px] font-bold">Members and roles</h2></div>{mockUsers.map((user) => <div key={user.id} className="flex items-center gap-3 border-b border-[#2f3336] p-4 last:border-b-0"><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{user.name}</p><p className="mt-0.5 text-xs text-[#71767b]">{user.email}</p></div><select value={roles[user.id] ?? 'Member'} onChange={(event) => setRoles((current) => ({ ...current, [user.id]: event.target.value }))} disabled={user.id === '1'} className="h-9 rounded-full border border-[#2f3336] bg-[#202327] px-3 text-xs text-[#e7e9ea] outline-none focus:border-[#1d9bf0]"><option>Owner</option><option>Admin</option><option>Moderator</option><option>Member</option></select></div>)}</section>
          <section className="mt-6 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]"><div className="flex items-center justify-between gap-4 border-b border-[#2f3336] p-4"><div><h2 className="text-[15px] font-bold">Invite approval</h2><p className="mt-1 text-xs text-[#71767b]">Require an administrator to approve new member invitations.</p></div><Toggle checked={inviteApproval} onChange={setInviteApproval} label="Invite approval" /></div><div className="border-b border-[#2f3336] p-4"><p className="text-sm font-bold">Branding</p><p className="mt-1 text-xs leading-relaxed text-[#71767b]">Logo, accent color, and invite preview details are available here in the planned workspace settings.</p></div><div className="p-4"><p className="text-sm font-bold text-[#f4212e]">Delete organization</p><p className="mt-1 text-xs leading-relaxed text-[#71767b]">Permanent removal of teams, groups, and settings is intentionally guarded in this prototype.</p></div></section>
        </div>
      </PageContainer>
    </div>
  )
}
