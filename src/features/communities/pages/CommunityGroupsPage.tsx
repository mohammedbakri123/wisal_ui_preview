import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { mockConversations } from '@/mocks/data/conversations'
import { communities } from '../data'

export default function CommunityGroupsPage() {
  const { communityId } = useParams()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]
  const groups = mockConversations.filter((conversation) => conversation.type === 'group')

  return (
    <FeatureScaffold
      title="Community Groups"
      eyebrow={community.name}
      description="Join focused subgroups and open their conversations."
      backTo={`/communities/${community.id}/overview`}
      sections={[
        {
          title: 'Groups',
          items: groups.map((group) => ({
            title: group.name,
            description: group.lastMessage ?? 'No recent activity',
            meta: group.isMuted ? 'Muted' : 'Open',
            path: `/home/g/${group.id}`,
          })),
        },
      ]}
    />
  )
}
