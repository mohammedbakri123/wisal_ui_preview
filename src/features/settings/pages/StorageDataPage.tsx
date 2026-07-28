import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function StorageDataPage() {
  return (
    <FeatureScaffold
      title="Storage & Data"
      description="Review cached media, network usage, and automatic download preferences."
      backTo={ROUTES.SETTINGS.ROOT}
      stats={[
        { label: 'Media cache', value: '248 MB' },
        { label: 'Documents', value: '41 MB' },
        { label: 'Network', value: '1.2 GB' },
        { label: 'Backups', value: '3' },
      ]}
      sections={[
        {
          title: 'Controls',
          items: [
            { title: 'Auto-download images', description: 'Download on Wi-Fi and cellular.', meta: 'On' },
            { title: 'Auto-download files', description: 'Download only when connected to Wi-Fi.', meta: 'Wi-Fi' },
            { title: 'Clear media cache', description: 'Remove cached media from this device.', meta: 'Action' },
          ],
        },
      ]}
    />
  )
}
