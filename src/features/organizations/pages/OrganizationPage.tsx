import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { channels } from '@/features/channels/data'
import { communities } from '@/features/communities/data'
import { mockUsers } from '@/mocks/data/users'
import { useOrganizations } from '../context/useOrganizations'

const ROLE_LABELS: Record<string, string> = { '1': 'المالك', '2': 'مشرف', '3': 'عضو' }

export default function OrganizationPage() {
  const { orgId = 'org-acme' } = useParams()
  const { organizations } = useOrganizations()
  const organization = organizations.find((item) => item.id === orgId)
  const name = organization?.name ?? 'مساحة عمل المنظمة'
  const memberCount = organization?.members ?? '0'

  return (
    <FeatureScaffold
      title={name}
      eyebrow="منظمة"
      description="إدارة ذاتية لمنظمتك: راجع الأعضاء والأدوار والفرق والأصول المعتمدة للمسؤولين."
      backTo={ROUTES.ORGANIZATIONS.LIST}
      actions={[{ label: 'إدارة الأعضاء والأدوار', path: `/organizations/${orgId}/settings`, variant: 'primary' }]}
      stats={[
        { label: 'الأعضاء', value: memberCount },
        { label: 'الفرق', value: '6' },
        { label: 'الأدوار', value: '4' },
        { label: 'الدعوات', value: '3' },
      ]}
      sections={[
        {
          title: 'الأعضاء والأدوار',
          items: mockUsers.map((user) => ({
            title: user.name,
            description: user.email ?? '',
            meta: ROLE_LABELS[user.id] ?? 'عضو',
            path: `/organizations/${orgId}/settings`,
          })),
        },
        {
          title: 'الفرق',
          items: [
            { title: 'المنتج', description: 'سير عمل خارطة الطريق والإطلاق وملاحظات العملاء.' },
            { title: 'الهندسة', description: 'عمل المنصة والواجهة الأمامية والخلفية والموثوقية.' },
            { title: 'الدعم', description: 'فرز العملاء والتواصل عند الحوادث.' },
          ],
        },
        {
          title: 'الموارد المملوكة (المعتمدة)',
          items: [
            { title: channels[0].name, description: 'قناة بث موثقة مرتبطة بهذه المنظمة.', meta: 'قناة', path: `/channels/${channels[0].id}/details` },
            { title: communities[0].name, description: 'مساحة عمل مجتمعية للأعضاء ومجموعات العمل.', meta: 'مجتمع', path: `/communities/${communities[0].id}` },
          ],
        },
      ]}
    />
  )
}
