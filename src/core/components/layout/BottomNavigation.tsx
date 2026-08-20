import { useLocation, useNavigate } from 'react-router'
import { cn } from '@/core/utils/cn'
import { ROUTES } from '@/core/utils/routes'

interface BottomNavItem {
  label: string
  path: string
  icon: (active: boolean) => React.ReactNode
}

export function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems: BottomNavItem[] = [
    {
      label: 'Home',
      path: ROUTES.HOME,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      label: 'Explore',
      path: ROUTES.EXPLORE,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
    },
    {
      label: 'Channels',
      path: ROUTES.CHANNEL.ROOT,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.012-.03-.027-.06-.046-.089a4.5 4.5 0 116.892-5.467M12 21.75a9.75 9.75 0 110-19.5 9.75 9.75 0 010 19.5z" />
        </svg>
      ),
    },
    {
      label: 'Communities',
      path: ROUTES.COMMUNITY.ROOT,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      label: 'Notifications',
      path: ROUTES.NOTIFICATIONS,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="sticky bottom-0 z-30 flex items-center justify-around h-[53px] bg-black/85 backdrop-blur-md border-t border-[#2f3336] lg:hidden">
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.path ||
          (item.path !== ROUTES.HOME && location.pathname.startsWith(item.path))

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              'flex flex-1 items-center justify-center h-full transition-colors cursor-pointer',
              isActive ? 'text-[#e7e9ea]' : 'text-[#71767b] hover:text-[#e7e9ea]',
            )}
            title={item.label}
          >
            {item.icon(isActive)}
          </button>
        )
      })}
    </nav>
  )
}
