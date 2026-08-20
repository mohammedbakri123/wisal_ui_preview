import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Avatar } from '@/core/components/ui/Avatar'
import { mockConversations } from '@/mocks/data/conversations'

export default function SearchPage() {
  const navigate = useNavigate()
  
  const [query, setQuery] = useState('')
  type SearchTab = 'all' | 'chats' | 'messages'
  const [activeTab, setActiveTab] = useState<SearchTab>('all')

  const tabs: Array<{ id: SearchTab; label: string }> = [
    { id: 'all', label: 'الكل' },
    { id: 'chats', label: 'المحادثات' },
    { id: 'messages', label: 'الرسائل' },
  ]

  const filteredChats = mockConversations.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    (c.lastMessage && c.lastMessage.toLowerCase().includes(query.toLowerCase()))
  )

  const handleItemClick = (id: string) => {
    navigate(`/home/c/${id}`)
  }

  const recentSearches = ['Design Team', 'Sam Rivera', 'CI pipeline']

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '380px', height: '380px',
            background: 'radial-gradient(circle, rgba(14,165,131,0.07) 0%, transparent 70%)',
            top: '-100px', right: '-60px',
            animation: 'drift 22s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '260px', height: '260px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
            bottom: '-40px', left: '-40px',
            animation: 'drift 28s ease-in-out 5s infinite reverse',
          }}
        />
      </div>

      <PageContainer className="mx-auto w-full max-w-2xl px-3 sm:px-5 relative">
        {/* Editorial hero */}
        <section className="pt-6 sm:pt-8 pb-1">
          <div className="animate-reveal">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/70">
              بحث
            </span>
            <h1 className="font-serif italic text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] leading-[1.1] mt-2 text-foreground tracking-tight">
              البحث
            </h1>
            <p className="text-sm text-muted-foreground/50 mt-2 max-w-md leading-relaxed">
              ابحث في المحادثات والرسائل وجهات الاتصال عبر وصال.
            </p>
          </div>
          <div className="mt-4 sm:mt-5 h-px bg-gradient-to-r from-accent/25 via-accent/5 to-transparent" />
        </section>

        {/* Search controls */}
        <div className="pt-5 sm:pt-6 space-y-4">
          {/* Search input bar */}
          <div className="group flex items-center bg-surface/60 border border-border-light/20 rounded-2xl px-4 py-3 focus-within:border-accent/30 focus-within:ring-2 focus-within:ring-accent/10 transition-all duration-300">
            <svg className="h-5 w-5 text-muted-foreground/30 group-focus-within:text-accent/50 transition-colors me-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              placeholder="ابحث في المحادثات والرسائل وجهات الاتصال..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/40"
              autoFocus
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="p-0.5 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer ms-2 shrink-0"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {/* Categories Tabs */}
          <div className="flex gap-1.5 p-1 bg-surface/40 rounded-2xl border border-border-light/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 text-center py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-accent/15 text-accent shadow-sm shadow-accent/5'
                    : 'text-muted-foreground/60 hover:text-foreground/80 hover:bg-surface-hover'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results / Details list */}
        <div className="pt-5 sm:pt-6 pb-10 sm:pb-12 lg:pb-16">
          {query === '' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <svg className="h-3.5 w-3.5 text-muted-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground/50 uppercase tracking-[0.15em]">عمليات البحث الأخيرة</span>
              </div>
              <div className="space-y-1.5">
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="group flex w-full items-center justify-between rounded-2xl border border-border-light/10 bg-surface/30 p-3.5 sm:p-4 text-start text-sm transition-all duration-200 hover:bg-surface/60 hover:border-border-light/30 cursor-pointer"
                  >
                    <span className="text-foreground/70 group-hover:text-foreground font-medium transition-colors">{term}</span>
                    <svg className="h-4 w-4 text-muted-foreground/20 group-hover:text-muted-foreground/50 transition-colors rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground/50 uppercase tracking-[0.15em]">النتائج</span>
                  <span className="text-[11px] text-muted-foreground/30 font-medium">({filteredChats.length})</span>
                </div>
                {filteredChats.length > 0 && (
                  <span className="text-[10px] text-muted-foreground/20">اختر محادثة لفتحها</span>
                )}
              </div>
              {filteredChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-surface/40 border border-border-light/10 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-muted-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground/60">لا توجد نتائج</p>
                  <p className="text-xs text-muted-foreground/40 mt-1 max-w-xs">جرّب كلمة بحث مختلفة أو تحقق من الإملاء.</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-border-light/10 bg-surface/20 divide-y divide-border-light/5">
                  {filteredChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => handleItemClick(chat.id)}
                      className="group w-full flex items-center gap-3.5 p-3.5 sm:p-4 hover:bg-surface/40 transition-all text-start cursor-pointer"
                    >
                      <div className="relative shrink-0">
                        <Avatar src={chat.avatar} alt={chat.name} size="sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate text-foreground/80 group-hover:text-foreground transition-colors">{chat.name}</p>
                        <p className="text-xs text-muted-foreground/50 truncate mt-0.5">{chat.lastMessage}</p>
                      </div>
                      <svg className="h-4 w-4 text-muted-foreground/15 group-hover:text-muted-foreground/40 transition-colors shrink-0 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  )
}
