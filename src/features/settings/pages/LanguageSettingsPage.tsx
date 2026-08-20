import { useEffect, useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { ROUTES } from '@/core/utils/routes'
import { cn } from '@/core/utils/cn'
import { STORAGE_KEYS } from '@/core/utils/constants'

const languages = [
  { id: 'en', label: 'English', nativeLabel: 'English' },
  { id: 'ar', label: 'Arabic', nativeLabel: 'العربية' },
  { id: 'fr', label: 'French', nativeLabel: 'Français' },
] as const
type LanguageId = (typeof languages)[number]['id']

export default function LanguageSettingsPage() {
  const [selected, setSelected] = useState<LanguageId>(() => (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as LanguageId | null) ?? 'en')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, selected)
    document.documentElement.lang = selected
    document.documentElement.dir = selected === 'ar' ? 'rtl' : 'ltr'
  }, [selected])

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PageContainer className="w-full max-w-xl px-3 pt-3 sm:px-4 sm:pt-4">
        <BackButton to={ROUTES.SETTINGS.ROOT} label="Settings" />
        <section className="mt-3 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
          <div className="border-b border-[#2f3336] p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#71767b]">Language</p>
            <h1 className="mt-1 text-[20px] font-bold">Choose your language</h1>
            <p className="mt-1 text-[13px] leading-relaxed text-[#71767b]">
              This controls labels and navigation throughout the app.
            </p>
          </div>
          <div className="divide-y divide-[#2f3336]">
            {languages.map((language) => {
              const active = selected === language.id
              return (
                <button
                  key={language.id}
                  type="button"
                  onClick={() => setSelected(language.id)}
                  className={cn(
                    'flex w-full items-center justify-between px-4 py-4 text-left transition-colors cursor-pointer',
                    active ? 'bg-[#1d9bf0]/[0.08]' : 'hover:bg-white/[0.03]',
                  )}
                >
                  <span>
                    <span className={cn('block text-[15px] font-bold', active && 'text-[#1d9bf0]')}>{language.nativeLabel}</span>
                    <span className="mt-0.5 block text-[13px] text-[#71767b]">{language.label}</span>
                  </span>
                  <span className={cn('flex h-5 w-5 items-center justify-center rounded-full border', active ? 'border-[#1d9bf0]' : 'border-[#536471]')}>
                    {active && <span className="h-2.5 w-2.5 rounded-full bg-[#1d9bf0]" />}
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
