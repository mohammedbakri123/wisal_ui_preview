import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Sheet } from '@/core/components/ui/Sheet'
import { ROUTES } from '@/core/utils/routes'
import { useChannels } from '../context/useChannels'

export default function ChannelDetailsPage() {
  const navigate = useNavigate()
  const { channelId } = useParams()
  const { channels, toggleFollow } = useChannels()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]
  const [copied, setCopied] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [reported, setReported] = useState(false)
  const inviteLink = `https://wisaL.test/channels/${channel.id}/join`

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PageContainer className="w-full px-4 pt-3 pb-8">
        <div className="mx-auto max-w-2xl">
          <BackButton to={`/channels/${channel.id}`} />
          <header className="mt-2 rounded-2xl border border-[#2f3336] bg-[#16181c] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">Channel profile</p>
            <h1 className="mt-2 text-2xl font-bold">{channel.name}</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#71767b]">{channel.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => toggleFollow(channel.id)}>{channel.joined ? 'Following' : 'Follow channel'}</Button>
              <Button size="sm" variant="secondary" onClick={() => navigate(`/channels/${channel.id}/invite`)}>Invite</Button>
              {channel.admin && <Button size="sm" variant="secondary" onClick={() => navigate(ROUTES.CHANNEL.SETTINGS.replace(':channelId', channel.id))}>Settings</Button>}
            </div>
          </header>

          <section className="mt-6 grid grid-cols-2 divide-x divide-y divide-[#2f3336] overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c] sm:grid-cols-4 sm:divide-y-0">
            <Stat label="Subscribers" value={channel.subscribers} />
            <Stat label="Posts" value={String(channel.posts)} />
            <Stat label="Admins" value={channel.admin ? '3' : '2'} />
            <Stat label="Status" value={channel.joined ? 'Joined' : 'Public'} />
          </section>

          <section className="mt-6 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
            <Row label="Invite link" description={inviteLink} value={copied ? 'Copied' : 'Copy'} onClick={() => setCopied(true)} />
            <Row label="Pinned posts" description="Open the channel feed to review pinned updates." value="View" onClick={() => navigate(`/channels/${channel.id}`)} />
            <Row label="Report channel" description="Send a report for moderator review." value="Report" danger onClick={() => { setReported(false); setReportOpen(true) }} />
            {channel.admin && <Row label="Manage channel" description="Manage administrators and published posts." value="Open" onClick={() => navigate(ROUTES.CHANNEL.ADMINS.replace(':channelId', channel.id))} />}
          </section>
        </div>
      </PageContainer>

      <Sheet open={reportOpen} onClose={() => setReportOpen(false)} title="Report channel">
        {reported ? (
          <div className="py-5 text-center"><p className="font-bold">Report submitted</p><p className="mt-1 text-sm text-[#71767b]">The channel has been sent for review.</p><Button size="sm" className="mt-4" onClick={() => setReportOpen(false)}>Done</Button></div>
        ) : (
          <div><p className="text-sm text-[#71767b]">Tell us why this channel should be reviewed.</p><select className="mt-4 h-11 w-full rounded-full border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0]"><option>Spam or misleading</option><option>Harassment or abuse</option><option>Harmful content</option></select><Button className="mt-4 w-full" onClick={() => setReported(true)}>Send report</Button></div>
        )}
      </Sheet>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="p-4"><p className="text-xs text-[#71767b]">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>
}

function Row({ label, description, value, onClick, danger = false }: { label: string; description: string; value: string; onClick: () => void; danger?: boolean }) {
  return <button type="button" onClick={onClick} className="flex w-full items-center gap-4 border-b border-[#2f3336] p-4 text-left last:border-b-0 hover:bg-white/[0.03] cursor-pointer"><span className="min-w-0 flex-1"><span className={`block text-sm font-bold ${danger ? 'text-[#f4212e]' : ''}`}>{label}</span><span className="mt-1 block truncate text-xs text-[#71767b]">{description}</span></span><span className={`shrink-0 text-xs font-bold ${danger ? 'text-[#f4212e]' : 'text-[#1d9bf0]'}`}>{value}</span></button>
}
