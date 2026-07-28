import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { channels } from '../data'

export default function ChannelSettingsPage() {
  const { channelId } = useParams()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]

  return (
    <FeatureScaffold
      title="Channel Settings"
      eyebrow={channel.name}
      description="Manage channel identity, administrator access, invite settings, and deletion controls."
      backTo={`/channels/${channel.id}/details`}
      actions={[{ label: 'Invite members', path: `/channels/${channel.id}/invite` }]}
      sections={[
        {
          title: 'Configuration',
          items: [
            { title: 'Name and description', description: channel.description },
            { title: 'Admin posting', description: 'Only owners and admins can publish new posts.', meta: 'Enabled' },
            { title: 'Delete channel', description: 'Permanently remove posts, subscribers, and analytics.', meta: 'Danger' },
          ],
        },
      ]}
    />
  )
}
