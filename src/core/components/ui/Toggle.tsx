import { cn } from '@/core/utils/cn'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
  destructive?: boolean
}

export function Toggle({ checked, onChange, label, disabled = false, destructive = false }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-150',
        checked ? (destructive ? 'bg-[#f4212e]' : 'bg-[#1d9bf0]') : 'bg-[#2f3336]',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-150',
          checked ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  )
}
