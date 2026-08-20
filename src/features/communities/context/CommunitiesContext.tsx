import { useMemo, useState, type ReactNode } from 'react'
import { communities as initialCommunities } from '../data'
import { CommunitiesContext, type CommunityChannel } from './communities-context'
import { addMockConversation, removeMockConversation } from '@/features/chat/hooks/useConversations'

export function CommunitiesProvider({ children }: { children: ReactNode }) {
  const [communities, setCommunities] = useState(initialCommunities)
  const value = useMemo(() => ({
    communities,
    joinCommunity: (communityId: string) => setCommunities((current) => current.map((community) => community.id === communityId ? { ...community, joined: true } : community)),
    leaveCommunity: (communityId: string) => setCommunities((current) => current.map((community) => community.id === communityId ? { ...community, joined: false } : community)),
    addCommunity: (name: string, description: string, visibility: string) => setCommunities((current) => [{
      id: `community-${Date.now()}`,
      name,
      description: description || 'A new Wisal community.',
      category: 'New',
      members: '1',
      groups: 0,
      joined: true,
      owner: true,
      verified: false,
      unreadCount: 0,
      lastMessage: 'Community created.',
      lastMessageTime: 'Now',
      groupList: [],
      channels: [{
        id: `ann-community-${Date.now()}`,
        name: 'الإعلانات',
        description: 'القناة الرسمية لهذا المجتمع. تصدر الإدارة هنا الإعلانات والتحديثات الرئيسية فقط.',
        category: 'إعلانات',
        subscribers: '1',
        posts: 0,
        joined: true,
        admin: true,
        verified: false,
        isAnnouncement: true,
        hasNewUpdate: false,
        lastPost: 'أهلاً بك في إعلانات المجتمع.',
        lastPostTime: 'Now',
      }],
      visibility,
    }, ...current]),

    addGroup: (communityId: string, name: string) => {
      const group = {
        id: `g-${communityId}-${Date.now()}`,
        name,
        members: '1',
        lastMessage: 'تم إنشاء المجموعة.',
        isMuted: false,
      }
      setCommunities((current) => current.map((community) => (
        community.id === communityId ? { ...community, groupList: [...community.groupList, group] } : community
      )))
      addMockConversation({
        id: group.id,
        name,
        avatar: null,
        type: 'group',
        lastMessage: group.lastMessage,
        lastMessageAt: new Date().toISOString(),
        unreadCount: 0,
        members: [],
        isMuted: false,
        isPinned: false,
        createdAt: new Date().toISOString(),
      })
    },

    removeGroup: (communityId: string, groupId: string) => {
      setCommunities((current) => current.map((community) => (
        community.id === communityId ? { ...community, groupList: community.groupList.filter((group) => group.id !== groupId) } : community
      )))
      removeMockConversation(groupId)
    },

    addChannel: (communityId: string, channel: Omit<CommunityChannel, 'id' | 'posts'>) => {
      const full: CommunityChannel = {
        ...channel,
        id: `ch-${communityId}-${Date.now()}`,
        posts: 0,
        isAnnouncement: false,
      }
      setCommunities((current) => current.map((community) => (
        community.id === communityId ? { ...community, channels: [...community.channels, full] } : community
      )))
    },

    removeChannel: (communityId: string, channelId: string) => {
      setCommunities((current) => current.map((community) => (
        community.id === communityId ? { ...community, channels: community.channels.filter((channel) => channel.id !== channelId) } : community
      )))
    },

    toggleChannelJoined: (communityId: string, channelId: string) => {
      setCommunities((current) => current.map((community) => (
        community.id === communityId
          ? { ...community, channels: community.channels.map((channel) => channel.id === channelId ? { ...channel, joined: !channel.joined } : channel) }
          : community
      )))
    },
  }), [communities])

  return <CommunitiesContext.Provider value={value}>{children}</CommunitiesContext.Provider>
}