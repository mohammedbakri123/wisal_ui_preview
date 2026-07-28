import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function SecuritySettingsPage() {
  return (
    <FeatureScaffold
      title="Security"
      description="Manage two-factor authentication, passkeys, active sessions, and recent login history."
      backTo={ROUTES.SETTINGS.ROOT}
      sections={[
        {
          title: 'Protection',
          items: [
            { title: 'Two-factor authentication', description: 'Require a second verification step during login.', meta: 'Off' },
            { title: 'Passkeys', description: 'Use a device-bound credential for faster sign-in.', meta: 'Add' },
            { title: 'Login history', description: 'Chrome on Linux, today at 09:42.', meta: 'Current' },
          ],
        },
      ]}
    />
  )
}
