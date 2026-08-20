import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/core/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-[#71767b]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {icon && (
            <div className="absolute start-3.5 text-[#71767b] pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'h-11 w-full rounded-full bg-[#202327] border border-transparent px-4 text-[15px] text-[#e7e9ea]',
              'placeholder:text-[#71767b]',
              'focus:outline-none focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0] focus:bg-black',
              'transition-colors duration-150',
              icon && 'ps-10',
              error && 'border-[#f4212e] focus:border-[#f4212e] focus:ring-[#f4212e]',
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-[#f4212e] px-2">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
