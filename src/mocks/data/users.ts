import type { User } from '@/core/types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    avatar: null,
    bio: 'Building the future, one commit at a time.',
    phone: '+1234567890',
    email: 'alex@example.com',
    isOnline: true,
    lastSeen: null,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jordan Lee',
    avatar: null,
    bio: 'Designer & coffee enthusiast.',
    phone: '+0987654321',
    email: 'jordan@example.com',
    isOnline: false,
    lastSeen: '2025-07-25T18:30:00Z',
    createdAt: '2024-03-22T14:30:00Z',
  },
  {
    id: '3',
    name: 'Sam Rivera',
    avatar: null,
    bio: null,
    phone: '+1122334455',
    email: 'sam@example.com',
    isOnline: true,
    lastSeen: null,
    createdAt: '2024-06-10T09:15:00Z',
  },
]
