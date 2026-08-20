import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { channels } from '@/features/channels/data'
import { communities } from '@/features/communities/data'
import { useOrganizations } from '../context/useOrganizations'

export default function OrganizationPage() {
  const { orgId = 'org-acme' } = useParams()
  const { organizations } = useOrganizations()
  const organization = organizations.find((item) => item.id === orgId)
  const name = organization?.name ?? 'Organization workspace'
  const memberCount = organization?.members ?? '0'

  return (
    <FeatureScaffold
      title={name}
      eyebrow="Organization"
      description="Review organization details, teams, roles, invitations, and administrative settings."
      backTo={ROUTES.ORGANIZATIONS.LIST}
      actions={[{ label: 'Settings', path: `/organizations/${orgId}/settings` }]}
      stats={[
        { label: 'Members', value: memberCount },
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
        {
          title: 'Owned resources',
          items: [
            { title: channels[0].name, description: 'Verified broadcast channel connected to this organization.', meta: 'Channel', path: `/channels/${channels[0].id}/details` },
            { title: communities[0].name, description: 'Community workspace for members and working groups.', meta: 'Community', path: `/communities/${communities[0].id}` },
          ],
        },
      ]}
    />
  )
}
