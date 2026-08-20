import { createContext } from 'react'
import type { communities as initialCommunities } from '../data'

export type CommunityList = typeof initialCommunities

export interface CommunityMembershipContextValue {
  communities: CommunityList
  joinCommunity: (communityId: string) => void
  leaveCommunity: (communityId: string) => void
  addCommunity: (name: string, description: string, visibility: string) => void
}

export const CommunitiesContext = createContext<CommunityMembershipContextValue | null>(null)
