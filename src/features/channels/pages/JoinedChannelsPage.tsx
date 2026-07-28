import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Button } from '@/core/components/ui/Button'
import { PullToRefresh } from '@/core/components/ui/PullToRefresh'
import { ROUTES } from '@/core/utils/routes'
import { ChannelCard } from '../components/ChannelCard'
import { channels as channelsData } from '../data'

export default function JoinedChannelsPage() {
  const navigate = useNavigate()
  const [channels, setChannels] = useState(channelsData)
  const joined = channels.filter((channel) => channel.joined)

  const handleRefresh = async () => {
    // Simulate refresh
    await new Promise((r) => setTimeout(r, 800))
    setChannels([...channelsData])
  }

  return (
    <div className="flex h-full flex-col bg-background">

      <PullToRefresh onRefresh={handleRefresh} className="flex-1 overflow-hidden">
        {(setScrollRef) => (
          <PageContainer className="w-full px-3 sm:px-4" ref={setScrollRef}>
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
              <section className="rounded-2xl border border-border-light/40 bg-surface p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">Joined channels</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80 max-w-xl">
                  Follow broadcast spaces for product releases, design notes, and engineering updates.
                </p>
                <Button className="mt-4" size="sm" onClick={() => navigate(ROUTES.CHANNEL.DISCOVER)}>
                  Discover channels
                </Button>
              </section>
              <div className="grid gap-3 sm:grid-cols-2">
                {joined.map((channel) => <ChannelCard key={channel.id} channel={channel} />)}
              </div>
            </div>
          </PageContainer>
        )}
      </PullToRefresh>
    </div>
  )
}
