import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { channels } from '../data'

export default function ChannelDetailsPage() {
  const { channelId } = useParams()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]

  return (
    <FeatureScaffold
      title={`${channel.name} Details`}
      eyebrow="Channel profile"
      description={channel.description}
      backTo={`/channels/${channel.id}`}
      actions={[
        { label: channel.joined ? 'Open feed' : 'Join channel', path: `/channels/${channel.id}` },
        { label: 'Invite', path: `/channels/${channel.id}/invite`, variant: 'secondary' },
        { label: 'Settings', path: `/channels/${channel.id}/settings`, variant: 'secondary' },
      ]}
      stats={[
        { label: 'Subscribers', value: channel.subscribers },
        { label: 'Posts', value: String(channel.posts) },
        { label: 'Admins', value: channel.admin ? '3' : '2' },
        { label: 'Status', value: channel.joined ? 'Joined' : 'Public' },
      ]}
      sections={[
        {
          title: 'Metadata',
          items: [
            { title: 'Category', description: channel.category },
            { title: 'Admins', description: 'Alex Morgan, Jordan Lee, Sam Rivera' },
            { title: 'Discussions', description: 'Threaded replies are available under each post.' },
          ],
        },
      ]}
    />
  )
}
