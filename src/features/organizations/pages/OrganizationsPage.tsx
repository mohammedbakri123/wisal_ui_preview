import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'

const organizations = [
  { id: 'org-acme', name: 'Acme Product Lab', description: 'Main workspace for product, design, and engineering teams.', members: '48' },
  { id: 'org-field', name: 'Field Support', description: 'Customer-facing operations and escalation teams.', members: '16' },
]

export default function OrganizationsPage() {
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
            meta: `${organization.members} members`,
            path: `/organizations/${organization.id}`,
          })),
        },
      ]}
    />
  )
}
