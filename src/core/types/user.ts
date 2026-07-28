export interface User {
  id: string
  name: string
  avatar: string | null
  bio: string | null
  phone: string | null
  email: string | null
  isOnline: boolean
  lastSeen: string | null
  createdAt: string
}

export interface UserProfile extends User {
  mutualGroups: number
}
