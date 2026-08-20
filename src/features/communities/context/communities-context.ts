import { createContext } from 'react'
import type { communities as initialCommunities } from '../data'

export type CommunityList = typeof initialCommunities
export type Community = CommunityList[number]
export type CommunityChannel = Community['channels'][number]
export type CommunityGroup = Community['groupList'][number]

export interface CommunityMembershipContextValue {
  communities: CommunityList
  joinCommunity: (communityId: string) => void
  leaveCommunity: (communityId: string) => void
  addCommunity: (name: string, description: string, visibility: string) => void
  addGroup: (communityId: string, name: string) => void
  removeGroup: (communityId: string, groupId: string) => void
  addChannel: (communityId: string, channel: Omit<CommunityChannel, 'id' | 'posts'>) => void
  removeChannel: (communityId: string, channelId: string) => void
  toggleChannelJoined: (communityId: string, channelId: string) => void
}

export const CommunitiesContext = createContext<CommunityMembershipContextValue | null>(null)
