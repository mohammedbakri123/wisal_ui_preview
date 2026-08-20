import { BrowserRouter } from 'react-router'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { AdminAuthProvider } from '@/app/providers/AdminAuthProvider'
import { ErrorBoundary } from '@/app/providers/ErrorBoundary'
import { AppRouter } from '@/app/router'
import { CommunitiesProvider } from '@/features/communities/context/CommunitiesContext'
import { ChannelsProvider } from '@/features/channels/context/ChannelsContext'
import { ContactsProvider } from '@/features/contacts/context/ContactsContext'
import { OrganizationsProvider } from '@/features/organizations/context/OrganizationsContext'

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <BrowserRouter>
              <CommunitiesProvider>
                <ChannelsProvider>
        <ContactsProvider>
          <OrganizationsProvider>
            <AppRouter />
          </OrganizationsProvider>
        </ContactsProvider>
                </ChannelsProvider>
              </CommunitiesProvider>
            </BrowserRouter>
          </AdminAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
