import { useContext } from 'react'
import { OrganizationsContext } from './organizations-context'

export function useOrganizations() {
  const context = useContext(OrganizationsContext)
  if (!context) throw new Error('useOrganizations must be used inside OrganizationsProvider')
  return context
}
