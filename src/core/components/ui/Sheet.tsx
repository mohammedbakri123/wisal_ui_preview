import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/core/utils/cn'

interface SheetProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
  /** Snap points as percentages (e.g., [25, 50, 90]) */
  snapPoints?: number[]
}

export function Sheet({ open, onClose, children, title, className, snapPoints = [90] }: SheetProps) {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const translateY = useRef(0)

  useEffect(() => {
    if (open) {
      setVisible(true)
      requestAnimationFrame(() => setAnimating(true))
    } else {
      setAnimating(false)
      const timer = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleBackdropClick = () => {
    onClose()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    translateY.current = 0
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = e.touches[0].clientY - startY.current
    if (diff > 0) {
      translateY.current = diff
      if (sheetRef.current) {
        sheetRef.current.style.transform = `translateY(${Math.min(diff, 200)}px)`
      }
    }
  }

  const handleTouchEnd = () => {
    if (translateY.current > 100) {
      onClose()
    }
    if (sheetRef.current) {
      sheetRef.current.style.transform = ''
    }
    translateY.current = 0
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/60 transition-opacity duration-300',
          animating ? 'opacity-100' : 'opacity-0',
        )}
        onClick={handleBackdropClick}
      />

      {/* Sheet panel */}
      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          'relative z-10 w-full max-w-lg bg-surface rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out',
          'max-h-[90vh] flex flex-col',
          animating ? 'translate-y-0' : 'translate-y-full',
          className,
        )}
        style={{ maxHeight: `${snapPoints[0]}vh` }}
      >
        {/* Drag handle */}
        <div className="flex items-center justify-center pt-2 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Title */}
        {title && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-border-light/40 shrink-0">
            <h2 className="text-base font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  )
}
