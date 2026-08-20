import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { ROUTES } from '@/core/utils/routes'
import { mockConversations } from '@/mocks/data/conversations'
import { mockMessages } from '@/mocks/data/messages'
import type { Conversation, Message } from '@/core/types'
import { Avatar } from '@/core/components/ui/Avatar'

export default function SearchMessagesPage() {
  const navigate = useNavigate()
  const { conversationId } = useParams()
  const [query, setQuery] = useState('')
  const lowered = query.toLowerCase()
  const matchingConversations = conversationId
    ? mockConversations.filter((conversation) => conversation.id === conversationId)
    : mockConversations
  const results = query.trim()
    ? matchingConversations.flatMap((conversation) =>
        (mockMessages[conversation.id] ?? [])
          .filter((message) => message.content.toLowerCase().includes(lowered))
          .map((message) => ({ conversation, message })),
      )
    : []

  return (
    <div className="flex h-full flex-col bg-background relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
            top: '-80px', left: '-40px',
            animation: 'drift 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(14,165,131,0.04) 0%, transparent 70%)',
            bottom: '-40px', right: '-40px',
            animation: 'drift 30s ease-in-out 6s infinite reverse',
          }}
        />
      </div>

      <PageContainer className="mx-auto w-full max-w-2xl px-3 sm:px-5 relative">
        {/* Editorial hero */}
        <section className="pt-6 sm:pt-8 pb-1">
          <div className="flex items-start justify-between">
            <div className="animate-reveal">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/70">
                Search
              </span>
              <h1 className="font-serif italic text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.1] mt-2 text-foreground tracking-tight">
                Messages
              </h1>
              <p className="text-sm text-muted-foreground/50 mt-2 max-w-md leading-relaxed hidden sm:block">
                ابحث عن الرسائل عبر جميع محادثاتك.
              </p>
            </div>
            <BackButton to={conversationId ? `/home/${conversationId.startsWith('g') ? 'g' : 'c'}/${conversationId}` : ROUTES.CHAT.SEARCH} label={conversationId ? 'المحادثة' : 'البحث'} />
          </div>
          <div className="mt-4 sm:mt-5 h-px bg-gradient-to-r from-accent/25 via-accent/5 to-transparent" />
        </section>

        {/* Search input */}
        <div className="pt-5 sm:pt-6 space-y-4">
          <div className="group flex items-center bg-surface/60 border border-border-light/20 rounded-2xl px-4 py-3 focus-within:border-accent/30 focus-within:ring-2 focus-within:ring-accent/10 transition-all duration-300">
            <svg className="h-5 w-5 text-muted-foreground/30 group-focus-within:text-accent/50 transition-colors me-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
              placeholder="ابحث في نص الرسائل"
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/40"
            />
            {!conversationId && <button
              onClick={() => navigate(ROUTES.CHAT.SEARCH)}
              className="text-[11px] sm:text-xs font-semibold text-accent/70 hover:text-accent transition-colors ms-2 shrink-0 whitespace-nowrap"
            >
              المحادثات <span className="rtl:hidden">&rarr;</span><span className="ltr:hidden">&larr;</span>
            </button>}
          </div>
        </div>

        {/* Results */}
        <div className="pt-5 sm:pt-6 pb-10 sm:pb-12 lg:pb-16">
          {query && results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-14 w-14 rounded-2xl bg-surface/40 border border-border-light/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-muted-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-muted-foreground/60">لم يتم العثور على رسائل</p>
              <p className="text-xs text-muted-foreground/40 mt-1 max-w-xs">جرب مصطلح بحث مختلف.</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1 pb-2">
                <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground/50 uppercase tracking-[0.15em]">النتائج</span>
                <span className="text-[11px] text-muted-foreground/30 font-medium">({results.length})</span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border-light/10 bg-surface/20 divide-y divide-border-light/5">
                {results.map(({ conversation, message }) => (
                  <MessageSearchResult key={`${conversation.id}-${message.id}`} conversation={conversation} message={message} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </PageContainer>
    </div>
  )
}

function MessageSearchResult({ conversation, message }: { conversation: Conversation; message: Message }) {
  const navigate = useNavigate()
  const path = conversation.type === 'group' ? `/home/g/${conversation.id}` : `/home/c/${conversation.id}`

  return (
    <button
      type="button"
      onClick={() => navigate(path, { state: { highlightMessageId: message.id } })}
      className="group flex w-full items-start gap-3 border-b border-[#2f3336] px-4 py-3.5 text-start transition-colors hover:bg-white/[0.03] active:bg-white/[0.06] cursor-pointer"
    >
      <Avatar src={message.sender.avatar ?? conversation.avatar} alt={message.sender.name} size="sm" online={message.sender.isOnline} />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-bold text-[#e7e9ea] group-hover:text-[#1d9bf0]">{conversation.name}</span>
          <span className="shrink-0 text-[11px] text-[#71767b]">{message.sender.name}</span>
        </span>
        <span className="mt-1 block break-words text-sm leading-relaxed text-[#71767b]">{message.content}</span>
      </span>
      <span className="shrink-0 pt-1 text-xs font-bold text-[#1d9bf0]">انتقال</span>
    </button>
  )
}
