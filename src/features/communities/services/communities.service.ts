import { communities, communityActivity } from '../data'

export const communitiesService = {
  async listJoined() {
    return communities.filter((community) => community.joined)
  },
  async discover() {
    return communities
  },
  async get(communityId: string) {
    return communities.find((community) => community.id === communityId) ?? null
  },
  async activity() {
    return communityActivity
  },
}
