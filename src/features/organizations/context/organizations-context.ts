import { createContext } from 'react'

export interface Organization {
  id: string
  name: string
  description: string
  members: string
  status: 'Verified' | 'Pending review'
}

export interface OrganizationsContextValue {
  organizations: Organization[]
  addOrganization: (name: string, description: string) => Organization
}

export const OrganizationsContext = createContext<OrganizationsContextValue | null>(null)
