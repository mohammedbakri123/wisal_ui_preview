import { useParams } from 'react-router'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'
import { channelPosts } from '../data'
import { ChannelPost } from '../components/ChannelPost'
import { Sheet } from '@/core/components/ui/Sheet'
import { useChannels } from '../context/useChannels'

export default function ChannelFeedPage() {
  const navigate = useNavigate()
  const { channelId } = useParams()
  const { channels } = useChannels()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]
  const posts = channel.id.startsWith('channel-')
    ? (channel.lastPost ? [channel.lastPost] : [])
    : channelPosts
  const [reportOpen, setReportOpen] = useState(false)
  const [reportSent, setReportSent] = useState(false)

  return (
    <div className="flex h-full flex-col bg-background">
      <PageContainer className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.CHANNEL.ROOT} />
        <div className="mx-auto max-w-3xl">
          <section className="border-b border-[#2f3336] px-4 pb-5 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">Broadcast channel</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <div><h2 className="text-[20px] font-bold text-[#e7e9ea]">{channel.name}</h2><p className="mt-1 text-[13px] leading-relaxed text-[#71767b]">{channel.description}</p></div>
              <button type="button" onClick={() => navigate(`/channels/${channel.id}/details`)} className="rounded-full p-2 text-[#71767b] hover:bg-white/[0.06] hover:text-[#e7e9ea] cursor-pointer" aria-label="Channel details">ⓘ</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => navigate(`/channels/${channel.id}/details`)}>Channel info</Button>
              {channel.admin && (
                <Button size="sm" variant="secondary" onClick={() => navigate(`/channels/${channel.id}/analytics`)}>
                  Analytics
                </Button>
              )}
            </div>
          </section>
          <div className="border-x border-[#2f3336]">
          {posts.map((post, index) => (
            <ChannelPost
              key={post}
              title={`Post ${index + 1}`}
              body={post}
              meta={index === 0 ? 'Pinned' : 'Live'}
              onReport={() => { setReportSent(false); setReportOpen(true) }}
            />
          ))}
          </div>
        </div>
      </PageContainer>
      <Sheet open={reportOpen} onClose={() => setReportOpen(false)} title="Report post">
        {reportSent ? (
          <div className="py-8 text-center"><p className="text-[15px] font-bold text-[#e7e9ea]">Report submitted</p><p className="mt-1 text-sm text-[#71767b]">Thanks for helping keep Wisal useful.</p><Button size="sm" className="mt-5" onClick={() => setReportOpen(false)}>Done</Button></div>
        ) : (
          <div className="space-y-4"><p className="text-sm leading-relaxed text-[#71767b]">Tell us why this post should be reviewed.</p><select className="h-11 w-full rounded-full border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0]"><option>Spam or misleading</option><option>Harassment or abuse</option><option>Harmful content</option><option>Something else</option></select><Button className="w-full" onClick={() => setReportSent(true)}>Send report</Button></div>
        )}
      </Sheet>
    </div>
  )
}
