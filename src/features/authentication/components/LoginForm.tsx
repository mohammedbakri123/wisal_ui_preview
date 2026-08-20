import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'

interface LoginFormProps {
  onSubmit: (identifier: string) => Promise<void>
  isLoading?: boolean
  error?: string | null
  mode?: 'login' | 'signup'
}

export function LoginForm({ onSubmit, isLoading, error, mode = 'login' }: LoginFormProps) {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+1')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, '')
    if (!digits) return
    await onSubmit(`${countryCode}${digits}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
      <div className="text-center lg:text-left">
        <h2 className="font-serif italic text-[1.6rem] sm:text-[1.8rem] leading-tight text-foreground tracking-tight">
          {mode === 'signup' ? 'Create account' : 'Welcome back'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground/60 leading-relaxed">
          {mode === 'signup' ? 'Enter your phone number to get started' : 'Enter your phone number to sign in'}
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-accent/20 via-accent/5 to-transparent" />

      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor="phone-number" className="text-[13px] font-medium text-[#71767b]">Phone number</label>
        <div className="flex h-11 w-full overflow-hidden rounded-full bg-[#202327] border border-transparent focus-within:border-[#1d9bf0] focus-within:ring-1 focus-within:ring-[#1d9bf0] focus-within:bg-black transition-colors">
          <label className="flex items-center border-r border-[#2f3336] px-3 text-[15px] text-[#e7e9ea]">
            <span className="sr-only">Country code</span>
            <select
              aria-label="Country code"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="h-full bg-transparent pr-1 text-[15px] text-[#e7e9ea] outline-none cursor-pointer"
            >
              <option value="+1" className="bg-[#16181c]">US +1</option>
              <option value="+20" className="bg-[#16181c]">EG +20</option>
              <option value="+44" className="bg-[#16181c]">GB +44</option>
              <option value="+967" className="bg-[#16181c]">YE +967</option>
              <option value="+971" className="bg-[#16181c]">AE +971</option>
            </select>
          </label>
          <input
            id="phone-number"
            type="tel"
            inputMode="tel"
            placeholder="234 567 8900"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel-national"
            autoFocus
            className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#e7e9ea] placeholder:text-[#71767b] outline-none"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/5 px-4 py-2.5 rounded-xl border border-destructive/10">
          {error}
        </p>
      )}

      <Button type="submit" loading={isLoading} className="w-full h-12 rounded-xl text-sm font-semibold">
        {mode === 'signup' ? 'Create account' : 'Continue'}
      </Button>

      <p className="text-xs text-center text-muted-foreground/40 max-w-xs mx-auto leading-relaxed">
        We’ll send a one-time verification code to this number
      </p>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border-light/5" />
        <span className="text-[11px] text-muted-foreground/30 uppercase tracking-wider font-medium">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
        </span>
        <div className="flex-1 h-px bg-border-light/5" />
      </div>

      <button
        type="button"
        onClick={() => navigate(mode === 'signup' ? ROUTES.AUTH.LOGIN : ROUTES.AUTH.SIGNUP)}
        className="text-sm text-accent/70 hover:text-accent font-semibold transition-colors cursor-pointer text-center"
      >
        {mode === 'signup' ? 'Sign in' : 'Create one'}
      </button>
    </form>
  )
}
