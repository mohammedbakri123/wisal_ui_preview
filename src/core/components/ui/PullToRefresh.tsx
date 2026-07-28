import type { ReactNode } from 'react'
import { cn } from '@/core/utils/cn'
import { usePullToRefresh } from '@/core/hooks/usePullToRefresh'

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void
  children: (setScrollRef: (el: HTMLDivElement | null) => void) => ReactNode
  disabled?: boolean
  className?: string
}

export function PullToRefresh({ onRefresh, children, disabled, className }: PullToRefreshProps) {
  const { setScrollRef, pullState, pullDistance, pullProgress } = usePullToRefresh<HTMLDivElement>({
    onRefresh,
    disabled,
    pullThreshold: 80,
    maxPullDistance: 120,
  })

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Pull indicator */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center transition-opacity z-10"
        style={{
          top: pullDistance > 0 ? 0 : -40,
          height: Math.max(pullDistance, 0),
          opacity: Math.min(pullProgress, 1),
        }}
      >
        <div className="flex flex-col items-center gap-1">
          {pullState === 'refreshing' ? (
            <svg className="h-6 w-6 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : pullState === 'threshold-reached' ? (
            <svg className="h-6 w-6 text-accent animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-muted-foreground/60 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              style={{ transform: `rotate(${pullProgress * 180}deg)` }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          )}
          <span className="text-[10px] font-medium text-muted-foreground/60">
            {pullState === 'refreshing' ? 'Refreshing...' : pullState === 'threshold-reached' ? 'Release to refresh' : 'Pull to refresh'}
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="transition-transform duration-200 ease-out h-full flex flex-col min-h-0"
        style={{
          transform: pullState !== 'refreshing' ? `translateY(${pullDistance}px)` : `translateY(0px)`,
        }}
      >
        {children(setScrollRef)}
      </div>
    </div>
  )
}
