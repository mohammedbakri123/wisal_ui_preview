import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { ROUTES } from '@/core/utils/routes'
import { CommunityCard } from '../components/CommunityCard'
import { communities } from '../data'

export default function DiscoverCommunitiesPage() {
  return (
    <div className="flex h-full flex-col bg-background">
      <PageContainer className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.COMMUNITY.ROOT} />
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-border-light/40 bg-surface p-4 sm:p-5">
            <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Browse Directory</span>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">Explore communities</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80 max-w-xl">
              Find and join organized spaces by topic, size, and activity levels.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Recommended for you
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {communities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
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

