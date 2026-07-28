import type { User } from '@/core/types'

export interface LoginRequest {
  identifier: string
}

export interface LoginResponse {
  message: string
  expiresAt: number
}

export interface VerifyOtpRequest {
  identifier: string
  code: string
}

export interface VerifyOtpResponse {
  token: string
  user: User | null
}

export interface CreateProfileRequest {
  name: string
  avatar?: File
  bio?: string
}

export interface CreateProfileResponse {
  user: User
  token: string
}
