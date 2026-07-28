import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { communities } from '../data'

export default function CommunityDetailsPage() {
  const { communityId } = useParams()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]

  return (
    <FeatureScaffold
      title={community.name}
      eyebrow="Community profile"
      description={community.description}
      backTo={ROUTES.COMMUNITY.ROOT}
      actions={[
        community.joined
          ? { label: 'Enter', path: `/communities/${community.id}/overview` }
          : { label: 'Join', path: `/communities/join/${community.id}` },
      ]}
      stats={[
        { label: 'Members', value: community.members },
        { label: 'Groups', value: String(community.groups) },
        { label: 'Channels', value: String(community.channels) },
        { label: 'Status', value: community.joined ? 'Joined' : 'Public' },
      ]}
    />
  )
}
