import { useEffect, useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { ROUTES } from '@/core/utils/routes'
import { cn } from '@/core/utils/cn'
import { STORAGE_KEYS } from '@/core/utils/constants'

const languages = [
  { id: 'en', label: 'الإنجليزية', nativeLabel: 'English' },
  { id: 'ar', label: 'العربية', nativeLabel: 'العربية' },
  { id: 'fr', label: 'الفرنسية', nativeLabel: 'Français' },
] as const
type LanguageId = (typeof languages)[number]['id']

export default function LanguageSettingsPage() {
  const [selected, setSelected] = useState<LanguageId>(() => (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as LanguageId | null) ?? 'ar')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, selected)
    document.documentElement.lang = selected
    document.documentElement.dir = selected === 'ar' ? 'rtl' : 'ltr'
  }, [selected])

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <PageContainer className="w-full max-w-xl px-3 pt-3 sm:px-4 sm:pt-4">
        <BackButton to={ROUTES.SETTINGS.ROOT} label="الإعدادات" />
        <section className="mt-3 overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="border-b border-border p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">اللغة</p>
            <h1 className="mt-1 text-[20px] font-bold">اختر لغتك</h1>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              هذا يتحكم في التسميات والتنقل في جميع أنحاء التطبيق.
            </p>
          </div>
          <div className="divide-y divide-border">
            {languages.map((language) => {
              const active = selected === language.id
              return (
                <button
                  key={language.id}
                  type="button"
                  onClick={() => setSelected(language.id)}
                  className={cn(
                    'flex w-full items-center justify-between px-4 py-4 text-start transition-colors cursor-pointer',
                    active ? 'bg-accent/[0.08]' : 'hover:bg-surface-hover',
                  )}
                >
                  <span className="min-w-0 flex-1 pe-2">
                    <span className={cn('block text-[15px] font-bold', active && 'text-accent')}>{language.nativeLabel}</span>
                    <span className="mt-0.5 block text-[13px] text-muted">{language.label}</span>
                  </span>
                  <span className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded-full border', active ? 'border-accent' : 'border-border-hover')}>
                    {active && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
                  </span>
                </button>
              )
            })}
          </div>
        </section>
      </PageContainer>
    </div>
  )
}