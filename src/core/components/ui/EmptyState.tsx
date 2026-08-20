import type { ReactNode } from 'react'
import { cn } from '@/core/utils/cn'

export interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ReactNode
  className?: string
}

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      {icon ? (
        <div className="mb-4 text-[#71767b]">{icon}</div>
      ) : (
        <div className="mb-4 h-14 w-14 rounded-full bg-[#16181c] border border-[#2f3336] flex items-center justify-center text-[#71767b]">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </div>
      )}
      <h3 className="text-[20px] font-bold text-[#e7e9ea] leading-snug">{title}</h3>
      {description && (
        <p className="mt-1.5 text-[15px] text-[#71767b] max-w-sm leading-normal">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
