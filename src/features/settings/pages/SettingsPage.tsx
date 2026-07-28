import { useNavigate } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { ROUTES } from '@/core/utils/routes'
import { cn } from '@/core/utils/cn'

interface MenuItem {
  title: string
  description: string
  path: string
  icon: React.ReactNode
  theme: 'profile' | 'account' | 'privacy' | 'security' | 'notifications' | 'chat' | 'storage' | 'appearance' | 'devices' | 'support' | 'about'
}

const themeStyles: Record<string, { gradient: string; border: string; badge: string }> = {
  profile: {
    gradient: 'from-amber-500/15 via-yellow-500/5 to-transparent',
    border: 'border-amber-500/20',
    badge: 'bg-amber-500/15 text-amber-400',
  },
  account: {
    gradient: 'from-accent/15 via-emerald-500/5 to-transparent',
    border: 'border-accent/20',
    badge: 'bg-accent/15 text-accent',
  },
  privacy: {
    gradient: 'from-violet-500/15 via-fuchsia-500/5 to-transparent',
    border: 'border-violet-500/20',
    badge: 'bg-violet-500/15 text-violet-400',
  },
  security: {
    gradient: 'from-cyan-500/15 via-blue-500/5 to-transparent',
    border: 'border-cyan-500/20',
    badge: 'bg-cyan-500/15 text-cyan-400',
  },
  notifications: {
    gradient: 'from-pink-500/12 via-rose-500/5 to-transparent',
    border: 'border-pink-500/20',
    badge: 'bg-pink-500/15 text-pink-400',
  },
  chat: {
    gradient: 'from-accent/15 via-teal-500/5 to-transparent',
    border: 'border-accent/20',
    badge: 'bg-accent/15 text-accent',
  },
  storage: {
    gradient: 'from-orange-500/12 via-amber-500/5 to-transparent',
    border: 'border-orange-500/20',
    badge: 'bg-orange-500/15 text-orange-400',
  },
  appearance: {
    gradient: 'from-violet-500/15 via-purple-500/5 to-transparent',
    border: 'border-violet-500/20',
    badge: 'bg-violet-500/15 text-violet-400',
  },
  devices: {
    gradient: 'from-blue-500/12 via-indigo-500/5 to-transparent',
    border: 'border-blue-500/20',
    badge: 'bg-blue-500/15 text-blue-400',
  },
  support: {
    gradient: 'from-emerald-500/12 via-green-500/5 to-transparent',
    border: 'border-emerald-500/20',
    badge: 'bg-emerald-500/15 text-emerald-400',
  },
  about: {
    gradient: 'from-slate-500/12 via-gray-500/5 to-transparent',
    border: 'border-slate-500/20',
    badge: 'bg-slate-500/15 text-slate-400',
  },
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const menuItems: MenuItem[] = [
    {
      title: 'Profile Settings',
      description: 'Display name, avatar, bio, and status',
      path: ROUTES.SETTINGS.PROFILE,
      theme: 'profile',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.12a7.5 7.5 0 0 1 15 0A17.93 17.93 0 0 1 12 21.75c-2.68 0-5.22-.58-7.5-1.63Z" />
      ),
    },
    {
      title: 'Account Settings',
      description: 'Manage phone, email, and password security',
      path: ROUTES.SETTINGS.ACCOUNT,
      theme: 'account',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      ),
    },
    {
      title: 'Privacy Options',
      description: 'Last seen, read receipts, and blocked users',
      path: ROUTES.SETTINGS.PRIVACY,
      theme: 'privacy',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0 1 12 2.714Z" />
      ),
    },
    {
      title: 'Security',
      description: 'Two-factor authentication, passkeys, and sessions',
      path: ROUTES.SETTINGS.SECURITY,
      theme: 'security',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5A2.25 2.25 0 0 0 19.5 19.5v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      ),
    },
    {
      title: 'Notification Preferences',
      description: 'Mute sounds, alerts, and badge management',
      path: ROUTES.SETTINGS.NOTIFICATIONS,
      theme: 'notifications',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75v-.7V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      ),
    },
    {
      title: 'Chat Settings',
      description: 'Wallpaper, font size, enter-to-send, and backups',
      path: ROUTES.SETTINGS.CHATS,
      theme: 'chat',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.51c.88.28 1.5 1.13 1.5 2.1v4.28c0 1.14-.85 2.1-1.98 2.2-.34.03-.68.05-1.02.07v3.09l-3-3c-1.35 0-2.69-.06-4.02-.16a2.12 2.12 0 0 1-.82-.24M9.75 8.51c.16-.05.32-.08.48-.1a48.64 48.64 0 0 1 8.05 0" />
      ),
    },
    {
      title: 'Storage & Data',
      description: 'Cached media, downloads, and network usage',
      path: ROUTES.SETTINGS.STORAGE,
      theme: 'storage',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.38c0 2.07-3.7 3.75-8.25 3.75S3.75 8.45 3.75 6.38m16.5 0c0-2.07-3.7-3.75-8.25-3.75S3.75 4.3 3.75 6.38m16.5 0v11.25c0 2.07-3.7 3.75-8.25 3.75s-8.25-1.68-8.25-3.75V6.38" />
      ),
    },
    {
      title: 'Appearance settings',
      description: 'Select Light/Dark theme and customize chat look',
      path: ROUTES.SETTINGS.APPEARANCE,
      theme: 'appearance',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 0 2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0-.007a3 3 0 0 1 5.78 0m-5.78 0a3.001 3.001 0 0 0 5.78 0m0 0a3 3 0 0 0 5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 1-8.4-2.245c0-.399.078-.78.22-1.128Zm0-.007a3.001 3.001 0 0 1 5.78 0M12 2.25V4.5m0 15v2.25m-7.5-7.5h15" />
      ),
    },
    {
      title: 'Devices',
      description: 'Active sessions and linked devices',
      path: ROUTES.SETTINGS.DEVICES,
      theme: 'devices',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
      ),
    },
    {
      title: 'Help & Support',
      description: 'FAQ, contact support, and report a problem',
      path: ROUTES.SETTINGS.HELP,
      theme: 'support',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.88 9.88a3 3 0 1 1 4.24 4.24c-.54.54-1.12.94-1.12 1.88M12 18h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      ),
    },
    {
      title: 'About',
      description: 'Version, licenses, legal, and credits',
      path: ROUTES.SETTINGS.ABOUT,
      theme: 'about',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.04-.02a.75.75 0 0 1 1.06.85l-.7 2.84a.75.75 0 0 0 1.06.85l.04-.02M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.01v.01H12v-.01Z" />
      ),
    },
  ]

  const handleLogout = () => {
    logout()
    navigate(ROUTES.AUTH.LOGIN)
  }

  return (
    <div className="flex h-full flex-col bg-background relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(14,165,131,0.08) 0%, transparent 70%)',
            top: '-120px', right: '-80px',
            animation: 'drift 22s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
            bottom: '-60px', left: '-60px',
            animation: 'drift 28s ease-in-out 4s infinite reverse',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)',
            top: '50%', left: '65%',
            animation: 'drift 25s ease-in-out 8s infinite',
          }}
        />
      </div>


      <PageContainer className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl px-3 sm:px-5 lg:px-6">
        {/* Editorial hero */}
        <section className="pt-5 sm:pt-7 lg:pt-9 pb-1">
          <div className="animate-reveal">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/80">
              Preferences
            </span>
            <h1 className="font-serif italic text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.1] mt-2 text-foreground tracking-tight">
              Settings
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground/60 mt-2 max-w-md lg:max-w-lg leading-relaxed">
              Manage your account, personalize your experience, and configure privacy.
            </p>
          </div>
          <div className="mt-5 sm:mt-6 h-px bg-gradient-to-r from-accent/25 via-accent/5 to-transparent" />
        </section>

        {/* Settings grid */}
        <section className="pt-6 sm:pt-7 lg:pt-8 pb-10 sm:pb-12 lg:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {menuItems.map((item, idx) => {
              const theme = themeStyles[item.theme]
              return (
                <button
                  key={idx}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer text-left',
                    theme.border,
                    'bg-surface/30',
                    'hover:scale-[1.005] hover:-translate-y-0.5 hover:shadow-lg',
                  )}
                  style={{ animationDelay: `${0.08 + idx * 0.04}s` }}
                >
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-80 transition-opacity duration-500',
                      theme.gradient,
                    )}
                  />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent animate-shimmer" />

                  <div className="relative p-3 sm:p-4 flex items-center gap-3">
                    <div className={cn('p-2 rounded-xl border shrink-0', theme.badge, theme.border)}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        {item.icon}
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-foreground">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground/60 line-clamp-2 mt-0.5">{item.description}</p>
                    </div>
                    <svg className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Log Out */}
          <div className="mt-4 sm:mt-6 animate-reveal" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={handleLogout}
              className="group relative overflow-hidden w-full rounded-2xl border border-red-500/20 bg-surface/30 p-3.5 sm:p-4 text-destructive font-semibold hover:bg-red-500/5 active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />
              <div className="relative flex items-center justify-center gap-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <span className="text-sm">Log Out</span>
              </div>
            </button>
          </div>

          <p className="text-center text-[10px] text-muted-foreground/30 mt-6 pb-4 animate-reveal" style={{ animationDelay: '0.6s' }}>
            Wisal v0.1.0
          </p>
        </section>
      </PageContainer>
    </div>
  )
}
