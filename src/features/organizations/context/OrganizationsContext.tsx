import { useMemo, useState, type ReactNode } from 'react'
import { OrganizationsContext, type Organization } from './organizations-context'

const initialOrganizations: Organization[] = [
  { id: 'org-acme', name: 'Acme Product Lab', description: 'Main workspace for product, design, and engineering teams.', members: '48', status: 'Verified' },
  { id: 'org-field', name: 'Field Support', description: 'Customer-facing operations and escalation teams.', members: '16', status: 'Verified' },
]

export function OrganizationsProvider({ children }: { children: ReactNode }) {
  const [organizations, setOrganizations] = useState(initialOrganizations)

  const value = useMemo(() => ({
    organizations,
    addOrganization(name: string, description: string) {
      const organization: Organization = {
        id: `org-${Date.now()}`,
        name,
        description: description || 'Organization awaiting verification review.',
        members: '1',
        status: 'Pending review',
      }
      setOrganizations((current) => [organization, ...current])
      return organization
    },
  }), [organizations])

  return <OrganizationsContext.Provider value={value}>{children}</OrganizationsContext.Provider>
}
