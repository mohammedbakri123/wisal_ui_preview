import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'
import { mockConversations } from '@/mocks/data/conversations'

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>()
  const navigate = useNavigate()

  const [isMuted, setIsMuted] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  // Try to find matching user from conversations or generate mock details
  const matchedConversation = mockConversations.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, '') === username,
  )

  const displayName = matchedConversation?.name || 
    (username ? username.charAt(0).toUpperCase() + username.slice(1) : 'تفاصيل المستخدم')
  const userAvatar = matchedConversation?.avatar || null
  const userBio = matchedConversation?.type === 'direct' 
    ? 'مهندس برمجيات ومصمم تقني. أعمل ليل نهار.'
    : 'صفحة تعريفية لمستخدمي وصال.'

  const handleMessage = () => {
    if (matchedConversation) {
      navigate(`/home/c/${matchedConversation.id}`)
    } else {
      navigate(ROUTES.CHAT.LIST)
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <PageContainer className="max-w-md mx-auto w-full space-y-6 pt-3 sm:pt-4">
        <BackButton to={ROUTES.CHAT.LIST} />
        {/* User Card */}
        <div className="flex flex-col items-center text-center p-6 bg-surface rounded-2xl border border-border/50 shadow-md">
          <Avatar src={userAvatar} alt={displayName} size="xl" online={!isBlocked} />
          
          <h2 className="text-xl font-bold mt-4">{displayName}</h2>
          <p className="text-xs text-success font-medium mt-1">
            {isBlocked ? 'محظور' : 'متصل الآن'}
          </p>

          <p className="text-sm text-muted-foreground mt-3 max-w-xs leading-relaxed">
            {userBio}
          </p>

          <div className="mt-5 w-full flex gap-3">
            <Button className="flex-1 cursor-pointer" onClick={handleMessage}>
              إرسال رسالة
            </Button>
          </div>
        </div>

        {/* Toggles */}
        <div className="bg-surface rounded-2xl border border-border/50 p-4 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-4.5 w-4.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="text-sm font-semibold">كتم الإشعارات</span>
            </div>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isMuted ? 'bg-accent' : 'bg-muted'
              }`}
            >
              <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isMuted ? 'translate-x-4.5 rtl:-translate-x-4.5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-4.5 w-4.5 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <span className="text-sm font-semibold text-destructive">حظر جهة الاتصال</span>
            </div>
            <button
              onClick={() => setIsBlocked(!isBlocked)}
              className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isBlocked ? 'bg-destructive' : 'bg-muted'
              }`}
            >
              <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isBlocked ? 'translate-x-4.5 rtl:-translate-x-4.5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Mutual Groups */}
        <div className="bg-surface rounded-2xl border border-border/50 p-4 space-y-3 shadow-sm">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">المجموعات المشتركة</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center text-accent text-sm font-bold">DT</div>
              <div className="flex-1 text-start min-w-0">
                <p className="text-sm font-semibold truncate">فريق التصميم</p>
                <p className="text-xs text-muted-foreground">12 عضو</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center text-accent text-sm font-bold">EN</div>
              <div className="flex-1 text-start min-w-0">
                <p className="text-sm font-semibold truncate">الهندسة</p>
                <p className="text-xs text-muted-foreground">8 أعضاء</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shared Media */}
        <div className="bg-surface rounded-2xl border border-border/50 p-4 space-y-3 shadow-sm">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">الوسائط المشتركة</h4>
          <div className="grid grid-cols-4 gap-2">
            <div className="aspect-square bg-muted/60 rounded-lg flex items-center justify-center text-muted-foreground text-[10px] text-center p-1 border border-border/20 hover:bg-muted cursor-pointer transition-colors">واجهة</div>
            <div className="aspect-square bg-muted/60 rounded-lg flex items-center justify-center text-muted-foreground text-[10px] text-center p-1 border border-border/20 hover:bg-muted cursor-pointer transition-colors">لوحات</div>
            <div className="aspect-square bg-muted/60 rounded-lg flex items-center justify-center text-muted-foreground text-[10px] text-center p-1 border border-border/20 hover:bg-muted cursor-pointer transition-colors">نماذج</div>
            <div className="aspect-square bg-muted/60 rounded-lg flex items-center justify-center text-muted-foreground text-[10px] text-center p-1 border border-border/20 hover:bg-muted cursor-pointer transition-colors">شعار</div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
