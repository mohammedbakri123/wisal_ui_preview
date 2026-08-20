import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { useCommunities } from '../context/useCommunities'

export default function CommunityDetailsPage() {
  const { communityId } = useParams()
  const { communities, leaveCommunity } = useCommunities()
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
        ...(community.joined ? [{ label: 'Leave community', path: ROUTES.COMMUNITY.ROOT, variant: 'danger' as const, onClick: () => leaveCommunity(community.id) }] : []),
        ...(community.owner ? [{ label: 'Manage community', path: ROUTES.COMMUNITY.MANAGE.replace(':communityId', community.id), variant: 'secondary' as const }] : []),
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
