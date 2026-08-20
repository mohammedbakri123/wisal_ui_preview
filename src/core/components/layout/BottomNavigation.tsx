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
      label: 'الرئيسية',
      path: ROUTES.HOME,
      icon: (active: boolean) => (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
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
