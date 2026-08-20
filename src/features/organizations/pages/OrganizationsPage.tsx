import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { useOrganizations } from '../context/useOrganizations'

export default function OrganizationsPage() {
  const { organizations } = useOrganizations()

  return (
    <FeatureScaffold
      title="Organizations"
      description="Create, switch, and manage multi-tenant workspaces."
      actions={[{ label: 'Create organization', path: '/organizations/create' }]}
      sections={[
        {
          title: 'Workspaces',
          items: organizations.map((organization) => ({
            title: organization.name,
            description: organization.description,
            meta: `${organization.members} members · ${organization.status}`,
            path: `/organizations/${organization.id}`,
          })),
        },
      ]}
    />
  )
}
