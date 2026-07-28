import { Outlet, useLocation } from 'react-router'
import { ROUTES } from '@/core/utils/routes'

export function AuthLayout() {
  const location = useLocation()
  const isSignUp = location.pathname === ROUTES.AUTH.SIGNUP

  return (
    <div className="flex min-h-dvh bg-background relative overflow-hidden">
      {/* Global background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(14,165,131,0.07) 0%, transparent 70%)',
            top: '-150px', right: '-100px',
            animation: 'drift 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
            bottom: '-120px', left: '-80px',
            animation: 'drift 30s ease-in-out 6s infinite reverse',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '250px', height: '250px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)',
            top: '50%', left: '50%',
            animation: 'drift 28s ease-in-out 12s infinite',
          }}
        />
      </div>

      <div className="flex w-full relative z-10">
        {/* Left branding panel */}
        <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-12 relative">
          <div className="max-w-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-6">
              <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <h1 className="font-serif italic text-3xl tracking-tight text-foreground mb-4">Wisal</h1>
            <p className="text-muted-foreground/60 text-sm leading-relaxed">
              A space for real conversations. Fast, secure, and beautifully simple.
            </p>
            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
            <div className="mt-8 flex flex-col gap-4 text-left">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-accent/70 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-sm text-muted-foreground/60">End-to-end encrypted messages</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-accent/70 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-sm text-muted-foreground/60">Voice notes, media, and group chats</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-accent/70 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-sm text-muted-foreground/60">Available on all your devices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-sm">
            {/* Mobile branding */}
            <div className="lg:hidden text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 mb-3">
                <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
              </div>
              <h1 className="font-serif italic text-xl text-foreground">Wisal</h1>
              <p className="text-xs text-muted-foreground/50 mt-1">
                {isSignUp ? 'Create your account' : 'Sign in to continue'}
              </p>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
