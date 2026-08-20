import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { Avatar } from '@/core/components/ui/Avatar'
import { cn } from '@/core/utils/cn'
import { ROUTES } from '@/core/utils/routes'
import {
  CommunitiesIcon,
  ContactsIcon,
  ExploreIcon,
  MessagesIcon,
  NotificationsIcon,
  OrganizationsIcon,
  ProfileIcon,
  SettingsIcon,
  UpdatesIcon,
} from '@/core/components/ui/NavIcons'

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
      icon: (active: boolean) => <MessagesIcon active={active} />,
    },
    {
      label: 'استكشاف',
      path: ROUTES.EXPLORE,
      icon: (active: boolean) => <ExploreIcon active={active} />,
    },
    {
      label: 'التحديثات',
      path: ROUTES.UPDATES,
      icon: (active: boolean) => <UpdatesIcon active={active} />,
    },
    {
      label: 'المجتمعات',
      path: ROUTES.COMMUNITY.ROOT,
      icon: (active: boolean) => <CommunitiesIcon active={active} />,
    },
    {
      label: 'المنظمات',
      path: ROUTES.ORGANIZATIONS.LIST,
      icon: (active: boolean) => <OrganizationsIcon active={active} />,
    },
    {
      label: 'الإشعارات',
      path: ROUTES.NOTIFICATIONS,
      icon: (active: boolean) => <NotificationsIcon active={active} />,
    },
    {
      label: 'جهات الاتصال',
      path: ROUTES.CONTACTS.ROOT,
      icon: (active: boolean) => <ContactsIcon active={active} />,
    },
    {
      label: 'الملف الشخصي',
      path: ROUTES.PROFILE.SELF,
      icon: (active: boolean) => <ProfileIcon active={active} />,
    },
    {
      label: 'الإعدادات',
      path: ROUTES.SETTINGS.ROOT,
      icon: (active: boolean) => <SettingsIcon active={active} />,
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
