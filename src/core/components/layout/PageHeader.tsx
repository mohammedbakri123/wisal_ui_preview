import type { ReactNode } from 'react'
import { cn } from '@/core/utils/cn'

interface PageHeaderProps {
  title: ReactNode
  onBack?: () => void
  actions?: ReactNode
  className?: string
}

export function PageHeader({ title, onBack, actions, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex items-center h-14 px-4 bg-panel-header',
        className,
      )}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="mr-3 -ml-1 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all cursor-pointer"
          aria-label="Go back"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <h1 className="flex-1 text-base font-semibold truncate">{title}</h1>
      {actions && <div className="flex items-center gap-1 ml-2">{actions}</div>}
    </header>
  )
}
