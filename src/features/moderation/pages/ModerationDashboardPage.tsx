import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function ModerationDashboardPage() {
  return (
    <FeatureScaffold
      title="الإشراف"
      description="مراجعة البلاغات والحظر وسجلات الإشراف وقواعد سلامة المنصة."
      actions={[
        { label: 'البلاغات', path: ROUTES.MODERATION.REPORTS },
        { label: 'المحظورون', path: ROUTES.MODERATION.BANS, variant: 'secondary' },
      ]}
      stats={[
        { label: 'بلاغات مفتوحة', value: '7' },
        { label: 'عالي الخطورة', value: '2' },
        { label: 'حظر', value: '14' },
        { label: 'قواعد', value: '9' },
      ]}
      sections={[
        {
          title: 'الطابور',
          items: [
            { title: 'رسائل مبلغ عنها', description: 'رسائل أبلغ عنها المستخدمون أو قواعد تلقائية.', path: ROUTES.MODERATION.REPORTS },
            { title: 'مراجعة الحظر', description: 'مستخدمون لديهم قيود نشطة وسياق الاستئناف.', path: ROUTES.MODERATION.BANS },
          ],
        },
      ]}
    />
  )
}
