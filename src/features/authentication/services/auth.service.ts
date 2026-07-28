import { API_BASE_URL } from '@/core/utils/constants'
import type { User } from '@/core/types'
import type {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  CreateProfileRequest,
  CreateProfileResponse,
} from '../types/auth.types'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message ?? `HTTP ${res.status}`)
  }

  return res.json()
}

export const authService = {
  login(data: LoginRequest) {
    return request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  verifyOtp(data: VerifyOtpRequest) {
    return request<VerifyOtpResponse>('/auth/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  createProfile(data: CreateProfileRequest, token: string) {
    const formData = new FormData()
    formData.append('name', data.name)
    if (data.bio) formData.append('bio', data.bio)
    if (data.avatar) formData.append('avatar', data.avatar)

    return request<CreateProfileResponse>('/auth/profile', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
  },

  getCurrentUser(token: string) {
    return request<{ user: User }>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}
