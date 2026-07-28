import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function DevicesPage() {
  return (
    <FeatureScaffold
      title="Devices"
      description="View and manage active sessions and linked devices."
      backTo={ROUTES.SETTINGS.ROOT}
      sections={[
        {
          title: 'Active sessions',
          items: [
            { title: 'Chrome on Linux', description: 'Current session in Asia/Aden timezone.', meta: 'Current' },
            { title: 'Safari on iPhone', description: 'Last active 2 days ago.', meta: 'Mobile' },
            { title: 'Remote logout', description: 'End access for devices you no longer use.', meta: 'Action' },
          ],
        },
      ]}
    />
  )
}
