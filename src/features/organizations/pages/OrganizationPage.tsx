import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function OrganizationPage() {
  const { orgId = 'org-acme' } = useParams()
  const name = orgId === 'org-field' ? 'Field Support' : 'Acme Product Lab'

  return (
    <FeatureScaffold
      title={name}
      eyebrow="Organization"
      description="Review organization details, teams, roles, invitations, and administrative settings."
      backTo={ROUTES.ORGANIZATIONS.LIST}
      actions={[{ label: 'Settings', path: `/organizations/${orgId}/settings` }]}
      stats={[
        { label: 'Members', value: orgId === 'org-field' ? '16' : '48' },
        { label: 'Teams', value: '6' },
        { label: 'Roles', value: '4' },
        { label: 'Invites', value: '3' },
      ]}
      sections={[
        {
          title: 'Teams',
          items: [
            { title: 'Product', description: 'Roadmap, launch, and customer feedback workflows.' },
            { title: 'Engineering', description: 'Platform, frontend, backend, and reliability work.' },
            { title: 'Support', description: 'Customer triage and incident communication.' },
          ],
        },
      ]}
    />
  )
}
