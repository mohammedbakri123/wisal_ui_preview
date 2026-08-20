import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { useOrganizations } from '../context/useOrganizations'

export default function OrganizationsPage() {
  const { organizations } = useOrganizations()

  return (
    <FeatureScaffold
      title="المنظمات"
      description="إنشاء مساحات العمل متعددة المستأجرين والتبديل بينها وإدارتها."
      actions={[{ label: 'إنشاء منظمة', path: '/organizations/create' }]}
      sections={[
        {
          title: 'مساحات العمل',
          items: organizations.map((organization) => ({
            title: organization.name,
            description: organization.description,
            meta: `${organization.members} أعضاء · ${organization.status}`,
            path: `/organizations/${organization.id}`,
          })),
        },
      ]}
    />
  )
}
