import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function AboutPage() {
  return (
    <FeatureScaffold
      title="حول"
      description="نموذج واجهة وصال مبني بـ React و Vite و TypeScript و Tailwind CSS و MSW."
      backTo={ROUTES.SETTINGS.ROOT}
      stats={[
        { label: 'الإصدار', value: '0.1.0' },
        { label: 'البناء', value: 'Vite' },
        { label: 'الواجهة', value: 'React' },
        { label: 'المحاكاة', value: 'MSW' },
      ]}
      sections={[
        {
          title: 'قانوني',
          items: [
            { title: 'شروط الخدمة', description: 'مسار مؤقت لنسخة قانونية.' },
            { title: 'سياسة الخصوصية', description: 'مسار مؤقت لنسخة معالجة البيانات.' },
            { title: 'تراخيص مفتوحة المصدر', description: 'حزم وقت التشغيل واعتمادات الطرف الثالث.' },
          ],
        },
      ]}
    />
  )
}
