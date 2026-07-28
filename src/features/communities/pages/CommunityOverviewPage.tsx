import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { communities, communityActivity } from '../data'

export default function CommunityOverviewPage() {
  const { communityId } = useParams()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]

  return (
    <FeatureScaffold
      title={`${community.name} Overview`}
      eyebrow="Inside community"
      description="Recent activity, announcements, and shortcuts into members, groups, channels, and about."
      backTo={`/communities/${community.id}`}
      actions={[
        { label: 'Members', path: `/communities/${community.id}/members`, variant: 'secondary' },
        { label: 'Groups', path: `/communities/${community.id}/groups`, variant: 'secondary' },
        { label: 'Channels', path: `/communities/${community.id}/channels`, variant: 'secondary' },
        { label: 'About', path: `/communities/${community.id}/about`, variant: 'secondary' },
      ]}
      sections={[
        {
          title: 'Activity',
          items: communityActivity.map((activity) => ({ title: activity, description: 'Updated from the community activity feed.' })),
        },
      ]}
    />
  )
}
