import { useState } from 'react'
import { useNavigate } from 'react-router'
import { LoginForm } from '../components/LoginForm'
import { authService } from '../services/auth.service'
import { ROUTES } from '@/core/utils/routes'

export default function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (identifier: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await authService.login({ identifier })
      sessionStorage.setItem('auth_identifier', identifier)
      sessionStorage.setItem('auth_expires_at', String(result.expiresAt))
      navigate(ROUTES.AUTH.VERIFY)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} mode="login" />
}
