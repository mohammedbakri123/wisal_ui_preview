import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function CreateOrganizationPage() {
  return (
    <FeatureScaffold
      title="Create Organization"
      eyebrow="Workspace setup"
      description="Create a multi-tenant workspace, invite members, and define default roles."
      backTo={ROUTES.ORGANIZATIONS.LIST}
      actions={[{ label: 'Create workspace', path: '/organizations/org-acme' }]}
      sections={[
        {
          title: 'Setup fields',
          items: [
            { title: 'Organization name', description: 'Public workspace name shown in invites and switchers.' },
            { title: 'Branding', description: 'Logo, accent color, and invite preview identity.' },
            { title: 'Default roles', description: 'Owner, admin, moderator, and member permission templates.' },
          ],
        },
      ]}
    />
  )
}
