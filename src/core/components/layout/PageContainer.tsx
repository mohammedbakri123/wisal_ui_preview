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
          'flex-1 overflow-y-auto scrollbar-thin momentum-scroll',
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
