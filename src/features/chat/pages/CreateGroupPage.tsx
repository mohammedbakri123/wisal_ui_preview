import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { mockUsers } from '@/mocks/data/users'

export default function CreateGroupPage() {
  return (
    <FeatureScaffold
      title="Create Group"
      eyebrow="Group setup"
      description="Select members, set a group name, and choose initial permissions before opening the conversation."
      backTo={ROUTES.CHAT.ADD}
      actions={[{ label: 'Create Design Review', path: '/home/g/c2' }]}
      sections={[
        {
          title: 'Selected members',
          items: mockUsers.map((user) => ({
            title: user.name,
            description: user.bio ?? 'Available for group chat',
            meta: user.isOnline ? 'Online' : 'Away',
          })),
        },
      ]}
    />
  )
}
