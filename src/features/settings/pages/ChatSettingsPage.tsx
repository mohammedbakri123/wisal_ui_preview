import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function ChatSettingsPage() {
  return (
    <FeatureScaffold
      title="Chat Settings"
      description="Tune chat behavior, wallpapers, message composer preferences, backups, and archived chat handling."
      backTo={ROUTES.SETTINGS.ROOT}
      sections={[
        {
          title: 'Messaging',
          items: [
            { title: 'Enter to send', description: 'Send messages with Enter and insert line breaks with Shift+Enter.', meta: 'On' },
            { title: 'Font size', description: 'Use the standard compact chat font size.', meta: 'Standard' },
            { title: 'Wallpaper', description: 'Subtle grid texture used behind messages.', meta: 'Default' },
            { title: 'Chat backup', description: 'Local mock backup status for frontend planning.', meta: 'Ready' },
          ],
        },
      ]}
    />
  )
}
