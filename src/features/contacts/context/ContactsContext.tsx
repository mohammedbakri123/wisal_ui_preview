import { useMemo, useState, type ReactNode } from 'react'
import { mockUsers } from '@/mocks/data/users'
import { ContactsContext } from './contacts-context'

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState(() => mockUsers.slice(0, 2))
  const value = useMemo(() => ({
    contacts,
    addContact: (user: (typeof mockUsers)[number]) => setContacts((current) => current.some((item) => item.id === user.id) ? current : [...current, user]),
    removeContact: (userId: string) => setContacts((current) => current.filter((user) => user.id !== userId)),
  }), [contacts])

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>
}
