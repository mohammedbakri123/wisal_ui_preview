import { createContext } from 'react'
import type { User } from '@/core/types'

export interface ContactsContextValue {
  contacts: User[]
  addContact: (user: User) => void
  removeContact: (userId: string) => void
}

export const ContactsContext = createContext<ContactsContextValue | null>(null)
