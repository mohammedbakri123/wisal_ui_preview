import { useRef, useCallback, useEffect, useState } from 'react'
import { OTP_LENGTH } from '@/core/utils/constants'
import { cn } from '@/core/utils/cn'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  onComplete: () => void
  disabled?: boolean
}

export function OtpInput({ value, onChange, onComplete, disabled }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (value.length === OTP_LENGTH) {
      onComplete()
    }
  }, [value, onComplete])

  const handleChange = useCallback(
    (index: number, digit: string) => {
      if (!/^\d*$/.test(digit)) return

      const digits = digit.slice(-1)
      const newValue = value.padEnd(OTP_LENGTH, ' ').split('')
      newValue[index] = digits || ' '
      const joined = newValue.join('').slice(0, OTP_LENGTH)
      onChange(joined.replace(/\s+$/g, ''))

      if (digits && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [value, onChange],
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Backspace' && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
        const newValue = value.padEnd(OTP_LENGTH, ' ').split('')
        newValue[index - 1] = ' '
        onChange(newValue.join('').replace(/\s+$/g, ''))
      }
    },
    [value, onChange],
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
      if (pasted) {
        onChange(pasted)
        inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
      }
    },
    [onChange],
  )

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length: OTP_LENGTH }).map((_, i) => {
        const isFocused = focusedIndex === i
        const hasValue = !!value[i]

        return (
          <div
            key={i}
            className={cn(
              'relative transition-all duration-200',
              'w-10 h-12 sm:w-12 sm:h-14',
              isFocused && 'scale-105',
            )}
          >
            <input
              ref={(el) => { inputRefs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value[i] ?? ''}
              disabled={disabled}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(null)}
              className={cn(
                'w-full h-full text-center text-lg sm:text-xl font-mono font-semibold rounded-xl outline-none',
                'bg-muted/50 border-2 text-foreground',
                'transition-all duration-200',
                hasValue
                  ? 'border-accent/60 bg-accent/5 shadow-sm shadow-accent/10'
                  : 'border-border-light/60',
                isFocused && 'border-accent ring-2 ring-accent/20',
                disabled && 'opacity-50 cursor-not-allowed',
              )}
            />
            {/* Animated cursor glow */}
            {isFocused && !hasValue && (
              <div className="absolute inset-0 rounded-xl ring-2 ring-accent/20 animate-pulse" />
            )}
          </div>
        )
      })}
    </div>
  )
}
