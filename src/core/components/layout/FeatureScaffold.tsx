import { useNavigate } from 'react-router'
import { PageContainer } from './PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'

export interface ActionLink {
  label: string
  path: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  onClick?: () => void
}

export interface StatItem {
  label: string
  value: string
}

export interface DetailItem {
  title: string
  description: string
  meta?: string
  path?: string
}

export interface FeatureScaffoldProps {
  title: string
  eyebrow?: string
  description: string
  stats?: StatItem[]
  actions?: ActionLink[]
  sections?: Array<{
    title: string
    items: DetailItem[]
  }>
  backTo?: string
}

export function FeatureScaffold({
  title,
  eyebrow,
  description,
  stats = [],
  actions = [],
  sections = [],
  backTo,
}: FeatureScaffoldProps) {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-black text-[#e7e9ea]">
      <PageContainer className="relative z-10 w-full px-4 pt-3 pb-8">
        {backTo && (
          <div className="mb-2">
            <BackButton to={backTo} />
          </div>
        )}
        <div className="mx-auto max-w-2xl space-y-4">
          <section className="border border-[#2f3336] rounded-2xl bg-[#16181c] overflow-hidden">
            <div className="border-b border-[#2f3336] p-4 sm:p-5">
              {eyebrow && (
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">
                  {eyebrow}
                </p>
              )}
              <h2 className="text-[20px] font-bold tracking-tight text-[#e7e9ea]">{title}</h2>
              <p className="mt-1.5 text-[15px] leading-normal text-[#71767b]">{description}</p>
              {actions.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {actions.map((action) => (
                    <Button
                      key={action.path}
                      variant={action.variant ?? 'secondary'}
                      size="sm"
                      onClick={() => { action.onClick?.(); navigate(action.path) }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {stats.length > 0 && (
              <div className="grid grid-cols-2 divide-x divide-y divide-[#2f3336] sm:grid-cols-4 sm:divide-y-0">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-3.5 sm:p-4">
                    <p className="text-[12px] font-medium text-[#71767b]">{stat.label}</p>
                    <p className="mt-0.5 text-base font-bold text-[#e7e9ea] tabular-nums">{stat.value}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {sections.map((section) => (
            <section key={section.title} className="space-y-2">
              <h3 className="px-1 text-[13px] font-bold uppercase tracking-wider text-[#71767b]">
                {section.title}
              </h3>
              <div className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
                {section.items.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => item.path && navigate(item.path)}
                    className="flex w-full items-center gap-3 border-b border-[#2f3336] p-4 text-left last:border-b-0 enabled:hover:bg-white/[0.03] disabled:cursor-default transition-colors cursor-pointer"
                    disabled={!item.path}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-bold text-[#e7e9ea]">{item.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-[#71767b]">
                        {item.description}
                      </p>
                    </div>
                    {item.meta && <span className="shrink-0 text-xs text-[#71767b]">{item.meta}</span>}
                    {item.path && (
                      <svg className="h-4 w-4 shrink-0 text-[#71767b]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.17 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </PageContainer>
    </div>
  )
}
