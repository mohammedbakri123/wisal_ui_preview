import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { communities } from '../data'
import { useCommunities } from '../context/useCommunities'

export default function JoinCommunityPage() {
  const { communityId } = useParams()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]
  const { joinCommunity } = useCommunities()

  return (
    <FeatureScaffold
      title={`الانضمام إلى ${community.name}`}
      eyebrow="معاينة المجتمع"
      description={community.description}
      backTo={ROUTES.COMMUNITY.DISCOVER}
      actions={[{ label: 'الانضمام والدخول', path: `/communities/${community.id}/overview`, onClick: () => { joinCommunity(community.id) } }]}
      sections={[
        {
          title: 'قبل الانضمام',
          items: [
            { title: 'القواعد', description: 'حافظ على تركيز المناقشات واستشهد بالسياق واحترم قرارات المشرفين.' },
            { title: 'الرؤية', description: 'يمكن للأعضاء رؤية ملفك الشخصي ودورك ونشاطك العام داخل هذا المجتمع.' },
          ],
        },
      ]}
    />
  )
}
