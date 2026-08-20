import type { ReactNode } from 'react'
import { cn } from '@/core/utils/cn'
import { usePullToRefresh } from '@/core/hooks/usePullToRefresh'

export interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void
  children: (setScrollRef: (el: HTMLDivElement | null) => void) => ReactNode
  disabled?: boolean
  className?: string
}

export function PullToRefresh({ onRefresh, children, disabled, className }: PullToRefreshProps) {
  const { setScrollRef, pullState, pullDistance, pullProgress } = usePullToRefresh<HTMLDivElement>({
    onRefresh,
    disabled,
    pullThreshold: 70,
    maxPullDistance: 100,
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
        <div className="flex items-center justify-center p-2">
          {pullState === 'refreshing' ? (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d9bf0] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d9bf0] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d9bf0] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <div
              className="w-7 h-7 rounded-full bg-[#202327] border border-[#2f3336] flex items-center justify-center text-[#1d9bf0] shadow transition-transform"
              style={{ transform: `rotate(${pullProgress * 180}deg)` }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="transition-transform duration-150 ease-out h-full flex flex-col min-h-0"
        style={{
          transform: pullState !== 'refreshing' ? `translateY(${pullDistance}px)` : 'translateY(0px)',
        }}
      >
        {children(setScrollRef)}
      </div>
    </div>
  )
}
