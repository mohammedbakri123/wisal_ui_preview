import { useEffect, useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { Sheet } from '@/core/components/ui/Sheet'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { mockUsers } from '@/mocks/data/users'
import { ROUTES } from '@/core/utils/routes'
import { STORAGE_KEYS } from '@/core/utils/constants'

export default function PrivacySettingsPage() {
  const [lastSeen, setLastSeen] = useState('everyone')
  const [profilePhoto, setProfilePhoto] = useState('everyone')
  const [storyPrivacy, setStoryPrivacy] = useState(() => localStorage.getItem(STORAGE_KEYS.PRIVACY_STORY) ?? 'contacts')
  const [groupAddPrivacy, setGroupAddPrivacy] = useState(() => localStorage.getItem(STORAGE_KEYS.PRIVACY_GROUP_ADD) ?? 'everyone')
  const [contactPrivacy, setContactPrivacy] = useState(() => localStorage.getItem(STORAGE_KEYS.PRIVACY_CONTACT) ?? 'everyone')
  const [readReceipts, setReadReceipts] = useState(true)
  const [screenLock, setScreenLock] = useState(false)
  const [showBlocked, setShowBlocked] = useState(false)
  const [blockedIds, setBlockedIds] = useState<string[]>([])
  const blockedUsers = mockUsers.filter((user) => blockedIds.includes(user.id))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRIVACY_STORY, storyPrivacy)
    localStorage.setItem(STORAGE_KEYS.PRIVACY_GROUP_ADD, groupAddPrivacy)
    localStorage.setItem(STORAGE_KEYS.PRIVACY_CONTACT, contactPrivacy)
  }, [contactPrivacy, groupAddPrivacy, storyPrivacy])

  return (
    <div className="flex flex-col h-full bg-background">
      <PageContainer className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.SETTINGS.ROOT} label="الإعدادات" />
        <div className="max-w-lg mx-auto space-y-4 sm:space-y-5">
          <section className="bg-surface rounded-2xl border border-border-light/40 overflow-hidden">
            <div className="p-4 border-b border-border-light/30">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">الظهور</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">من يمكنه رؤية آخر ظهور لي</label>
                <select
                  value={lastSeen}
                  onChange={(e) => setLastSeen(e.target.value)}
                  className="w-full bg-background border border-border-light/50 rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer transition-all"
                >
                  <option value="everyone">الجميع</option>
                  <option value="contacts">جهات الاتصال</option>
                  <option value="nobody">لا أحد</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">من يمكنه رؤية صورتي الشخصية</label>
                <select
                  value={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                  className="w-full bg-background border border-border-light/50 rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer transition-all"
                >
                  <option value="everyone">الجميع</option>
                  <option value="contacts">جهات الاتصال</option>
                  <option value="nobody">لا أحد</option>
                </select>
              </div>
              <PrivacySelect label="من يمكنه رؤية تحديثات حالتي" value={storyPrivacy} onChange={setStoryPrivacy} options={[['everyone', 'الجميع'], ['contacts', 'جهات الاتصال'], ['nobody', 'لا أحد']]} />
              <PrivacySelect label="من يمكنه إضافتي إلى المجموعات" value={groupAddPrivacy} onChange={setGroupAddPrivacy} options={[['everyone', 'الجميع'], ['contacts', 'جهات الاتصال'], ['exceptions', 'جهات الاتصال باستثناء…']]} />
              <PrivacySelect label="من يمكنه التواصل معي" value={contactPrivacy} onChange={setContactPrivacy} options={[['everyone', 'الجميع'], ['contacts', 'جهات الاتصال'], ['nobody', 'لا أحد']]} />
            </div>
          </section>

          <section className="bg-surface rounded-2xl border border-border-light/40 overflow-hidden">
            <div className="p-4 border-b border-border-light/30">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">خيارات الدردشة</h3>
            </div>
            <div className="divide-y divide-border-light/30">
              <PrivacyToggleRow label="إيصالات القراءة" description="إذا تم إيقافها، لن ترسل أو تستقبل إيصالات القراءة." checked={readReceipts} onChange={setReadReceipts} />
              <PrivacyToggleRow label="قفل شاشة التطبيق" description="يتطلب رمز مرور أو بصمة لفتح التطبيق." checked={screenLock} onChange={setScreenLock} />
            </div>
          </section>

          <button type="button" onClick={() => setShowBlocked(true)} className="w-full flex items-center justify-between p-4 bg-surface rounded-2xl border border-border-light/40 hover:bg-surface-hover transition-all cursor-pointer">
            <div className="text-start">
              <p className="text-sm font-semibold">جهات الاتصال المحظورة</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">إدارة جهات الاتصال التي حظرتها من مراسلتك.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60 shrink-0">
              <span>{blockedUsers.length}</span>
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </div>
      </PageContainer>
      <Sheet open={showBlocked} onClose={() => setShowBlocked(false)} title="جهات الاتصال المحظورة">
        {blockedUsers.length === 0 ? (
          <div className="py-8 text-center"><p className="font-semibold text-foreground">لا توجد جهات اتصال محظورة</p><p className="mt-1 text-sm text-muted-foreground">جهات الاتصال التي تحظرها ستظهر هنا.</p><Button size="sm" className="mt-5" onClick={() => setShowBlocked(false)}>تم</Button></div>
        ) : (
          <div className="space-y-2">{blockedUsers.map((user) => <div key={user.id} className="flex items-center gap-3 rounded-xl border border-border-light/30 p-3"><Avatar src={user.avatar} alt={user.name} size="sm" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{user.name}</p><p className="text-xs text-muted-foreground">محظور من مراسلتك</p></div><Button size="sm" variant="secondary" onClick={() => setBlockedIds((current) => current.filter((id) => id !== user.id))}>إلغاء الحظر</Button></div>)}</div>
        )}
      </Sheet>
    </div>
  )
}

function PrivacySelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<[string, string]> }) {
  return <div className="space-y-1.5"><label className="text-xs font-semibold text-muted-foreground">{label}</label><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full bg-background border border-border-light/50 rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer transition-all">{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></div>
}

function PrivacyToggleRow({ label, description, checked, onChange }: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div className="flex-1 min-w-0 pe-4">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-2">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>
  )
}
