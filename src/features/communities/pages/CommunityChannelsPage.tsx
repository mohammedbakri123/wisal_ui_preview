import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { channels as allChannels } from '@/features/channels/data'
import { communities } from '../data'

export default function CommunityChannelsPage() {
  const { communityId } = useParams()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]
  const channelIds = community.channelIds ?? []
  const communityChannels = allChannels.filter((channel) => channelIds.includes(channel.id))

  return (
    <FeatureScaffold
      title="قنوات المجتمع"
      eyebrow={community.name}
      description="قنوات البث التي تنتمي إلى هذا المجتمع. النشر فيها مقتصر على المسؤولين فقط."
      backTo={`/communities/${community.id}`}
      stats={[
        { label: 'إجمالي القنوات', value: String(communityChannels.length) },
        { label: 'الأعضاء', value: community.members },
      ]}
      sections={[
        {
          title: 'القنوات',
          items: communityChannels.map((channel) => ({
            title: channel.name,
            description: channel.description,
            meta: `${channel.subscribers} مشترك`,
            path: `/channels/${channel.id}`,
          })),
        },
      ]}
    />
  )
}