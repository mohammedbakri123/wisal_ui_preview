import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Input } from '@/core/components/ui/Input'
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
  const [identifier, setIdentifier] = useState('')
  const [phoneOrEmail, setPhoneOrEmail] = useState<'phone' | 'email'>('phone')

  const placeholder = phoneOrEmail === 'phone' ? '+1 234 567 8900' : 'you@example.com'
  const label = phoneOrEmail === 'phone' ? 'Phone number' : 'Email address'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!identifier.trim()) return
    await onSubmit(identifier.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
      <div className="text-center lg:text-left">
        <h2 className="font-serif italic text-[1.6rem] sm:text-[1.8rem] leading-tight text-foreground tracking-tight">
          {mode === 'signup' ? 'Create account' : 'Welcome back'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground/60 leading-relaxed">
          {mode === 'signup'
            ? 'Enter your phone or email to get started'
            : `Enter your ${phoneOrEmail === 'phone' ? 'phone number' : 'email'} to sign in`}
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-accent/20 via-accent/5 to-transparent" />

      {/* Mode toggle */}
      <div className="flex rounded-xl bg-muted/50 p-1 border border-border-light/10">
        <button
          type="button"
          onClick={() => setPhoneOrEmail('phone')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
            phoneOrEmail === 'phone'
              ? 'bg-background text-foreground shadow-sm border border-border-light/20'
              : 'text-muted-foreground/60 hover:text-foreground'
          }`}
        >
          Phone
        </button>
        <button
          type="button"
          onClick={() => setPhoneOrEmail('email')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
            phoneOrEmail === 'email'
              ? 'bg-background text-foreground shadow-sm border border-border-light/20'
              : 'text-muted-foreground/60 hover:text-foreground'
          }`}
        >
          Email
        </button>
      </div>

      <Input
        label={label}
        type={phoneOrEmail === 'phone' ? 'tel' : 'email'}
        placeholder={placeholder}
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        autoComplete={phoneOrEmail === 'phone' ? 'tel' : 'email'}
        autoFocus
        className="bg-surface/30 border-border-light/10 focus:border-accent/40"
      />

      {error && (
        <p className="text-sm text-destructive bg-destructive/5 px-4 py-2.5 rounded-xl border border-destructive/10">
          {error}
        </p>
      )}

      <Button type="submit" loading={isLoading} className="w-full h-12 rounded-xl text-sm font-semibold">
        {mode === 'signup' ? 'Create account' : 'Continue'}
      </Button>

      <p className="text-xs text-center text-muted-foreground/40 max-w-xs mx-auto leading-relaxed">
        We'll send you a one-time code to {mode === 'signup' ? 'verify your identity' : 'sign in'}
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
