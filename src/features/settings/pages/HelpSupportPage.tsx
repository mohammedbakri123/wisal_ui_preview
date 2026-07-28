import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function HelpSupportPage() {
  return (
    <FeatureScaffold
      title="Help & Support"
      description="Access support resources, report a problem, and review troubleshooting guides."
      backTo={ROUTES.SETTINGS.ROOT}
      sections={[
        {
          title: 'Support',
          items: [
            { title: 'FAQ', description: 'Common answers for login, messaging, notifications, and privacy.' },
            { title: 'Contact support', description: 'Send diagnostics and describe what went wrong.' },
            { title: 'Report a problem', description: 'Attach a screen and route context for investigation.' },
          ],
        },
      ]}
    />
  )
}
