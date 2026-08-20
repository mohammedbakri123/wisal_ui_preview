import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Sheet } from '@/core/components/ui/Sheet'
import type { Message } from '@/core/types'
import { mockConversations } from '@/mocks/data/conversations'
import { mockMessages } from '@/mocks/data/messages'

type Tab = 'media' | 'links'

export default function SharedMediaPage() {
  const { conversationId } = useParams()
  const [tab, setTab] = useState<Tab>('media')
  const [selectedMedia, setSelectedMedia] = useState<Message | null>(null)
  const conversation = mockConversations.find((item) => item.id === conversationId) ?? mockConversations[0]
  const messages = useMemo(() => mockMessages[conversation.id] ?? [], [conversation.id])
  const media = useMemo(() => messages.filter((message) => message.type === 'image' || message.type === 'file'), [messages])
  const links = useMemo(() => messages.filter((message) => /https?:\/\//.test(message.content)), [messages])

  return <div className="flex h-full flex-col overflow-hidden bg-black text-[#e7e9ea]"><PageContainer className="w-full max-w-2xl px-3 pt-3 sm:px-4"><BackButton to={`/home/${conversation.type === 'group' ? 'g' : 'c'}/${conversation.id}/details`} label="تفاصيل المحادثة" /><div className="mt-3 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-[#71767b]">المحتوى المشترك</p><h1 className="mt-1 text-[20px] font-bold">{conversation.name}</h1></div><span className="text-xs text-[#71767b]">{tab === 'media' ? media.length : links.length} عناصر</span></div><div className="mt-4 flex border-b border-[#2f3336]"><TabButton active={tab === 'media'} onClick={() => setTab('media')}>الوسائط والملفات</TabButton><TabButton active={tab === 'links'} onClick={() => setTab('links')}>الروابط</TabButton></div>{tab === 'media' ? <div className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3">{media.length ? media.map((message) => <button type="button" key={message.id} onClick={() => setSelectedMedia(message)} className="group aspect-square rounded-xl border border-[#2f3336] bg-[#16181c] p-3 text-start transition-colors hover:border-[#536471] hover:bg-[#202327] cursor-pointer"><div className="flex h-full items-center justify-center text-center"><div><p className="text-2xl text-[#1d9bf0]">{message.type === 'image' ? '▧' : 'DOC'}</p><p className="mt-2 line-clamp-2 text-xs text-[#71767b] group-hover:text-[#e7e9ea]">{message.content}</p><p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#1d9bf0] opacity-0 transition-opacity group-hover:opacity-100">فتح</p></div></div></button>) : <EmptyMedia label="لا توجد وسائط مشتركة بعد" />}</div> : <div className="space-y-2 py-4">{links.length ? links.map((message) => <a key={message.id} href={message.content.match(/https?:\/\/\S+/)?.[0] ?? '#'} target="_blank" rel="noreferrer" className="block rounded-xl border border-[#2f3336] bg-[#16181c] p-3 text-sm text-[#1d9bf0] hover:bg-white/[0.03]">{message.content}</a>) : <EmptyMedia label="لا توجد روابط مشتركة بعد" />}</div>}</PageContainer><Sheet open={selectedMedia !== null} onClose={() => setSelectedMedia(null)} title="معاينة الوسائط" className="max-w-3xl">{selectedMedia && <div className="flex min-h-[360px] flex-col items-center justify-center text-center"><div className="flex h-56 w-full items-center justify-center rounded-2xl border border-[#2f3336] bg-[#16181c] text-[#1d9bf0]"><span className="text-6xl">{selectedMedia.type === 'image' ? '▧' : 'DOC'}</span></div><p className="mt-4 max-w-lg text-sm leading-relaxed text-[#e7e9ea]">{selectedMedia.content}</p><p className="mt-1 text-xs text-[#71767b]">شاركها {selectedMedia.sender.name}</p></div>}</Sheet></div>
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) { return <button type="button" onClick={onClick} className={`border-b-2 px-3 pb-3 text-sm font-bold cursor-pointer ${active ? 'border-[#1d9bf0] text-[#1d9bf0]' : 'border-transparent text-[#71767b] hover:text-[#e7e9ea]'}`}>{children}</button> }
function EmptyMedia({ label }: { label: string }) { return <div className="col-span-full py-14 text-center text-sm text-[#71767b]">{label}</div> }
