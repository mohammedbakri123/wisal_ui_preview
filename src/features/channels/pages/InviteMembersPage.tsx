import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { channels } from '../data'

export default function InviteMembersPage() {
  const { channelId } = useParams()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]

  return (
    <FeatureScaffold
      title="Invite Members"
      eyebrow={channel.name}
      description="Generate invite links or send direct invites to add subscribers to this channel."
      backTo={`/channels/${channel.id}/details`}
      sections={[
        {
          title: 'Invite options',
          items: [
            { title: 'Public link', description: `https://converso.test/channels/${channel.id}/join`, meta: 'Enabled' },
            { title: 'Direct invites', description: 'Send invites to selected contacts and organization members.', meta: 'Owner' },
          ],
        },
      ]}
    />
  )
}
