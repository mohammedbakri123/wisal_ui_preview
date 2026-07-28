import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'
import { ChannelCard } from '../components/ChannelCard'
import { channels } from '../data'

export default function DiscoverChannelsPage() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col bg-background">
      <PageContainer className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.CHANNEL.ROOT} />
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-border-light/40 bg-surface p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">Discover</span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">Public broadcast channels</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80 max-w-xl">
                  Follow your favorite creators and teams to receive announcements, design notes, and updates.
                </p>
              </div>
              <Button
                size="sm"
                variant="primary"
                className="shrink-0 w-full sm:w-auto"
                onClick={() => navigate(ROUTES.CHANNEL.CREATE)}
              >
                Create channel
              </Button>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Featured channels
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {channels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  discover={true}
                />
              ))}
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  )
}

