import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { mockConversations } from '@/mocks/data/conversations'
import { mockUsers } from '@/mocks/data/users'

export default function GroupDetailsPage() {
  const { groupId } = useParams()
  const group = mockConversations.find((item) => item.id === groupId) ?? mockConversations.find((item) => item.type === 'group') ?? mockConversations[0]

  return (
    <FeatureScaffold
      title={`${group.name} Details`}
      description="Manage group metadata, members, roles, invite links, and group settings."
      backTo={`/home/g/${group.id}`}
      actions={[{ label: 'Edit group', path: '/home/create-group' }]}
      sections={[
        {
          title: 'Members and roles',
          items: mockUsers.map((user, index) => ({
            title: user.name,
            description: user.bio ?? 'Group member',
            meta: index === 0 ? 'Admin' : 'Member',
          })),
        },
        {
          title: 'Settings',
          items: [
            { title: 'Invite link', description: 'Allow members to invite trusted collaborators.', meta: 'Enabled' },
            { title: 'Posting permissions', description: 'Members can send messages and reactions.', meta: 'Open' },
          ],
        },
      ]}
    />
  )
}
