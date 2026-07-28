import type { StoryGroup } from '@/core/types/story'
import { mockUsers } from './users'

const now = Date.now()

export const mockStoryGroups: StoryGroup[] = [
  {
    userId: '2',
    userName: 'Jordan Lee',
    userAvatar: null,
    allViewed: false,
    lastUpdated: new Date(now - 30 * 60_000).toISOString(),
    stories: [
      {
        id: 's1',
        userId: '2',
        userName: 'Jordan Lee',
        userAvatar: null,
        mediaUrl: null,
        content: 'Just finished the new UI mockups! 🎨✨ What do you all think?',
        type: 'text',
        backgroundColor: '#1a1a2e',
        createdAt: new Date(now - 30 * 60_000).toISOString(),
        expiresAt: new Date(now + 18 * 3600_000).toISOString(),
        viewedBy: ['1'],
        reactions: [],
      },
      {
        id: 's2',
        userId: '2',
        userName: 'Jordan Lee',
        userAvatar: null,
        mediaUrl: null,
        content: 'Coffee and code. Name a better duo. ☕️💻',
        type: 'text',
        backgroundColor: '#2d1b00',
        createdAt: new Date(now - 2 * 3600_000).toISOString(),
        expiresAt: new Date(now + 20 * 3600_000).toISOString(),
        viewedBy: [],
        reactions: [],
      },
    ],
  },
  {
    userId: '3',
    userName: 'Sam Rivera',
    userAvatar: null,
    allViewed: false,
    lastUpdated: new Date(now - 60 * 60_000).toISOString(),
    stories: [
      {
        id: 's3',
        userId: '3',
        userName: 'Sam Rivera',
        userAvatar: null,
        mediaUrl: null,
        content: 'New PR just dropped! 🔥🚀',
        type: 'text',
        backgroundColor: '#0d2137',
        createdAt: new Date(now - 60 * 60_000).toISOString(),
        expiresAt: new Date(now + 22 * 3600_000).toISOString(),
        viewedBy: ['1'],
        reactions: [{ emoji: '🔥', userId: '1', timestamp: new Date(now - 30 * 60_000).toISOString() }],
      },
    ],
  },
  {
    userId: '1',
    userName: 'Alex Morgan',
    userAvatar: null,
    allViewed: true,
    lastUpdated: new Date(now - 4 * 3600_000).toISOString(),
    stories: [
      {
        id: 's4',
        userId: '1',
        userName: 'Alex Morgan',
        userAvatar: null,
        content: 'Building the future, one commit at a time. 🌟',
        type: 'text',
        backgroundColor: '#1b2a1e',
        createdAt: new Date(now - 4 * 3600_000).toISOString(),
        expiresAt: new Date(now + 18 * 3600_000).toISOString(),
        viewedBy: ['2', '3'],
        reactions: [
          { emoji: '👍', userId: '2', timestamp: new Date(now - 3 * 3600_000).toISOString() },
          { emoji: '💪', userId: '3', timestamp: new Date(now - 2.5 * 3600_000).toISOString() },
        ],
      },
    ],
  },
]
