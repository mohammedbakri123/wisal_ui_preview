import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { communityActivity } from '../data'
import { useCommunities } from '../context/useCommunities'

export default function CommunityOverviewPage() {
  const { communityId } = useParams()
  const { communities } = useCommunities()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]

  return (
    <FeatureScaffold
      title={`${community.name} نظرة عامة`}
      eyebrow="داخل المجتمع"
      description="النشاط الأخير والإعلانات والاختصارات إلى الأعضاء والمجموعات والقنوات وحول."
      backTo={`/communities/${community.id}`}
      actions={[
        { label: 'الأعضاء', path: `/communities/${community.id}/members`, variant: 'secondary' },
        { label: 'المجموعات', path: `/communities/${community.id}/groups`, variant: 'secondary' },
        { label: 'القنوات', path: `/communities/${community.id}/channels`, variant: 'secondary' },
        { label: 'حول', path: `/communities/${community.id}/about`, variant: 'secondary' },
        ...(community.owner ? [{ label: 'إدارة', path: ROUTES.COMMUNITY.MANAGE.replace(':communityId', community.id), variant: 'secondary' as const }] : []),
      ]}
      sections={[
        {
          title: 'النشاط',
          items: communityActivity.map((activity) => ({ title: activity, description: 'تم التحديث من موجز نشاط المجتمع.' })),
        },
      ]}
    />
  )
}
