import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function CreateChannelPage() {
  return (
    <FeatureScaffold
      title="Create Channel"
      eyebrow="Broadcast setup"
      description="Set a channel name, description, avatar, and posting permissions before publishing."
      backTo={ROUTES.CHANNEL.ROOT}
      actions={[
        { label: 'Cancel', path: ROUTES.CHANNEL.ROOT, variant: 'secondary' },
      ]}
      sections={[
        {
          title: 'Channel fields',
          items: [
            { title: 'Name', description: 'Product Launch Notes' },
            { title: 'Description', description: 'Short positioning for members deciding whether to subscribe.' },
            { title: 'Posting permissions', description: 'Owners and admins can publish posts.' },
          ],
        },
      ]}
    />
  )
}
