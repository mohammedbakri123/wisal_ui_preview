import { useState } from 'react'
import { useNavigate } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'

const initialReports = [
  { id: 'r1', title: 'Message in Design Team', description: 'Reported for spam by two members.', severity: 'High' },
  { id: 'r2', title: 'Profile report', description: 'Avatar and display name need moderator review.', severity: 'Medium' },
  { id: 'r3', title: 'Group invite abuse', description: 'Repeated unwanted invitations reported.', severity: 'Open' },
]

export default function ReportedContentPage() {
  const navigate = useNavigate()
  const [reports, setReports] = useState(initialReports)

  if (reports.length === 0) {
    return (
      <FeatureScaffold
        title="Reported Content"
        description="There are no open reports in the moderation queue."
        backTo={ROUTES.MODERATION.DASHBOARD}
      />
    )
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <PageContainer className="mx-auto w-full max-w-2xl space-y-3 px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.MODERATION.DASHBOARD} label="Dashboard" />
        {reports.map((report) => (
          <article key={report.id} className="rounded-2xl border border-border-light/40 bg-surface p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{report.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground/80">{report.description}</p>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground">
                {report.severity}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => setReports((current) => current.filter((item) => item.id !== report.id))}>
                Dismiss
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setReports((current) => current.filter((item) => item.id !== report.id))}>
                Warn
              </Button>
              <Button size="sm" variant="danger" onClick={() => setReports((current) => current.filter((item) => item.id !== report.id))}>
                Ban
              </Button>
            </div>
          </article>
        ))}
      </PageContainer>
    </div>
  )
}
