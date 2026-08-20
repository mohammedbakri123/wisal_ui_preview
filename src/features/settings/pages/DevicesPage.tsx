import { useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { ROUTES } from '@/core/utils/routes'

export default function DevicesPage() {
  const [sessions, setSessions] = useState([
    { id: 'current', title: 'Chrome على لينكس', description: 'الجلسة الحالية بتوقيت آسيا/عدن.', meta: 'الحالية' },
    { id: 'iphone', title: 'Safari على iPhone', description: 'آخر نشاط منذ يومين.', meta: 'جوال' },
  ])

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <PageContainer className="w-full px-4 pt-3 pb-8">
        <div className="mx-auto w-full max-w-xl">
          <BackButton to={ROUTES.SETTINGS.ROOT} label="الإعدادات" />
          <header className="mb-6 mt-2"><p className="text-xs font-bold uppercase tracking-wider text-accent">الأمان</p><h1 className="mt-1 text-2xl font-bold">الأجهزة النشطة</h1><p className="mt-2 text-sm leading-relaxed text-muted">راجع أماكن تسجيل دخول حسابك وأنهِ الجلسات التي لم تعد تعرفها.</p></header>
          <section className="overflow-hidden rounded-2xl border border-border bg-surface">
            {sessions.map((session) => <div key={session.id} className="flex items-center gap-4 border-b border-border p-4 last:border-b-0"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">{session.id === 'current' ? '⌂' : '↗'}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{session.title}</p><p className="mt-0.5 text-xs text-muted">{session.description}</p></div>{session.id === 'current' ? <span className="shrink-0 text-xs font-bold text-success">{session.meta}</span> : <Button size="sm" variant="danger" onClick={() => setSessions((current) => current.filter((item) => item.id !== session.id))}>إنهاء الجلسة</Button>}</div>)}
            {sessions.length === 1 && <p className="p-4 text-sm text-muted">لا توجد جلسات نشطة أخرى.</p>}
          </section>
        </div>
      </PageContainer>
    </div>
  )
}