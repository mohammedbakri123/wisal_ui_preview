import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { communities } from '../data'

export default function JoinCommunityPage() {
  const { communityId } = useParams()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]

  return (
    <FeatureScaffold
      title={`Join ${community.name}`}
      eyebrow="Community preview"
      description={community.description}
      backTo={ROUTES.COMMUNITY.DISCOVER}
      actions={[{ label: 'Join and enter', path: `/communities/${community.id}/overview` }]}
      sections={[
        {
          title: 'Before joining',
          items: [
            { title: 'Rules', description: 'Keep discussions focused, cite context, and respect moderator decisions.' },
            { title: 'Visibility', description: 'Members can see your profile, role, and public activity inside this community.' },
          ],
        },
      ]}
    />
  )
}
