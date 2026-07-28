import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { ROUTES } from '@/core/utils/routes'

export default function PrivacySettingsPage() {
  const navigate = useNavigate()

  const [lastSeen, setLastSeen] = useState('everyone')
  const [profilePhoto, setProfilePhoto] = useState('everyone')
  const [readReceipts, setReadReceipts] = useState(true)
  const [screenLock, setScreenLock] = useState(false)

  return (
    <div className="flex flex-col h-full bg-background">
      <PageContainer className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.SETTINGS.ROOT} label="Settings" />
        <div className="max-w-lg mx-auto space-y-4 sm:space-y-5">
          {/* Visibility */}
          <section className="bg-surface rounded-2xl border border-border-light/40 overflow-hidden">
            <div className="p-4 border-b border-border-light/30">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Visibility</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Who can see my Last Seen</label>
                <select
                  value={lastSeen}
                  onChange={(e) => setLastSeen(e.target.value)}
                  className="w-full bg-background border border-border-light/50 rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer transition-all"
                >
                  <option value="everyone">Everyone</option>
                  <option value="contacts">My Contacts</option>
                  <option value="nobody">Nobody</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Who can see my Profile Photo</label>
                <select
                  value={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                  className="w-full bg-background border border-border-light/50 rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer transition-all"
                >
                  <option value="everyone">Everyone</option>
                  <option value="contacts">My Contacts</option>
                  <option value="nobody">Nobody</option>
                </select>
              </div>
            </div>
          </section>

          {/* Chat Options */}
          <section className="bg-surface rounded-2xl border border-border-light/40 overflow-hidden">
            <div className="p-4 border-b border-border-light/30">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chat Options</h3>
            </div>
            <div className="divide-y divide-border-light/30">
              <PrivacyToggleRow label="Read Receipts" description="If turned off, you won't send or receive read receipts." checked={readReceipts} onChange={setReadReceipts} />
              <PrivacyToggleRow label="App Screen Lock" description="Require passcode or fingerprint to unlock the app." checked={screenLock} onChange={setScreenLock} />
            </div>
          </section>

          {/* Blocked contacts */}
          <button className="w-full flex items-center justify-between p-4 bg-surface rounded-2xl border border-border-light/40 hover:bg-surface-hover transition-all cursor-pointer">
            <div className="text-left">
              <p className="text-sm font-semibold">Blocked Contacts</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">Manage contacts you blocked from messaging you.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60 shrink-0">
              <span>0</span>
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </div>
      </PageContainer>
    </div>
  )
}

function PrivacyToggleRow({ label, description, checked, onChange }: {
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
