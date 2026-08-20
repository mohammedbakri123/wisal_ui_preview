import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { Avatar } from '@/core/components/ui/Avatar'
import { cn } from '@/core/utils/cn'
import { ROUTES } from '@/core/utils/routes'

interface NavItem {
  label: string
  path: string
  icon: (active: boolean) => React.ReactNode
  badge?: number
}

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const navItems: NavItem[] = [
    {
      label: 'الرسائل',
      path: ROUTES.HOME,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: 'استكشاف',
      path: ROUTES.EXPLORE,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
    },
    {
      label: 'التحديثات',
      path: ROUTES.UPDATES,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v4.75l3 1.75" />
        </svg>
      ),
    },
    {
      label: 'المجتمعات',
      path: ROUTES.COMMUNITY.ROOT,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      label: 'المنظمات',
      path: ROUTES.ORGANIZATIONS.LIST,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    },
    {
      label: 'الإشعارات',
      path: ROUTES.NOTIFICATIONS,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      ),
    },
    {
      label: 'جهات الاتصال',
      path: ROUTES.CONTACTS.ROOT,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.125-.953 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-.355-.023-.706-.068-1.05M15 19.128v.003a6.75 6.75 0 0 1-9.75 0v-.003m9.75 0a24.07 24.07 0 0 0-9.75 0m9.75 0a24.07 24.07 0 0 1-9.75 0M8.25 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM21 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      ),
    },
    {
      label: 'الملف الشخصي',
      path: ROUTES.PROFILE.SELF,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      label: 'الإعدادات',
      path: ROUTES.SETTINGS.ROOT,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.59 3.2c.38-1.6 2.44-1.6 2.82 0a1.65 1.65 0 0 0 2.46 1.02c1.4-.86 2.86.6 2 2a1.65 1.65 0 0 0 1.02 2.46c1.6.38 1.6 2.44 0 2.82a1.65 1.65 0 0 0-1.02 2.46c.86 1.4-.6 2.86-2 2a1.65 1.65 0 0 0-2.46 1.02c-.38 1.6-2.44 1.6-2.82 0a1.65 1.65 0 0 0-2.46-1.02c-1.4.86-2.86-.6-2-2a1.65 1.65 0 0 0-1.02-2.46c-1.6-.38-1.6-2.44 0-2.82a1.65 1.65 0 0 0 1.02-2.46c-.86-1.4.6-2.86 2-2a1.65 1.65 0 0 0 2.46-1.02Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex flex-col h-full justify-between px-2 xl:px-3 py-3 select-none">
      {/* Top section: Logo + Navigation items */}
      <div className="flex flex-col gap-1">
        {/* X/Wisal Logo */}
        <div
          onClick={() => navigate(ROUTES.HOME)}
          className="w-[50px] h-[50px] xl:w-auto xl:h-12 flex items-center justify-center xl:justify-start xl:px-3 rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer mb-2 group"
        >
          <div className="flex items-center gap-3">
            {/* Iconic Wisal W Mark */}
            <div className="w-9 h-9 rounded-full bg-[#1d9bf0] flex items-center justify-center text-black font-black text-xl tracking-tighter">
              W
            </div>
            <span className="hidden xl:inline text-xl font-bold text-[#e7e9ea] tracking-tight">
              Wisal
            </span>
          </div>
        </div>

        {/* Navigation items list */}
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== ROUTES.HOME && location.pathname.startsWith(item.path)) ||
              (item.path === ROUTES.HOME && (location.pathname.startsWith('/home/c/') || location.pathname.startsWith('/home/g/')))

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'group flex items-center justify-center xl:justify-start gap-4 p-3 xl:px-4 xl:py-3 rounded-full transition-all cursor-pointer',
                  'hover:bg-white/[0.06] active:scale-[0.98]',
                  isActive && 'bg-[#1d9bf0]/10 text-[#1d9bf0]',
                )}
                title={item.label}
              >
                <div className="relative flex items-center justify-center text-[#e7e9ea] group-hover:text-[#1d9bf0] transition-colors">
                  {item.icon(isActive)}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-[#1d9bf0] text-black text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    'hidden xl:inline text-[19px] leading-6 tracking-normal text-[#e7e9ea] transition-colors',
                    isActive ? 'font-bold' : 'font-normal group-hover:text-[#e7e9ea]',
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Primary Action Button (New Chat / Compose) */}
        <div className="mt-3">
          <button
            onClick={() => navigate(ROUTES.CHAT.ADD)}
            className="w-[50px] h-[50px] xl:w-full xl:h-[52px] rounded-full bg-[#1d9bf0] hover:bg-[#1a8cd8] active:scale-[0.97] transition-all flex items-center justify-center text-white font-bold text-[17px] shadow-sm cursor-pointer"
            title="محادثة جديدة"
          >
            <svg className="h-6 w-6 xl:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="hidden xl:inline">رسالة جديدة</span>
          </button>
        </div>
      </div>

      {/* User profile card at bottom */}
      <div
        onClick={() => navigate(ROUTES.PROFILE.SELF)}
        className="flex items-center justify-between p-2 rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer mt-auto"
      >
        <div className="flex items-center gap-3 min-w-0">
          <Avatar src={user?.avatar} alt={user?.name ?? 'مستخدم'} size="md" online verified verifiedType="blue" />
          <div className="hidden xl:flex flex-col min-w-0 text-start">
            <span className="text-[15px] font-bold text-[#e7e9ea] truncate flex items-center gap-1">
              {user?.name ?? 'مستخدم'}
            </span>
            <span className="text-[13px] text-[#71767b] truncate">
              @{user?.name?.toLowerCase().replace(/\s+/g, '') ?? 'مستخدم'}
            </span>
          </div>
        </div>
        <div className="hidden xl:block text-[#71767b]">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}
