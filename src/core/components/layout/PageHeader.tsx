import type { ReactNode } from 'react'
import { cn } from '@/core/utils/cn'

export interface PageHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  onBack?: () => void
  actions?: ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, onBack, actions, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex items-center min-h-[53px] px-4 bg-black/65 backdrop-blur-md border-b border-[#2f3336] shrink-0',
        className,
      )}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="me-3 -ms-1.5 w-[34.75px] h-[34.75px] rounded-full flex items-center justify-center text-[#e7e9ea] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors cursor-pointer shrink-0"
          aria-label="رجوع"
        >
          <svg className="h-5 w-5 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-[20px] font-bold text-[#e7e9ea] leading-6 truncate">{title}</h1>
        {subtitle && <p className="text-[13px] text-[#71767b] leading-4 truncate">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-1 ms-2 shrink-0">{actions}</div>}
    </header>
  )
}
