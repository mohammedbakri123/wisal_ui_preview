import { useMemo, useState, type ReactNode } from 'react'
import { communities as initialCommunities } from '../data'
import { CommunitiesContext } from './communities-context'

export function CommunitiesProvider({ children }: { children: ReactNode }) {
  const [communities, setCommunities] = useState(initialCommunities)
  const value = useMemo(() => ({
    communities,
    joinCommunity: (communityId: string) => setCommunities((current) => current.map((community) => community.id === communityId ? { ...community, joined: true } : community)),
    leaveCommunity: (communityId: string) => setCommunities((current) => current.map((community) => community.id === communityId ? { ...community, joined: false } : community)),
    addCommunity: (name: string, description: string, visibility: string) => setCommunities((current) => [{ id: `community-${Date.now()}`, name, description: description || 'A new Wisal community.', category: 'New', members: '1', groups: 0, channels: 0, groupList: [], channelIds: [], joined: true, owner: true, verified: false, unreadCount: 0, lastMessage: 'Community created.', lastMessageTime: 'Now', visibility }, ...current]),
  }), [communities])

  return <CommunitiesContext.Provider value={value}>{children}</CommunitiesContext.Provider>
}
