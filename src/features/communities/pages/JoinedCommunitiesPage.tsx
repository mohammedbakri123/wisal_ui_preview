import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Button } from '@/core/components/ui/Button'
import { PullToRefresh } from '@/core/components/ui/PullToRefresh'
import { ROUTES } from '@/core/utils/routes'
import { CommunityCard } from '../components/CommunityCard'
import { communities as communitiesData } from '../data'

export default function JoinedCommunitiesPage() {
  const navigate = useNavigate()
  const [communities, setCommunities] = useState(communitiesData)
  const joined = communities.filter((c) => c.joined)

  const handleRefresh = async () => {
    await new Promise((r) => setTimeout(r, 800))
    setCommunities([...communitiesData])
  }

  return (
    <div className="flex h-full flex-col bg-background relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '380px', height: '380px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            top: '-100px', left: '-60px',
            animation: 'drift 22s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '280px', height: '280px',
            background: 'radial-gradient(circle, rgba(14,165,131,0.07) 0%, transparent 70%)',
            bottom: '-40px', right: '-40px',
            animation: 'drift 26s ease-in-out 3s infinite reverse',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
            top: '45%', left: '60%',
            animation: 'drift 28s ease-in-out 6s infinite',
          }}
        />
      </div>


      <PullToRefresh onRefresh={handleRefresh} className="flex-1 overflow-hidden">
        {(setScrollRef) => (
          <PageContainer className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl px-3 sm:px-5 lg:px-6" ref={setScrollRef}>
            {/* Editorial hero */}
            <section className="pt-5 sm:pt-7 lg:pt-9 pb-1">
              <div className="animate-reveal">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/80">
                  Workspaces
                </span>
                <h1 className="font-serif italic text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.1] mt-2 text-foreground tracking-tight">
                  Communities
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground/60 mt-2 max-w-md lg:max-w-lg leading-relaxed">
                  Workspaces with dedicated groups, broadcast channels, and shared guidelines.
                </p>
              </div>
              <div className="mt-5 sm:mt-6 h-px bg-gradient-to-r from-accent/25 via-accent/5 to-transparent" />
            </section>

            {/* Community cards */}
            <section className="pt-6 sm:pt-7 lg:pt-8 pb-10 sm:pb-12 lg:pb-16">
              <div className="animate-reveal" style={{ animationDelay: '0.15s' }}>
                <div className="flex items-center justify-between mb-4 sm:mb-5 px-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" style={{ animationDuration: '3s' }} />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                    </span>
                    <h2 className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
                      Joined
                    </h2>
                  </div>
                  <button
                    onClick={() => navigate(ROUTES.COMMUNITY.DISCOVER)}
                    className="text-[11px] sm:text-xs font-semibold text-accent/80 hover:text-accent transition-colors cursor-pointer"
                  >
                    Discover more
                  </button>
                </div>

                {joined.length > 0 ? (
                  <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
                    {joined.map((community) => (
                      <CommunityCard key={community.id} community={community} />
                    ))}
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl border border-border-light/20 bg-surface/30 p-8 sm:p-10 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent pointer-events-none" />
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground/50 mb-4">No communities joined yet</p>
                      <Button size="sm" onClick={() => navigate(ROUTES.COMMUNITY.DISCOVER)}>
                        Discover communities
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </PageContainer>
        )}
      </PullToRefresh>
    </div>
  )
}
