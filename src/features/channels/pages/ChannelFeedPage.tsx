import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'
import { channelPosts, channels } from '../data'
import { ChannelPost } from '../components/ChannelPost'

export default function ChannelFeedPage() {
  const navigate = useNavigate()
  const { channelId } = useParams()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]

  return (
    <div className="flex h-full flex-col bg-background">
      <PageContainer className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.CHANNEL.ROOT} />
        <div className="max-w-3xl mx-auto space-y-4">
          <section className="rounded-2xl border border-border-light/40 bg-surface p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Channel feed</p>
            <h2 className="mt-2 text-lg sm:text-xl font-bold">{channel.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80">{channel.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => navigate(`/channels/${channel.id}/details`)}>
                Details
              </Button>
              {channel.admin && (
                <Button size="sm" variant="secondary" onClick={() => navigate(`/channels/${channel.id}/analytics`)}>
                  Analytics
                </Button>
              )}
            </div>
          </section>
          {channelPosts.map((post, index) => (
            <ChannelPost
              key={post}
              title={`Post ${index + 1}`}
              body={post}
              meta={index === 0 ? 'Pinned' : 'Live'}
            />
          ))}
        </div>
      </PageContainer>
    </div>
  )
}
