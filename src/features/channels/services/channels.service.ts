import { channels, channelPosts } from '../data'

export const channelsService = {
  async listJoined() {
    return channels.filter((channel) => channel.joined)
  },
  async discover() {
    return channels
  },
  async get(channelId: string) {
    return channels.find((channel) => channel.id === channelId) ?? null
  },
  async posts() {
    return channelPosts
  },
}
