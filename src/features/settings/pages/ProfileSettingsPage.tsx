import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'
import { useAuth } from '@/app/providers/AuthProvider'
import { SettingsItem } from '../components/SettingsItem'

export default function ProfileSettingsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="flex h-full flex-col bg-background">
      <PageContainer className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.SETTINGS.ROOT} label="الإعدادات" />
        <div className="max-w-lg mx-auto space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-border-light/40 bg-surface p-5 sm:p-6 text-center">
            <Avatar src={user?.avatar} alt={user?.name ?? 'مستخدم'} size="xl" online />
            <h2 className="mt-3.5 text-lg font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground/70 mt-1">{user?.bio ?? 'لا توجد نبذة'}</p>
            <Button className="mt-4" size="sm" variant="secondary" onClick={() => navigate(ROUTES.PROFILE.EDIT)}>
              تعديل الملف الشخصي
            </Button>
          </section>
          <section className="overflow-hidden rounded-2xl border border-border-light/40 bg-surface">
            <SettingsItem title="اسم العرض" description="يظهر في الدردشات والمجموعات والمجتمعات" value={user?.name ?? 'غير محدد'} />
            <SettingsItem title="رسالة الحالة" description="ملاحظة مختصرة عن توفرك لجهات الاتصال" value="متاح" />
            <SettingsItem title="الصورة الرمزية" description="صورة الملف الشخصي والاحتياطي بالأحرف" value="افتراضي" />
          </section>
        </div>
      </PageContainer>
    </div>
  )
}
