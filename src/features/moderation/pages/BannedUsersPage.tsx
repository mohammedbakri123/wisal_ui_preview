import { useState } from 'react'
import { useNavigate } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'

const initialBans = [
  { id: 'b1', name: 'blocked_user_204', reason: 'Harassment policy violation.', duration: 'Permanent' },
  { id: 'b2', name: 'spam_account_81', reason: 'Automated spam invites.', duration: '30 days' },
]

export default function BannedUsersPage() {
  const navigate = useNavigate()
  const [bans, setBans] = useState(initialBans)

  if (bans.length === 0) {
    return (
      <FeatureScaffold
        title="Banned Users"
        description="No users are currently banned."
        backTo={ROUTES.MODERATION.DASHBOARD}
      />
    )
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <PageContainer className="mx-auto w-full max-w-2xl space-y-3 px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.MODERATION.DASHBOARD} label="Dashboard" />
        {bans.map((ban) => (
          <article key={ban.id} className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-border-light/40 bg-surface p-4 sm:p-5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{ban.name}</p>
              <p className="mt-1 text-xs text-muted-foreground/80">{ban.reason}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-muted-foreground/70">{ban.duration}</span>
              <Button size="sm" variant="secondary" onClick={() => setBans((current) => current.filter((item) => item.id !== ban.id))}>
                Lift ban
              </Button>
            </div>
          </article>
        ))}
      </PageContainer>
    </div>
  )
}
