import { useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { OtpInput } from '../components/OtpInput'
import { useOtp } from '../hooks/useOtp'
import { ROUTES } from '@/core/utils/routes'
import { maskIdentifier } from '@/core/utils/formatters'

export default function VerifyOtpPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [identifier] = useState(() => sessionStorage.getItem('auth_identifier') ?? '')
  const { code, setCode, isVerifying, error, resendCooldown, verify, resend } = useOtp(identifier)

  useEffect(() => {
    if (!identifier) {
      navigate(ROUTES.AUTH.LOGIN, { replace: true })
    }
  }, [identifier, navigate])

  const handleComplete = useCallback(async () => {
    if (!identifier) return
    try {
      const result = await verify()
      if (result.user) {
        login(result.user, result.token)
        sessionStorage.removeItem('auth_identifier')
        navigate(ROUTES.HOME, { replace: true })
      } else {
        sessionStorage.setItem('auth_token', result.token)
        navigate(ROUTES.AUTH.PROFILE, { replace: true })
      }
    } catch {
      // Error is already handled by useOtp
    }
  }, [identifier, login, navigate, verify])

  const masked = identifier ? maskIdentifier(identifier) : ''

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="text-center lg:text-left">
        <h2 className="font-serif italic text-[1.6rem] sm:text-[1.8rem] leading-tight text-foreground tracking-tight">
          Verify your code
        </h2>
        <p className="mt-2 text-sm text-muted-foreground/60 leading-relaxed">
          Enter the 6-digit code sent to{' '}
          <span className="text-foreground font-medium">{masked}</span>
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-accent/20 via-accent/5 to-transparent" />

      <OtpInput
        value={code}
        onChange={setCode}
        onComplete={handleComplete}
        disabled={isVerifying}
      />

      <p className="rounded-xl border border-[#1d9bf0]/20 bg-[#1d9bf0]/[0.06] px-4 py-2.5 text-center text-xs leading-relaxed text-[#71767b]">
        Development code: <span className="font-mono font-bold text-[#e7e9ea]">123456</span>
      </p>

      {error && (
        <p className="text-sm text-destructive bg-destructive/5 px-4 py-2.5 rounded-xl border border-destructive/10 text-center">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={resend}
        disabled={resendCooldown > 0 || isVerifying}
        className="w-full text-sm text-accent/70 hover:text-accent font-semibold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-center py-2"
      >
        {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border-light/5" />
        <span className="text-[11px] text-muted-foreground/30 uppercase tracking-wider font-medium">Wrong identifier?</span>
        <div className="flex-1 h-px bg-border-light/5" />
      </div>

      <button
        type="button"
        onClick={() => {
          sessionStorage.removeItem('auth_identifier')
          navigate(ROUTES.AUTH.LOGIN, { replace: true })
        }}
        className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors cursor-pointer text-center"
      >
        Use a different {identifier.includes('@') ? 'email' : 'phone number'}
      </button>
    </div>
  )
}
