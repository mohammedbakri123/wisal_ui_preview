import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { ROUTES } from '@/core/utils/routes'

export default function NotificationSettingsPage() {
  const navigate = useNavigate()

  const [pushEnabled, setPushEnabled] = useState(true)
  const [groupAlerts, setGroupAlerts] = useState(true)
  const [soundsEnabled, setSoundsEnabled] = useState(true)
  const [previewEnabled, setPreviewEnabled] = useState(true)

  return (
    <div className="flex flex-col h-full bg-background">
      <PageContainer className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.SETTINGS.ROOT} label="Settings" />
        <div className="max-w-lg mx-auto">
          <section className="bg-surface rounded-2xl border border-border-light/40 overflow-hidden">
            <div className="p-4 border-b border-border-light/30">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notifications</h3>
            </div>
            <div className="divide-y divide-border-light/30">
              <ToggleRow label="Push Notifications" description="Receive alerts for direct messages." checked={pushEnabled} onChange={setPushEnabled} />
              <ToggleRow label="Group Notifications" description="Receive alerts for activity in group chats." checked={groupAlerts} onChange={setGroupAlerts} />
              <ToggleRow label="Sound Effects" description="Play a sound when a new message arrives." checked={soundsEnabled} onChange={setSoundsEnabled} />
              <ToggleRow label="Show Previews" description="Show message preview text in banner notifications." checked={previewEnabled} onChange={setPreviewEnabled} />
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  )
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-2">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>
  )
}
