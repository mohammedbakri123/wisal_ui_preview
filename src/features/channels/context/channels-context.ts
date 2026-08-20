import { createContext } from 'react'
import type { channels as initialChannels } from '../data'

export type ChannelList = typeof initialChannels

export interface ChannelMembershipContextValue {
  channels: ChannelList
  toggleFollow: (channelId: string) => void
  addChannel: (name: string, description: string, visibility: string) => void
}

export const ChannelsContext = createContext<ChannelMembershipContextValue | null>(null)
