import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { BackButton } from '@/core/components/ui/BackButton'
import { ROUTES } from '@/core/utils/routes'
import { mockUsers } from '@/mocks/data/users'

export default function AddChatPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(search.toLowerCase())),
  )

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0ea583]/5 blur-[128px]" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#0ea583]/3 blur-[100px]" />
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-amber-500/3 blur-[100px]" />
      </div>

      <div className="relative z-10 shrink-0 px-4 pt-1 pb-2">
        <BackButton to={ROUTES.CHAT.LIST} label="المحادثات" />
      </div>

      <div className="relative z-10 shrink-0 px-4 pb-3">
        <h1 className="font-serif text-2xl italic leading-tight tracking-tight text-foreground">
          محادثة جديدة
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground/60">
          ابحث في جهات الاتصال أو ابدأ مجموعة
        </p>
      </div>

      <div className="relative z-10 shrink-0 px-4 pb-3">
        <div className="relative">
          <svg
            className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث في جهات الاتصال"
            className="w-full h-11 ps-10 pe-10 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-[#0ea583]/40 focus:bg-white/[0.06] transition-all backdrop-blur-sm"
            autoFocus
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-muted-foreground/50 hover:text-foreground cursor-pointer"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="relative z-10 shrink-0 px-4 pb-3">
        <button
          onClick={() => navigate(ROUTES.CHAT.CREATE_GROUP)}
          className="flex w-full items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-start backdrop-blur-sm transition-all hover:bg-white/[0.06] hover:border-[#0ea583]/30 cursor-pointer"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0ea583]/15">
            <svg className="h-5 w-5 text-[#0ea583]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.1 9.1 0 0 0 3.74-1.04 3.38 3.38 0 0 0-6.47-1.43M18 18.72a9.1 9.1 0 0 1-6 0m6 0v.03M12 18.72a9.1 9.1 0 0 1-6 0m6 0a3.38 3.38 0 0 0-6.47-1.43 9.1 9.1 0 0 0 .47 1.43m6 0V18.75" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">مجموعة جديدة</p>
            <p className="text-xs text-muted-foreground/60">أضف أعضاء وابدأ محادثة جماعية</p>
          </div>
          <svg className="h-4 w-4 shrink-0 text-muted-foreground/30 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto scrollbar-thin px-4 pb-4">
        <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">
          جهات الاتصال على وصال
        </p>

        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04]">
              <svg className="h-6 w-6 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-muted-foreground/70">لم يتم العثور على جهات اتصال</p>
            <p className="mt-1 text-xs text-muted-foreground/50">جرب مصطلح بحث مختلف</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => navigate(`/home/c/c${user.id}`)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-start transition-all hover:bg-white/[0.04] active:bg-white/[0.06] cursor-pointer"
              >
                <Avatar src={user.avatar} alt={user.name} size="md" online={user.isOnline} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                    {user.isOnline && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#0ea583]" />
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground/50">
                    {user.email ?? user.phone} {user.bio ? `· ${user.bio}` : ''}
                  </p>
                </div>
                <svg className="h-4 w-4 shrink-0 text-muted-foreground/20 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
