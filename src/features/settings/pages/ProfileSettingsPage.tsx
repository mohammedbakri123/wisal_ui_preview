import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'
import { useAuth } from '@/app/providers/AuthProvider'
import { SettingsItem } from '../components/SettingsItem'

export default function ProfileSettingsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="flex h-full flex-col bg-background">
      <PageContainer className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.SETTINGS.ROOT} label="Settings" />
        <div className="max-w-lg mx-auto space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-border-light/40 bg-surface p-5 sm:p-6 text-center">
            <Avatar src={user?.avatar} alt={user?.name ?? 'User'} size="xl" online />
            <h2 className="mt-3.5 text-lg font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground/70 mt-1">{user?.bio ?? 'No bio set'}</p>
            <Button className="mt-4" size="sm" variant="secondary" onClick={() => navigate(ROUTES.PROFILE.EDIT)}>
              Edit public profile
            </Button>
          </section>
          <section className="overflow-hidden rounded-2xl border border-border-light/40 bg-surface">
            <SettingsItem title="Display name" description="Shown in chats, groups, and communities" value={user?.name ?? 'Unset'} />
            <SettingsItem title="Status message" description="Short availability note for contacts" value="Available" />
            <SettingsItem title="Avatar" description="Profile image and initials fallback" value="Default" />
          </section>
        </div>
      </PageContainer>
    </div>
  )
}
