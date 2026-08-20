import { type ReactNode, forwardRef } from 'react'
import { cn } from '@/core/utils/cn'

interface PageContainerProps {
  children: ReactNode
  className?: string
  padded?: boolean
}

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ children, className, padded = true }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          'flex-1 min-w-0 max-w-full overflow-y-auto overflow-x-hidden scrollbar-thin momentum-scroll box-border',
          padded && 'p-4',
          className,
        )}
      >
        {children}
      </main>
    )
  },
)

PageContainer.displayName = 'PageContainer'
