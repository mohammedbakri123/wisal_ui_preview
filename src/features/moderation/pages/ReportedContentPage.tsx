import { useMemo, useState } from 'react'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'

const initialReports = [
  { id: 'r1', title: 'رسالة في فريق التصميم', description: 'تم الإبلاغ عنها كرسائل مزعجة من قبل عضوين.', severity: 'عالية' },
  { id: 'r2', title: 'بلاغ عن الملف الشخصي', description: 'الصورة الرمزية واسم العرض يحتاجان مراجعة المشرف.', severity: 'متوسطة' },
  { id: 'r3', title: 'إساءة استخدام دعوات المجموعة', description: 'تم الإبلاغ عن دعوات متكررة غير مرغوبة.', severity: 'مفتوح' },
]

export default function ReportedContentPage() {
  const [reports, setReports] = useState(initialReports)
  const [query, setQuery] = useState('')

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return reports

    return reports.filter((report) =>
      `${report.title} ${report.description} ${report.severity}`.toLowerCase().includes(normalizedQuery),
    )
  }, [query, reports])

  if (reports.length === 0) {
    return (
      <FeatureScaffold
        title="المحتوى المُبلغ عنه"
        description="لا توجد بلاغات مفتوحة في قائمة انتظار الإشراف."
        backTo={ROUTES.MODERATION.DASHBOARD}
      />
    )
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <PageContainer className="mx-auto w-full max-w-2xl space-y-3 px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={ROUTES.MODERATION.DASHBOARD} label="لوحة التحكم" />
        <div className="rounded-2xl border border-border-light/40 bg-surface p-3">
          <label htmlFor="report-search" className="sr-only">البحث في البلاغات</label>
          <input
            id="report-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="البحث في البلاغات"
            className="h-10 w-full rounded-xl border border-border-light/50 bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary"
          />
          <p className="mt-2 px-1 text-[11px] text-muted-foreground/70">
            عرض {filteredReports.length} من {reports.length} بلاغ مفتوح
          </p>
        </div>
        {filteredReports.map((report) => (
          <article key={report.id} className="rounded-2xl border border-border-light/40 bg-surface p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{report.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground/80">{report.description}</p>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground">
                {report.severity}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => setReports((current) => current.filter((item) => item.id !== report.id))}>
                تجاهل
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setReports((current) => current.filter((item) => item.id !== report.id))}>
                تحذير
              </Button>
              <Button size="sm" variant="danger" onClick={() => setReports((current) => current.filter((item) => item.id !== report.id))}>
                حظر
              </Button>
            </div>
          </article>
        ))}
        {filteredReports.length === 0 && query.trim() && (
          <p className="rounded-2xl border border-dashed border-border-light/50 p-6 text-center text-sm text-muted-foreground">
            لا توجد بلاغات تطابق بحثك.
          </p>
        )}
      </PageContainer>
    </div>
  )
}
