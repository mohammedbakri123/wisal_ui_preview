import { useNavigate } from 'react-router'
import { PageContainer } from './PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'

export interface ActionLink {
  label: string
  path: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
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

interface FeatureScaffoldProps {
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
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0ea583]/5 blur-[128px]" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#0ea583]/3 blur-[100px]" />
        <div className="absolute left-1/3 top-1/4 hidden h-64 w-64 rounded-full bg-amber-500/3 blur-[100px] lg:block" />
      </div>

      <PageContainer className="relative z-10 w-full px-3 sm:px-4 pt-3 sm:pt-4">
        {backTo && <BackButton to={backTo} />}
        <div className="mx-auto max-w-2xl space-y-4 sm:space-y-5">
          <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            <div className="border-b border-white/[0.04] p-4 sm:p-5">
              {eyebrow && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#0ea583]">{eyebrow}</p>
              )}
              <h2 className="font-serif text-xl italic leading-tight tracking-tight sm:text-2xl">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground/70">{description}</p>
              {actions.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {actions.map((action) => (
                    <Button
                      key={action.path}
                      variant={action.variant ?? 'secondary'}
                      size="sm"
                      onClick={() => navigate(action.path)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {stats.length > 0 && (
              <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.04] sm:grid-cols-4 sm:divide-y-0">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-3.5 sm:p-4">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">{stat.label}</p>
                    <p className="mt-1 text-base font-bold tabular-nums sm:text-lg">{stat.value}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {sections.map((section) => (
            <section key={section.title} className="space-y-2">
              <h3 className="px-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
                {section.title}
              </h3>
              <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
                {section.items.map((item, idx) => {
                  const gradientHues = ['#0ea583', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316']
                  const hue = gradientHues[idx % gradientHues.length]
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => item.path && navigate(item.path)}
                      className="flex w-full items-center gap-3 border-b border-white/[0.04] p-3.5 text-left last:border-b-0 enabled:hover:bg-white/[0.04] disabled:cursor-default transition-colors sm:p-4"
                      disabled={!item.path}
                    >
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: hue }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{item.title}</p>
                        <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground/60">
                          {item.description}
                        </p>
                      </div>
                      {item.meta && <span className="shrink-0 text-xs text-muted-foreground/50">{item.meta}</span>}
                      {item.path && (
                        <svg className="h-4 w-4 shrink-0 text-muted-foreground/30" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.17 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </PageContainer>
    </div>
  )
}
