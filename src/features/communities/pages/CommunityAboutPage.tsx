import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { communities } from '../data'

export default function CommunityAboutPage() {
  const { communityId } = useParams()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]

  return (
    <FeatureScaffold
      title="About Community"
      eyebrow={community.name}
      description={community.description}
      backTo={`/communities/${community.id}/overview`}
      sections={[
        {
          title: 'Guidelines',
          items: [
            { title: 'Purpose', description: 'Share actionable context and keep discussions useful for members.' },
            { title: 'Moderation', description: 'Reports are reviewed by community moderators and platform admins.' },
            { title: 'Created', description: 'Community created on June 4, 2024.' },
          ],
        },
      ]}
    />
  )
}
