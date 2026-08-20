import { cn } from '@/core/utils/cn'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps {
  size?: SpinnerSize
  className?: string
}

const dotSizes: Record<SpinnerSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-3 h-3',
}

const gapSizes: Record<SpinnerSize, string> = {
  sm: 'gap-1',
  md: 'gap-1.5',
  lg: 'gap-2',
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div className={cn('inline-flex items-center justify-center', gapSizes[size], className)}>
      <span
        className={cn('rounded-full bg-[#1d9bf0] animate-bounce', dotSizes[size])}
        style={{ animationDelay: '0ms', animationDuration: '800ms' }}
      />
      <span
        className={cn('rounded-full bg-[#1d9bf0] animate-bounce', dotSizes[size])}
        style={{ animationDelay: '150ms', animationDuration: '800ms' }}
      />
      <span
        className={cn('rounded-full bg-[#1d9bf0] animate-bounce', dotSizes[size])}
        style={{ animationDelay: '300ms', animationDuration: '800ms' }}
      />
    </div>
  )
}
