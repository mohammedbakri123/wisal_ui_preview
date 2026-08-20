import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/core/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'inverse' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-foreground hover:bg-accent-hover active:bg-accent-hover/85',
  secondary:
    'bg-transparent text-foreground border border-border-hover hover:border-foreground hover:bg-surface-hover active:bg-active',
  inverse:
    'bg-button-inverse-bg text-button-inverse-text hover:bg-button-inverse-bg/85 active:bg-button-inverse-bg/70',
  ghost:
    'bg-transparent text-muted hover:text-foreground hover:bg-surface-hover active:bg-active',
  danger:
    'bg-danger text-white hover:bg-danger/90 active:bg-danger/80',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-4 text-xs font-bold gap-1.5',
  md: 'h-9 px-5 text-sm font-bold gap-2',
  lg: 'h-[52px] px-8 text-[17px] font-bold gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d9bf0]/50',
          'disabled:pointer-events-none disabled:opacity-50',
          'cursor-pointer select-none active:scale-[0.97]',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading && (
          <span className="inline-flex items-center gap-1 -ms-1 me-1">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
