import { useState, useCallback, useEffect, useRef } from 'react'
import { authService } from '../services/auth.service'

interface UseOtpReturn {
  code: string
  setCode: (code: string) => void
  isVerifying: boolean
  error: string | null
  resendCooldown: number
  verify: () => Promise<{ token: string; user: import('@/core/types').User | null }>
  resend: () => Promise<void>
}

export function useOtp(identifier: string): UseOtpReturn {
  const [code, setCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendCooldown, setResendCooldown] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    if (resendCooldown <= 0) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [resendCooldown])

  const verify = useCallback(async () => {
    setIsVerifying(true)
    setError(null)
    try {
      const result = await authService.verifyOtp({ identifier, code })
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed'
      setError(message)
      throw err
    } finally {
      setIsVerifying(false)
    }
  }, [identifier, code])

  const resend = useCallback(async () => {
    setError(null)
    try {
      await authService.login({ identifier })
      setResendCooldown(60)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to resend'
      setError(message)
    }
  }, [identifier])

  return { code, setCode, isVerifying, error, resendCooldown, verify, resend }
}
