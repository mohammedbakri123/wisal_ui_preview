import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function ModerationDashboardPage() {
  return (
    <FeatureScaffold
      title="Moderation"
      description="Review reports, bans, moderation logs, and platform safety rules."
      actions={[
        { label: 'Reports', path: ROUTES.MODERATION.REPORTS },
        { label: 'Banned users', path: ROUTES.MODERATION.BANS, variant: 'secondary' },
      ]}
      stats={[
        { label: 'Open reports', value: '7' },
        { label: 'High risk', value: '2' },
        { label: 'Bans', value: '14' },
        { label: 'Rules', value: '9' },
      ]}
      sections={[
        {
          title: 'Queue',
          items: [
            { title: 'Reported messages', description: 'Messages flagged by users or automated rules.', path: ROUTES.MODERATION.REPORTS },
            { title: 'Ban review', description: 'Users with active restrictions and appeal context.', path: ROUTES.MODERATION.BANS },
          ],
        },
      ]}
    />
  )
}
