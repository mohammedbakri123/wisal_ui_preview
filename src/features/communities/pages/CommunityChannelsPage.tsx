import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { channels } from '@/features/channels/data'
import { communities } from '../data'

export default function CommunityChannelsPage() {
  const { communityId } = useParams()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]

  return (
    <FeatureScaffold
      title="Community Channels"
      eyebrow={community.name}
      description="Follow broadcast channels that belong to this community."
      backTo={`/communities/${community.id}/overview`}
      sections={[
        {
          title: 'Channels',
          items: channels.map((channel) => ({
            title: channel.name,
            description: channel.description,
            meta: channel.category,
            path: `/channels/${channel.id}`,
          })),
        },
      ]}
    />
  )
}
