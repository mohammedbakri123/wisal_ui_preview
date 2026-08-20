import { useNavigate } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { ROUTES } from '@/core/utils/routes'

const sections = [
  { label: 'الحساب', items: [{ title: 'إعدادات الملف الشخصي', description: 'الاسم الظاهر والصورة والنبذة والحالة', path: ROUTES.SETTINGS.PROFILE, icon: '◎' }, { title: 'إعدادات الحساب', description: 'الهاتف والبريد الإلكتروني وعناصر التحكم بالحساب', path: ROUTES.SETTINGS.ACCOUNT, icon: '@' }] },
  { label: 'الخصوصية والأمان', items: [{ title: 'الخصوصية', description: 'آخر ظهور وإيصالات القراءة والمستخدمون المحظورون', path: ROUTES.SETTINGS.PRIVACY, icon: '◈' }, { title: 'الأمان', description: 'قفل التطبيق ورمز PIN والجلسات النشطة', path: ROUTES.SETTINGS.SECURITY, icon: '⌑' }, { title: 'الأجهزة', description: 'الجلسات النشطة والأجهزة المرتبطة', path: ROUTES.SETTINGS.DEVICES, icon: '▣' }] },
  { label: 'التفضيلات', items: [{ title: 'الإشعارات', description: 'التنبيهات والأصوات ومعاينات الرسائل', path: ROUTES.SETTINGS.NOTIFICATIONS, icon: '◌' }, { title: 'إعدادات الدردشة', description: 'الكتابة والتنزيلات والخلفية والنسخ الاحتياطي', path: ROUTES.SETTINGS.CHATS, icon: '▱' }, { title: 'التخزين والبيانات', description: 'الوسائط المخزنة والتنزيلات واستخدام الشبكة', path: ROUTES.SETTINGS.STORAGE, icon: '▤' }, { title: 'المظهر', description: 'السمة وعرض المحادثات', path: ROUTES.SETTINGS.APPEARANCE, icon: '◐' }, { title: 'اللغة', description: 'اختر اللغة المستخدمة في وصال', path: ROUTES.SETTINGS.LANGUAGE, icon: '文' }] },
  { label: 'الدعم', items: [{ title: 'المساعدة والدعم', description: 'الأسئلة الشائعة والتواصل مع الدعم والإبلاغ عن مشكلة', path: ROUTES.SETTINGS.HELP, icon: '?' }, { title: 'حول', description: 'الإصدار والتراخيص والقانون والشكر', path: ROUTES.SETTINGS.ABOUT, icon: 'i' }] },
]

export default function SettingsPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  return (
    <div className="flex h-full flex-col bg-background text-foreground min-w-0 max-w-full overflow-x-hidden">
      <PageContainer className="mx-auto w-full max-w-full sm:max-w-2xl px-3 pt-4 pb-10 sm:px-4 sm:pt-5 min-w-0 box-border overflow-x-hidden">
        <header className="border-b border-border pb-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">التفضيلات</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">الإعدادات</h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">إدارة حسابك وخصوصيتك وتجربة المحادثات.</p>
        </header>
        <div className="mt-6 space-y-6">
          {sections.map((section) => (
            <section key={section.label}>
              <h2 className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted">{section.label}</h2>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                {section.items.map((item) => (
                  <button
                    type="button"
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="group flex w-full max-w-full min-w-0 items-center gap-3 border-b border-border p-3.5 text-start transition-colors last:border-b-0 hover:bg-surface-hover cursor-pointer sm:p-4 box-border overflow-hidden"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">{item.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-bold">{item.title}</span>
                      <span className="mt-1 block truncate text-xs text-muted">{item.description}</span>
                    </span>
                    <span className="shrink-0 text-lg text-muted transition-colors group-hover:text-accent">→</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
        <Button variant="danger" className="mt-8 w-full" onClick={() => { logout(); navigate(ROUTES.AUTH.LOGIN) }}>تسجيل الخروج</Button>
        <p className="mt-5 text-center text-[10px] text-muted-foreground/70">وصال v0.1.0</p>
      </PageContainer>
    </div>
  )
}