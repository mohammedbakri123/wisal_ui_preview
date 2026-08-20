import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { communities } from '../data'

export default function CommunityAboutPage() {
  const { communityId } = useParams()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]

  return (
    <FeatureScaffold
      title="حول المجتمع"
      eyebrow={community.name}
      description={community.description}
      backTo={`/communities/${community.id}/overview`}
      sections={[
        {
          title: 'الإرشادات',
          items: [
            { title: 'الغرض', description: 'شارك سياقًا عمليًا وحافظ على فائدة النقاشات للأعضاء.' },
            { title: 'الإشراف', description: 'تتم مراجعة البلاغات بواسطة مشرفي المجتمع ومسؤولي المنصة.' },
            { title: 'تاريخ الإنشاء', description: 'تم إنشاء المجتمع في 4 يونيو 2024.' },
          ],
        },
      ]}
    />
  )
}
