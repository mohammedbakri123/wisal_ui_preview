import { http, HttpResponse } from 'msw'
import type { User } from '@/core/types'
import { mockUsers } from '../data/users'

const API = import.meta.env.VITE_API_URL ?? '/api'

// Track which identifiers have completed OTP (simulating state)
const verifiedIdentifiers = new Set<string>()
const pendingIdentifiers = new Set<string>()

export const authHandlers = [
  // POST /auth/login — send OTP
  http.post(`${API}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { identifier: string }
    if (!body.identifier) {
      return HttpResponse.json({ message: 'Identifier is required' }, { status: 400 })
    }
    pendingIdentifiers.add(body.identifier)
    return HttpResponse.json({
      message: 'OTP sent successfully',
      expiresAt: Date.now() + 300_000,
    })
  }),

  // POST /auth/verify — verify OTP
  http.post(`${API}/auth/verify`, async ({ request }) => {
    const body = (await request.json()) as { identifier: string; code: string }

    if (!body.code || body.code.length !== 6) {
      return HttpResponse.json({ message: 'Invalid OTP code' }, { status: 400 })
    }

    // Accept "123456" or any 6-digit code as valid
    if (!/^\d{6}$/.test(body.code)) {
      return HttpResponse.json({ message: 'Invalid OTP code' }, { status: 400 })
    }

    // Check if this is a returning user
    const existingUser = mockUsers.find(
      (u) => u.email === body.identifier || u.phone === body.identifier,
    )

    if (existingUser) {
      verifiedIdentifiers.add(body.identifier)
      return HttpResponse.json({
        token: `mock_token_${existingUser.id}_${Date.now()}`,
        user: existingUser,
      })
    }

    // New user — return token without user
    verifiedIdentifiers.add(body.identifier)
    return HttpResponse.json({
      token: `mock_token_new_${Date.now()}`,
      user: null,
    })
  }),

  // POST /auth/profile — create profile
  http.post(`${API}/auth/profile`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Simulate profile creation
    const newUser: User = {
      id: String(Date.now()),
      name: 'New User',
      avatar: null,
      bio: null,
      phone: null,
      email: null,
      isOnline: true,
      lastSeen: null,
      createdAt: new Date().toISOString(),
    }

    return HttpResponse.json({
      user: newUser,
      token: authHeader.replace('Bearer ', ''),
    })
  }),

  // GET /auth/me — get current user
  http.get(`${API}/auth/me`, ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    // Extract user ID from mock token
    const match = token.match(/mock_token_(\d+)/)
    if (match) {
      const user = mockUsers.find((u) => u.id === match[1])
      if (user) {
        return HttpResponse.json({ data: { user } })
      }
    }

    return HttpResponse.json({ message: 'Invalid token' }, { status: 401 })
  }),
]
