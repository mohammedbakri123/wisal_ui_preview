import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function HelpSupportPage() {
  return (
    <FeatureScaffold
      title="المساعدة والدعم"
      description="الوصول إلى موارد الدعم، والإبلاغ عن مشكلة، ومراجعة أدلة استكشاف الأخطاء."
      backTo={ROUTES.SETTINGS.ROOT}
      sections={[
        {
          title: 'الدعم',
          items: [
            { title: 'الأسئلة الشائعة', description: 'إجابات شائعة لتسجيل الدخول والمراسلة والإشعارات والخصوصية.' },
            { title: 'التواصل مع الدعم', description: 'أرسل بيانات التشخيص وصف ما حدث.' },
            { title: 'الإبلاغ عن مشكلة', description: 'أرفق لقطة شاشة وسياق المسار للتحقيق.' },
          ],
        },
      ]}
    />
  )
}
