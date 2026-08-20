import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { useCommunities } from '../context/useCommunities'

export default function CommunityChannelsPage() {
  const { communityId } = useParams()
  const { communities } = useCommunities()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]
  const channels = community.channels ?? []

  return (
    <FeatureScaffold
      title="قنوات المجتمع"
      eyebrow={community.name}
      description="قنوات البث التي تنتمي إلى هذا المجتمع. النشر فيها مقتصر على المسؤولين فقط."
      backTo={`/communities/${community.id}`}
      stats={[
        { label: 'إجمالي القنوات', value: String(channels.length) },
        { label: 'أعضاء المجتمع', value: community.members },
      ]}
      sections={[
        {
          title: 'قناة الإعلانات',
          items: channels.filter((channel) => channel.isAnnouncement).map((channel) => ({
            title: channel.name,
            description: channel.description,
            meta: `${channel.subscribers} مشترك · البث الرسمي`,
            path: `/channels/${channel.id}`,
          })),
        },
        {
          title: 'القنوات الإضافية',
          items: channels.filter((channel) => !channel.isAnnouncement).map((channel) => ({
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