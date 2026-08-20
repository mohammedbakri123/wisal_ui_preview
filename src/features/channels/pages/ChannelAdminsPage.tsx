import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { mockUsers } from '@/mocks/data/users'
import { useChannels } from '../context/useChannels'

export default function ChannelAdminsPage() {
  const { channelId } = useParams()
  const { channels } = useChannels()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]
  const [adminIds, setAdminIds] = useState(['1', '2'])
  const [ownerId, setOwnerId] = useState('1')
  const [selectedUserId, setSelectedUserId] = useState('')
  const admins = useMemo(() => mockUsers.filter((user) => adminIds.includes(user.id)), [adminIds])
  const availableUsers = mockUsers.filter((user) => !adminIds.includes(user.id))

  function addAdmin() {
    if (!selectedUserId) return
    setAdminIds((current) => [...current, selectedUserId])
    setSelectedUserId('')
  }

  function removeAdmin(userId: string) {
    if (userId === ownerId) return
    setAdminIds((current) => current.filter((id) => id !== userId))
  }

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PageContainer className="w-full px-4 pt-3 pb-8">
        <div className="mx-auto max-w-2xl">
          <BackButton to={`/channels/${channel.id}/details`} />
          <header className="mb-6 mt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">{channel.name}</p>
            <h1 className="mt-1 text-2xl font-bold">Manage admins</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#71767b]">Choose who can publish updates, moderate posts, and manage this channel.</p>
          </header>

          <section className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
            <div className="border-b border-[#2f3336] p-4">
              <h2 className="text-[15px] font-bold">Current admins</h2>
              <p className="mt-1 text-xs text-[#71767b]">The owner cannot be removed until ownership is transferred.</p>
            </div>
            {admins.map((user) => (
              <div key={user.id} className="flex items-center gap-3 border-b border-[#2f3336] p-4 last:border-b-0">
                <Avatar src={user.avatar} alt={user.name} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{user.name}</p>
                  <p className="mt-0.5 text-xs text-[#71767b]">{user.id === ownerId ? 'Owner' : 'Administrator'}</p>
                </div>
                {user.id !== ownerId && <Button size="sm" variant="danger" onClick={() => removeAdmin(user.id)}>Remove</Button>}
                {user.id === ownerId && <span className="text-xs font-bold text-[#1d9bf0]">Owner</span>}
              </div>
            ))}
          </section>

          <section className="mt-6 rounded-2xl border border-[#2f3336] bg-[#16181c] p-4">
            <h2 className="text-[15px] font-bold">Add an administrator</h2>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <select value={selectedUserId} onChange={(event) => setSelectedUserId(event.target.value)} className="h-10 min-w-0 flex-1 rounded-full border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0]">
                <option value="">Select a member</option>
                {availableUsers.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
              </select>
              <Button size="sm" onClick={addAdmin} disabled={!selectedUserId}>Add admin</Button>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-[#2f3336] bg-[#16181c] p-4">
            <h2 className="text-[15px] font-bold">Transfer ownership</h2>
            <p className="mt-1 text-xs leading-relaxed text-[#71767b]">Ownership transfer gives the selected administrator full control of this channel.</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <select value={ownerId} onChange={(event) => setOwnerId(event.target.value)} className="h-10 min-w-0 flex-1 rounded-full border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0]">
                {admins.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
              </select>
              <span className="inline-flex h-10 items-center justify-center rounded-full border border-[#2f3336] px-4 text-xs text-[#71767b]">Saved locally</span>
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  )
}
