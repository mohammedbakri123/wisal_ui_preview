import { useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'

export default function StorageDataPage() {
  const [images, setImages] = useState(true)
  const [files, setFiles] = useState(false)
  const [cacheCleared, setCacheCleared] = useState(false)

  return (
    <div className="flex h-full flex-col bg-background text-foreground min-w-0 max-w-full overflow-x-hidden">
      <PageContainer className="w-full max-w-full box-border overflow-x-hidden px-4 pt-3 pb-8 min-w-0">
        <div className="mx-auto w-full max-w-full sm:max-w-xl min-w-0 overflow-x-hidden">
          <BackButton to={ROUTES.SETTINGS.ROOT} label="الإعدادات" />
          <header className="mb-6 mt-2"><p className="text-xs font-bold uppercase tracking-wider text-accent">الإعدادات</p><h1 className="mt-1 text-2xl font-bold">التخزين والبيانات</h1><p className="mt-2 text-sm leading-relaxed text-muted">تحكم في الوسائط المخزنة والتنزيلات التلقائية على هذا الجهاز.</p></header>
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-surface sm:grid-cols-4">
            {[['ذاكرة الوسائط', '248 ميجا'], ['المستندات', '41 ميجا'], ['الشبكة', '1.2 جيجا'], ['النسخ الاحتياطي', '3']].map(([label, value]) => <div key={label} className="border-b border-e border-border p-4 last:border-e-0 sm:border-b-0 sm:last:border-b-0"><p className="text-xs text-muted">{label}</p><p className="mt-1 text-base font-bold tabular-nums">{cacheCleared && label === 'ذاكرة الوسائط' ? '0 ميجا' : value}</p></div>)}
          </div>
          <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
            <ToggleRow label="التحميل التلقائي للصور" description="تنزيل الصور على الواي فاي وبيانات الجوال." checked={images} onChange={setImages} />
            <ToggleRow label="التحميل التلقائي للملفات" description="تنزيل الملفات على الواي فاي فقط." checked={files} onChange={setFiles} />
            <div className="flex items-center justify-between gap-4 border-t border-border p-4">
              <div className="min-w-0 flex-1 pe-2"><p className="text-sm font-bold">مسح ذاكرة الوسائط</p><p className="mt-1 line-clamp-2 text-xs text-muted">إزالة الوسائط المخزنة من هذا الجهاز.</p></div>
              <Button size="sm" variant="secondary" className="shrink-0" onClick={() => setCacheCleared(true)}>{cacheCleared ? 'تم المسح' : 'مسح'}</Button>
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  )
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex items-center justify-between gap-4 border-b border-border p-4 last:border-b-0"><div className="min-w-0 flex-1 pe-2"><p className="text-sm font-bold">{label}</p><p className="mt-1 line-clamp-2 text-xs text-muted">{description}</p></div><Toggle checked={checked} onChange={onChange} label={label} /></div>
}