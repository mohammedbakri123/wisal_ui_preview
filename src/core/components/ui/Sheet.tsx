import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/core/utils/cn'

export interface SheetProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: ReactNode
  className?: string
  snapPoints?: number[]
}

export function Sheet({ open, onClose, children, title, className }: SheetProps) {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => {
        setVisible(true)
        setAnimating(true)
      })
      return () => cancelAnimationFrame(frame)
    } else {
      const frame = requestAnimationFrame(() => setAnimating(false))
      const timer = setTimeout(() => setVisible(false), 200)
      return () => {
        cancelAnimationFrame(frame)
        clearTimeout(timer)
      }
    }
  }, [open])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop with 40% blur overlay per DESIGN.md */}
      <div
        className={cn(
          'fixed inset-0 bg-[#5b7083]/40 backdrop-blur-sm transition-opacity duration-200',
          animating ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />

      {/* Modal Dialog Panel */}
      <div
        ref={sheetRef}
        className={cn(
          'relative z-10 w-full max-w-lg bg-black border border-[#2f3336] rounded-2xl shadow-2xl transition-all duration-200 ease-out',
          'max-h-[85vh] flex flex-col overflow-hidden',
          animating ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2f3336] shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-[34.75px] h-[34.75px] rounded-full flex items-center justify-center text-[#e7e9ea] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {title && (
              <h2 className="text-[20px] font-bold text-[#e7e9ea] leading-none">
                {title}
              </h2>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-5 text-[#e7e9ea]">
          {children}
        </div>
      </div>
    </div>
  )
}
