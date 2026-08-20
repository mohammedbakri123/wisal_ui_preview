import { useState } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Input } from '@/core/components/ui/Input'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'

export default function AccountSettingsPage() {
  const { user, setUser } = useAuth()

  const [phone, setPhone] = useState(user?.phone || '')
  const [email, setEmail] = useState(user?.email || '')
  const [username, setUsername] = useState(user?.username || user?.name.toLowerCase().replace(/\s+/g, '') || '')
  const [password, setPassword] = useState('••••••••')
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (user) {
        setUser({
          ...user,
          username: username.trim().replace(/^@+/, ''),
          phone: phone || null,
          email: email || null,
        })
      }
      setIsLoading(false)
      setIsEditing(false)
    }, 800)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <PageContainer className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.SETTINGS.ROOT} label="الإعدادات" />
        <form onSubmit={handleUpdate} className="max-w-lg mx-auto space-y-4 sm:space-y-6">
          <section className="bg-surface rounded-2xl border border-border-light/40 overflow-hidden">
            <div className="p-4 border-b border-border-light/30">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">المعلومات الشخصية</h3>
            </div>
            <div className="p-4 space-y-4">
              <Input
                label="اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
                placeholder="اسم_المستخدم"
                disabled={!isEditing}
              />
              <Input
                label="رقم الهاتف"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1234567890"
                disabled={!isEditing}
              />
              <Input
                label="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                type="email"
                disabled={!isEditing}
              />
            </div>
          </section>

          <section className="bg-surface rounded-2xl border border-border-light/40 overflow-hidden">
            <div className="p-4 border-b border-border-light/30">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">الأمان</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">كلمة المرور</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isEditing}
                  className="w-full bg-background border border-border-light/50 rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 disabled:opacity-60 transition-all"
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-3">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 w-full cursor-pointer"
                  onClick={() => {
                    setUsername(user?.username || user?.name.toLowerCase().replace(/\s+/g, '') || '')
                    setPhone(user?.phone || '')
                    setEmail(user?.email || '')
                    setIsEditing(false)
                  }}
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="flex-1 w-full cursor-pointer"
                  loading={isLoading}
                >
                  حفظ الحساب
                </Button>
              </>
            ) : (
              <Button
                type="button"
                className="w-full cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                تعديل بيانات الحساب
              </Button>
            )}
          </div>
        </form>
      </PageContainer>
    </div>
  )
}
