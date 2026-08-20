import { useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { ROUTES } from '@/core/utils/routes'

export default function ChatSettingsPage() {
  const [enterToSend, setEnterToSend] = useState(true)
  const [autoDownload, setAutoDownload] = useState(true)
  const [backupEnabled, setBackupEnabled] = useState(false)
  const [fontSize, setFontSize] = useState('عادي')

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <PageContainer className="w-full px-4 pt-3 pb-8">
        <div className="mx-auto w-full max-w-xl">
          <BackButton to={ROUTES.SETTINGS.ROOT} label="الإعدادات" />
          <header className="mb-6 mt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">الإعدادات</p>
            <h1 className="mt-1 text-2xl font-bold">إعدادات الدردشة</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted">اضبط الكتابة، وتنزيل الوسائط، والمظهر، وتفضيلات النسخ الاحتياطي المحلي.</p>
          </header>
          <section className="overflow-hidden rounded-2xl border border-border bg-surface">
            <ToggleRow label="الإدخال للإرسال" description="أرسل الرسائل بالضغط على Enter وأضف سطر جديد بـ Shift+Enter." checked={enterToSend} onChange={setEnterToSend} />
            <ToggleRow label="التحميل التلقائي للوسائط" description="تنزيل الصور ومقاطع الفيديو الواردة تلقائياً." checked={autoDownload} onChange={setAutoDownload} />
            <div className="flex items-center justify-between gap-4 border-t border-border p-4">
              <div className="min-w-0">
                <p className="text-sm font-bold">حجم الخط</p>
                <p className="mt-1 text-xs text-muted">اضبط كثافة النص في المحادثات.</p>
              </div>
              <select value={fontSize} onChange={(event) => setFontSize(event.target.value)} className="h-9 shrink-0 rounded-full border border-border bg-surface-elevated px-3 text-xs text-foreground outline-none focus:border-accent">
                <option>مضغوط</option>
                <option>عادي</option>
                <option>كبير</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border p-4">
              <div className="min-w-0">
                <p className="text-sm font-bold">خلفية الدردشة</p>
                <p className="mt-1 text-xs text-muted">استخدم نسيج الشبكة الافتراضي منخفض التباين.</p>
              </div>
              <span className="shrink-0 text-xs text-muted">افتراضي</span>
            </div>
            <ToggleRow label="النسخ الاحتياطي المحلي للدردشات" description="الاحتفاظ بحالة نسخ احتياطي تجريبية على هذا الجهاز." checked={backupEnabled} onChange={setBackupEnabled} />
          </section>
        </div>
      </PageContainer>
    </div>
  )
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex items-center justify-between gap-4 border-b border-border p-4"><div className="min-w-0 flex-1 pe-2"><p className="text-sm font-bold">{label}</p><p className="mt-1 line-clamp-2 text-xs text-muted">{description}</p></div><Toggle checked={checked} onChange={onChange} label={label} /></div>
}