import { useNavigate } from 'react-router'
import { cn } from '@/core/utils/cn'

export interface BackButtonProps {
  to?: string
  label?: string
  className?: string
}

export function BackButton({ to, label, className }: BackButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className={cn(
        'w-[34.75px] h-[34.75px] rounded-full flex items-center justify-center text-[#e7e9ea] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors cursor-pointer shrink-0',
        className,
      )}
      aria-label="Go back"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </button>
  )
}
