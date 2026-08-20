import { useNavigate } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { ROUTES } from '@/core/utils/routes'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col h-full bg-background">
      <PageContainer className="max-w-md mx-auto w-full space-y-6 pt-3 sm:pt-4">
        <div className="flex justify-end">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="الإعدادات"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0Z" />
            </svg>
          </button>
        </div>
        {/* User Card Header */}
        <div className="flex flex-col items-center text-center p-6 bg-surface rounded-2xl border border-border/50 shadow-md">
          <Avatar src={user?.avatar} alt={user?.name ?? 'User'} size="xl" />
          <h2 className="text-xl font-bold mt-4">{user?.name || 'اسمك'}</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs leading-relaxed">
            {user?.bio || 'لا توجد نبذة بعد. عرّف الآخرين بنفسك!'}
          </p>

          <div className="mt-5 w-full flex gap-3">
            <Button 
              className="flex-1 cursor-pointer" 
              variant="secondary"
              onClick={() => navigate(ROUTES.PROFILE.EDIT)}
            >
              تعديل الملف الشخصي
            </Button>
            <Button 
              className="flex-1 cursor-pointer" 
              variant="danger"
              onClick={() => {
                logout()
                navigate(ROUTES.AUTH.LOGIN)
              }}
            >
              تسجيل الخروج
            </Button>
          </div>
        </div>

        {/* User Details Details */}
        <div className="bg-surface rounded-2xl border border-border/50 divide-y divide-border/30 overflow-hidden shadow-sm">
          {user?.phone && (
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <span className="text-xs text-muted-foreground block">رقم الهاتف</span>
                <span className="text-sm font-semibold">{user.phone}</span>
              </div>
              <svg className="h-5 w-5 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
            </div>
          )}

          {user?.email && (
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <span className="text-xs text-muted-foreground block">البريد الإلكتروني</span>
                <span className="text-sm font-semibold">{user.email}</span>
              </div>
              <svg className="h-5 w-5 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
          )}

          <div className="flex items-center justify-between p-4">
            <div className="space-y-0.5">
              <span className="text-xs text-muted-foreground block">عضو منذ</span>
              <span className="text-sm font-semibold">
                {new Date(user?.createdAt ?? new Date(0).toISOString()).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <svg className="h-5 w-5 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
