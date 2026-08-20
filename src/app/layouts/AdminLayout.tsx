import { NavLink, Outlet, useNavigate } from 'react-router'
import { useAdminAuth } from '@/app/providers/useAdminAuth'
import { ROUTES } from '@/core/utils/routes'

const items = [
  { label: 'Overview', path: ROUTES.ADMIN.ROOT },
  { label: 'Users', path: ROUTES.ADMIN.USERS },
  { label: 'Administrators', path: ROUTES.ADMIN.ADMINISTRATORS },
  { label: 'Institutions', path: ROUTES.ADMIN.INSTITUTIONS },
  { label: 'Reports', path: ROUTES.ADMIN.REPORTS },
  { label: 'Content', path: ROUTES.ADMIN.CONTENT },
]

export function AdminLayout() {
  const { logout } = useAdminAuth()
  const navigate = useNavigate()
  return <div className="flex h-dvh bg-black text-[#e7e9ea]"><aside className="hidden w-64 shrink-0 border-r border-[#2f3336] bg-[#000] p-4 md:flex md:flex-col"><button type="button" onClick={() => navigate(ROUTES.ADMIN.ROOT)} className="mb-8 text-left cursor-pointer"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1d9bf0]">Wisal</p><p className="mt-1 text-xl font-bold">Control room</p></button><nav className="space-y-1">{items.map((item) => <NavLink key={item.path} to={item.path} end={item.path === ROUTES.ADMIN.ROOT} className={({ isActive }) => `block rounded-full px-4 py-3 text-sm font-bold transition-colors ${isActive ? 'bg-[#1d9bf0]/10 text-[#1d9bf0]' : 'text-[#71767b] hover:bg-white/[0.04] hover:text-[#e7e9ea]'}`}>{item.label}</NavLink>)}</nav><button type="button" onClick={() => { logout(); navigate(ROUTES.ADMIN.LOGIN) }} className="mt-auto rounded-full px-4 py-3 text-left text-sm font-bold text-[#f4212e] hover:bg-[#f4212e]/10 cursor-pointer">Sign out</button></aside><main className="min-w-0 flex-1 overflow-y-auto"><div className="border-b border-[#2f3336] px-4 py-3 md:hidden"><div className="flex items-center justify-between"><span className="font-bold">Wisal Control room</span><button type="button" onClick={() => { logout(); navigate(ROUTES.ADMIN.LOGIN) }} className="text-xs font-bold text-[#f4212e] cursor-pointer">Sign out</button></div></div><Outlet /></main></div>
}
