import type { User } from '@/core/types'
import { mockUsers } from '@/mocks/data/users'
import type {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  CreateProfileRequest,
  CreateProfileResponse,
} from '../types/auth.types'

const verifiedIdentifiers = new Set<string>()
const pendingIdentifiers = new Set<string>()

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    await new Promise((r) => setTimeout(r, 400))
    if (!data.identifier) throw new Error('Identifier is required')
    pendingIdentifiers.add(data.identifier)
    return { message: 'OTP sent successfully', expiresAt: Date.now() + 300_000 }
  },

  async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    await new Promise((r) => setTimeout(r, 500))
    if (!data.code || data.code.length !== 6) throw new Error('Invalid OTP code')
    if (!/^\d{6}$/.test(data.code)) throw new Error('Invalid OTP code')

    const existingUser = mockUsers.find(
      (u) => u.email === data.identifier || u.phone === data.identifier,
    )

    verifiedIdentifiers.add(data.identifier)

    if (existingUser) {
      return {
        token: `mock_token_${existingUser.id}_${Date.now()}`,
        user: existingUser,
      }
    }

    return {
      token: `mock_token_new_${Date.now()}`,
      user: null,
    }
  },

  async createProfile(data: CreateProfileRequest, token: string): Promise<CreateProfileResponse> {
    await new Promise((r) => setTimeout(r, 500))
    if (!token?.startsWith('mock_token')) throw new Error('Unauthorized')

    const newUser: User = {
      id: String(Date.now()),
      name: data.name,
      avatar: null,
      bio: data.bio ?? null,
      phone: null,
      email: null,
      isOnline: true,
      lastSeen: null,
      createdAt: new Date().toISOString(),
    }

    return { user: newUser, token }
  },

  async getCurrentUser(token: string): Promise<{ user: User }> {
    await new Promise((r) => setTimeout(r, 200))
    if (!token?.startsWith('mock_token_')) throw new Error('Invalid token')

    const match = token.match(/mock_token_(\d+)/)
    if (match) {
      const user = mockUsers.find((u) => u.id === match[1])
      if (user) return { user }
    }

    throw new Error('Invalid token')
  },
}
