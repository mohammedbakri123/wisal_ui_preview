import { useContext } from 'react'
import { ChannelsContext } from './channels-context'

export function useChannels() {
  const context = useContext(ChannelsContext)
  if (!context) throw new Error('useChannels must be used within ChannelsProvider')
  return context
}
