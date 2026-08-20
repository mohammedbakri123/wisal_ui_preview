import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { communities } from '../data'

export default function CommunityGroupsPage() {
  const { communityId } = useParams()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]
  const groups = community.groupList ?? []

  return (
    <FeatureScaffold
      title="مجموعات المجتمع"
      eyebrow={community.name}
      description="المجموعات الفرعية التي تنتمي إلى هذا المجتمع. افتح أي مجموعة للدخول إلى محادثاتها."
      backTo={`/communities/${community.id}`}
      stats={[
        { label: 'إجمالي المجموعات', value: String(groups.length) },
        { label: 'الأعضاء', value: community.members },
      ]}
      sections={[
        {
          title: 'المجموعات',
          items: groups.map((group) => ({
            title: group.name,
            description: `${group.members} عضو · ${group.lastMessage ?? 'لا يوجد نشاط حديث'}`,
            meta: group.isMuted ? 'مكتوم' : 'مفتوح',
            path: `/home/g/${group.id}`,
          })),
        },
      ]}
    />
  )
}