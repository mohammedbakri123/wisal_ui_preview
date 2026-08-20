import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { ROUTES } from '@/core/utils/routes'

export default function SecuritySettingsPage() {
  const navigate = useNavigate()
  const [appLock, setAppLock] = useState(false)
  const [pin, setPin] = useState('')
  const [pinDraft, setPinDraft] = useState('')
  const [pinEditing, setPinEditing] = useState(false)

  function savePin() {
    if (pinDraft.length < 4) return
    setPin(pinDraft)
    setPinDraft('')
    setPinEditing(false)
  }

  return (
    <div className="flex h-full flex-col bg-background text-foreground min-w-0 max-w-full overflow-x-hidden">
      <PageContainer className="w-full max-w-full box-border overflow-x-hidden px-4 pt-3 pb-8 min-w-0">
        <div className="mx-auto w-full max-w-full sm:max-w-xl min-w-0 overflow-x-hidden">
          <BackButton to={ROUTES.SETTINGS.ROOT} label="الإعدادات" />
          <header className="mb-6 mt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">حماية الحساب</p>
            <h1 className="mt-1 text-2xl font-bold">الأمان</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted">تحكم في قفل التطبيق ورمز PIN والأجهزة المتصلة بحسابك.</p>
          </header>
          <section className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex items-center justify-between gap-4 border-b border-border p-4">
              <div className="min-w-0 flex-1 pe-2">
                <p className="text-sm font-bold">قفل التطبيق</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted">يتطلب رمز PIN عند فتح وصال.</p>
              </div>
              <Toggle checked={appLock} onChange={setAppLock} label="قفل التطبيق" />
            </div>
            <div className="border-b border-border p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">رمز PIN</p>
                  <p className="mt-1 text-xs text-muted">{pin ? 'تم تعيين رمز PIN على هذا الجهاز.' : 'لم يتم تعيين رمز PIN.'}</p>
                </div>
                <Button size="sm" variant="secondary" className="w-full sm:w-auto" onClick={() => setPinEditing((value) => !value)}>{pinEditing ? 'إلغاء' : pin ? 'تغيير PIN' : 'تعيين PIN'}</Button>
              </div>
              {pinEditing && <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input type="password" inputMode="numeric" maxLength={6} value={pinDraft} onChange={(event) => setPinDraft(event.target.value.replace(/\D/g, ''))} placeholder="٤–٦ أرقام" className="h-10 min-w-0 flex-1 rounded-full border border-border bg-surface-elevated px-4 text-sm text-foreground placeholder:text-muted outline-none focus:border-accent" />
                <Button size="sm" className="w-full sm:w-auto" onClick={savePin} disabled={pinDraft.length < 4}>حفظ PIN</Button>
              </div>}
            </div>
            <button type="button" onClick={() => navigate(ROUTES.SETTINGS.DEVICES)} className="flex w-full items-center justify-between p-4 text-start hover:bg-surface-hover cursor-pointer">
              <span className="min-w-0 flex-1 pe-2">
                <span className="block text-sm font-bold">الأجهزة النشطة</span>
                <span className="mt-1 block text-xs text-muted">راجع وأنهِ الجلسات المتصلة بحسابك.</span>
              </span>
              <span className="shrink-0 text-xs font-bold text-accent">إدارة</span>
            </button>
          </section>
        </div>
      </PageContainer>
    </div>
  )
}