import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { Avatar } from '@/core/components/ui/Avatar'
import { ROUTES } from '@/core/utils/routes'
import { cn } from '@/core/utils/cn'
import { channelPosts } from '../data'
import { Sheet } from '@/core/components/ui/Sheet'
import { useChannels } from '../context/useChannels'

export default function ChannelFeedPage() {
  const navigate = useNavigate()
  const { channelId } = useParams()
  const { channels, toggleFollow } = useChannels()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]
  const posts = channel.id.startsWith('channel-')
    ? (channel.lastPost ? [channel.lastPost] : [])
    : channelPosts
  const [reportOpen, setReportOpen] = useState(false)
  const [reportSent, setReportSent] = useState(false)

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      {/* Chat-style header */}
      <header className="flex items-center gap-3 border-b border-[#2f3336] bg-black/65 px-2 py-2.5 backdrop-blur-md">
        <BackButton to={ROUTES.CHANNEL.ROOT} />
        <Avatar
          src={null}
          alt={channel.name}
          size="md"
          className="shrink-0 bg-[#1d9bf0]/20 text-[#1d9bf0]"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[15px] font-bold text-[#e7e9ea]">{channel.name}</p>
            {channel.verified && (
              <svg className="h-4 w-4 shrink-0 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <p className="text-xs text-[#71767b]">قناة بث · {channel.subscribers} مشترك</p>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/channels/${channel.id}/details`)}
          className="rounded-full p-2 text-[#71767b] transition-colors hover:bg-white/[0.06] hover:text-[#e7e9ea] cursor-pointer"
          aria-label="تفاصيل القناة"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        </button>
      </header>

      {/* Broadcast messages */}
      <main className="flex-1 overflow-y-auto px-4 py-5">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          <div className="mb-2 flex flex-col items-center gap-1.5 text-center">
            <Avatar
              src={null}
              alt={channel.name}
              size="lg"
              className="bg-[#1d9bf0]/20 text-[#1d9bf0]"
            />
            <p className="mt-1 text-sm font-bold text-[#e7e9ea]">{channel.name}</p>
            <p className="max-w-sm text-xs leading-relaxed text-[#71767b]">{channel.description}</p>
            <p className="text-[11px] text-[#536471]">قناة بث · يمكن للمسؤولين فقط النشر</p>
          </div>

          {posts.map((post, index) => (
            <article
              key={post}
              className={cn(
                'max-w-[85%] rounded-2xl border border-[#2f3336] bg-[#16181c] px-4 py-3 shadow-sm',
                index === 0 && 'mt-4',
              )}
            >
              <div className="mb-1.5 flex items-center gap-2 text-[11px] text-[#71767b]">
                <span className="font-bold text-[#1d9bf0]">{channel.name}</span>
                <span>·</span>
                <span>{index === 0 ? 'مثبت' : 'مباشر'}</span>
                <span>·</span>
                <span>{channel.lastPostTime}</span>
              </div>
              <p className="whitespace-pre-wrap text-[15px] leading-6 text-[#e7e9ea]">{post}</p>
              <button
                type="button"
                onClick={() => { setReportSent(false); setReportOpen(true) }}
                className="mt-2 ms-auto block rounded-full px-2 py-1 text-[11px] text-[#71767b] transition-colors hover:bg-[#f4212e]/10 hover:text-[#f4212e] cursor-pointer"
              >
                إبلاغ
              </button>
            </article>
          ))}
        </div>
      </main>

      {/* Composer bar — read-only for members */}
      <footer className="border-t border-[#2f3336] bg-black/65 px-3 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          {channel.admin ? (
            <button
              type="button"
              onClick={() => navigate(`/channels/${channel.id}/posts`)}
              className="flex h-11 w-full items-center gap-3 rounded-full border border-[#2f3336] bg-[#16181c] px-4 text-start transition-colors hover:bg-[#202327] cursor-pointer"
            >
              <svg className="h-5 w-5 shrink-0 text-[#1d9bf0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
              <span className="text-sm text-[#71767b]">إدارة المنشورات ونشر تحديث جديد…</span>
            </button>
          ) : channel.joined ? (
            <div className="flex h-11 w-full items-center gap-3 rounded-full border border-[#2f3336] bg-[#16181c] px-4 opacity-80">
              <svg className="h-5 w-5 shrink-0 text-[#71767b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="truncate text-sm text-[#71767b]">فقط المدير يمكنه نشر التحديثات في هذه القناة</span>
            </div>
          ) : (
            <Button className="h-11 w-full" onClick={() => toggleFollow(channel.id)}>
              انضمام إلى القناة
            </Button>
          )}
        </div>
      </footer>

      <Sheet open={reportOpen} onClose={() => setReportOpen(false)} title="الإبلاغ عن المنشور">
        {reportSent ? (
          <div className="py-8 text-center"><p className="text-[15px] font-bold text-[#e7e9ea]">تم إرسال البلاغ</p><p className="mt-1 text-sm text-[#71767b]">شكرًا لمساعدتنا في إبقاء وصال مفيدًا.</p><Button size="sm" className="mt-5" onClick={() => setReportOpen(false)}>تم</Button></div>
        ) : (
          <div className="space-y-4"><p className="text-sm leading-relaxed text-[#71767b]">أخبرنا لماذا يجب مراجعة هذا المنشور.</p><select className="h-11 w-full rounded-full border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0]"><option>بريد عشوائي أو مضلل</option><option>مضايقة أو إساءة</option><option>محتوى ضار</option><option>شيء آخر</option></select><Button className="w-full" onClick={() => setReportSent(true)}>إرسال البلاغ</Button></div>
        )}
      </Sheet>
    </div>
  )
}