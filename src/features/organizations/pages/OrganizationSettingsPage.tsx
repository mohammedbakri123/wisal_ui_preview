import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'

export default function OrganizationSettingsPage() {
  const { orgId = 'org-acme' } = useParams()

  return (
    <FeatureScaffold
      title="Organization Settings"
      description="Configure organization name, branding, roles, member management, and deletion controls."
      backTo={`/organizations/${orgId}`}
      sections={[
        {
          title: 'Administration',
          items: [
            { title: 'Organization name', description: 'Display name and workspace slug.' },
            { title: 'Branding', description: 'Logo, accent color, and invite preview details.' },
            { title: 'Roles', description: 'Owner, admin, moderator, and member permissions.' },
            { title: 'Delete organization', description: 'Permanent removal of teams, groups, and settings.', meta: 'Danger' },
          ],
        },
      ]}
    />
  )
}
