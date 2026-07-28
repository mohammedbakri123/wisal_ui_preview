import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { ProfileForm } from '../components/ProfileForm'
import { authService } from '../services/auth.service'
import { ROUTES } from '@/core/utils/routes'

export default function CreateProfilePage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token] = useState(() => sessionStorage.getItem('auth_token'))

  useEffect(() => {
    if (!token) {
      navigate(ROUTES.AUTH.LOGIN, { replace: true })
    }
  }, [navigate, token])

  const handleSubmit = async (data: { name: string; avatar?: File; bio?: string }) => {
    if (!token) return
    setIsLoading(true)
    setError(null)
    try {
      const result = await authService.createProfile(data, token)
      login(result.user, result.token)
      sessionStorage.removeItem('auth_token')
      sessionStorage.removeItem('auth_identifier')
      navigate(ROUTES.HOME, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProfileForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
  )
}
