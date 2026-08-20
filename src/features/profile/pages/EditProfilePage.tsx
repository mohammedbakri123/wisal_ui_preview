import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Button } from '@/core/components/ui/Button'
import { Input } from '@/core/components/ui/Input'
import { Avatar } from '@/core/components/ui/Avatar'
import { ROUTES } from '@/core/utils/routes'

export default function EditProfilePage() {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  // Local form state
  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [email, setEmail] = useState(user?.email || '')
  const [avatar, setAvatar] = useState(user?.avatar || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsLoading(true)

    // Simulate API update
    setTimeout(() => {
      if (user) {
        setUser({
          ...user,
          name,
          bio: bio || null,
          phone: phone || null,
          email: email || null,
          avatar: avatar || null,
        })
      }
      setIsLoading(false)
      navigate(ROUTES.PROFILE.SELF)
    }, 800)
  }

  // Predefined avatar selections for beautiful presentation
  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      <PageContainer className="max-w-md mx-auto w-full pt-3 sm:pt-4">
        <BackButton to={ROUTES.PROFILE.SELF} />
        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar choice section */}
          <div className="flex flex-col items-center gap-4 p-5 bg-surface rounded-2xl border border-border/50">
            <Avatar src={avatar} alt="Avatar preview" size="xl" />
            
            <div className="space-y-2 text-center">
              <span className="text-xs text-muted-foreground block font-medium">اختر صورة رمزية جاهزة</span>
              <div className="flex gap-2.5">
                {avatarPresets.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAvatar(preset)}
                    className={`h-11 w-11 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                      avatar === preset ? 'border-accent scale-110 shadow-md shadow-accent/20' : 'border-transparent hover:scale-105'
                    }`}
                  >
                    <img src={preset} alt="preset" className="h-full w-full object-cover" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAvatar('')}
                  className={`h-11 w-11 rounded-full bg-muted border-2 flex items-center justify-center text-xs text-muted-foreground hover:text-foreground cursor-pointer ${
                    avatar === '' ? 'border-accent scale-110' : 'border-transparent'
                  }`}
                >
                  مسح
                </button>
              </div>
            </div>
          </div>

          {/* Form details inputs */}
          <div className="bg-surface p-5 rounded-2xl border border-border/50 space-y-4">
            <Input
              label="الاسم الظاهر"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: أحمد محمد"
              required
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">النبذة</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="نبذة قصيرة عن نفسك..."
                rows={3}
                className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <Input
              label="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+966 5xxxxxxxx"
            />

            <Input
              label="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ahmed@example.com"
              type="email"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="flex-1 cursor-pointer"
              onClick={() => navigate(ROUTES.PROFILE.SELF)}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              className="flex-1 cursor-pointer"
              loading={isLoading}
            >
              حفظ التغييرات
            </Button>
          </div>
        </form>
      </PageContainer>
    </div>
  )
}
