import { useMemo, useState, type ReactNode } from 'react'
import { channels as initialChannels } from '../data'
import { ChannelsContext } from './channels-context'

export function ChannelsProvider({ children }: { children: ReactNode }) {
  const [channels, setChannels] = useState(initialChannels)
  const value = useMemo(() => ({
    channels,
    toggleFollow: (channelId: string) => setChannels((current) => current.map((channel) => channel.id === channelId ? { ...channel, joined: !channel.joined } : channel)),
    addChannel: (name: string, description: string, visibility: string) => setChannels((current) => [{ id: `channel-${Date.now()}`, name, description: description || 'A new Wisal channel.', category: 'New', subscribers: '1', posts: 0, joined: true, admin: true, verified: false, hasNewUpdate: false, lastPost: 'Channel created.', lastPostTime: 'Now', visibility }, ...current]),
  }), [channels])

  return <ChannelsContext.Provider value={value}>{children}</ChannelsContext.Provider>
}
