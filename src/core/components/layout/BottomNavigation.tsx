import { useLocation, useNavigate } from 'react-router'
import { cn } from '@/core/utils/cn'
import { ROUTES } from '@/core/utils/routes'
import {
  CommunitiesIcon,
  HomeIcon,
  OrganizationsIcon,
  SettingsIcon,
  UpdatesIcon,
} from '@/core/components/ui/NavIcons'

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
      icon: (active: boolean) => <HomeIcon active={active} />,
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
      label: 'الإعدادات',
      path: ROUTES.SETTINGS.ROOT,
      icon: (active: boolean) => <SettingsIcon active={active} />,
    },
  ]

  return (
    <nav className="bottom-nav sticky bottom-0 z-30 flex items-center justify-around h-[53px] lg:hidden">
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