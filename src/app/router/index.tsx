import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { MainLayout } from '@/app/layouts/MainLayout'
import { ChatLayout } from '@/app/layouts/ChatLayout'
import { AuthGuard } from '@/app/guards/AuthGuard'
import { GuestGuard } from '@/app/guards/GuestGuard'
import { AdminGuard } from '@/app/guards/AdminGuard'
import { AdminLayout } from '@/app/layouts/AdminLayout'
import { Spinner } from '@/core/components/ui/Spinner'
import { ROUTES } from '@/core/utils/routes'

const LoginPage = lazy(() => import('@/features/authentication/pages/LoginPage'))
const SignUpPage = lazy(() => import('@/features/authentication/pages/SignUpPage'))
const VerifyOtpPage = lazy(() => import('@/features/authentication/pages/VerifyOtpPage'))
const CreateProfilePage = lazy(() => import('@/features/authentication/pages/CreateProfilePage'))
const ConversationPage = lazy(() => import('@/features/chat/pages/ConversationPage'))
const ChatDetailsPage = lazy(() => import('@/features/chat/pages/ChatDetailsPage'))
const GroupPage = lazy(() => import('@/features/chat/pages/GroupPage'))
const GroupDetailsPage = lazy(() => import('@/features/chat/pages/GroupDetailsPage'))
const ArchivedChatsPage = lazy(() => import('@/features/chat/pages/ArchivedChatsPage'))
const PinnedChatsPage = lazy(() => import('@/features/chat/pages/PinnedChatsPage'))
const SearchChatsPage = lazy(() => import('@/features/chat/pages/SearchChatsPage'))
const SearchMessagesPage = lazy(() => import('@/features/chat/pages/SearchMessagesPage'))
const SharedMediaPage = lazy(() => import('@/features/chat/pages/SharedMediaPage'))
const AddChatPage = lazy(() => import('@/features/chat/pages/AddChatPage'))
const CreateGroupPage = lazy(() => import('@/features/chat/pages/CreateGroupPage'))
const GroupMembersPage = lazy(() => import('@/features/chat/pages/GroupMembersPage'))
const GroupSettingsPage = lazy(() => import('@/features/chat/pages/GroupSettingsPage'))

// Channels pages
const JoinedChannelsPage = lazy(() => import('@/features/channels/pages/JoinedChannelsPage'))
const DiscoverChannelsPage = lazy(() => import('@/features/channels/pages/DiscoverChannelsPage'))
const CreateChannelPage = lazy(() => import('@/features/channels/pages/CreateChannelPage'))
const ChannelFeedPage = lazy(() => import('@/features/channels/pages/ChannelFeedPage'))
const ChannelDetailsPage = lazy(() => import('@/features/channels/pages/ChannelDetailsPage'))
const InviteMembersPage = lazy(() => import('@/features/channels/pages/InviteMembersPage'))
const ChannelAnalyticsPage = lazy(() => import('@/features/channels/pages/ChannelAnalyticsPage'))
const ChannelSettingsPage = lazy(() => import('@/features/channels/pages/ChannelSettingsPage'))
const ChannelAdminsPage = lazy(() => import('@/features/channels/pages/ChannelAdminsPage'))
const ChannelPostsPage = lazy(() => import('@/features/channels/pages/ChannelPostsPage'))

// Communities pages
const JoinedCommunitiesPage = lazy(() => import('@/features/communities/pages/JoinedCommunitiesPage'))
const DiscoverCommunitiesPage = lazy(() => import('@/features/communities/pages/DiscoverCommunitiesPage'))
const CommunityDetailsPage = lazy(() => import('@/features/communities/pages/CommunityDetailsPage'))
const JoinCommunityPage = lazy(() => import('@/features/communities/pages/JoinCommunityPage'))
const CommunityOverviewPage = lazy(() => import('@/features/communities/pages/CommunityOverviewPage'))
const CommunityMembersPage = lazy(() => import('@/features/communities/pages/CommunityMembersPage'))
const CommunityGroupsPage = lazy(() => import('@/features/communities/pages/CommunityGroupsPage'))
const CommunityChannelsPage = lazy(() => import('@/features/communities/pages/CommunityChannelsPage'))
const CommunityAboutPage = lazy(() => import('@/features/communities/pages/CommunityAboutPage'))
const CreateCommunityPage = lazy(() => import('@/features/communities/pages/CreateCommunityPage'))
const CommunityManagePage = lazy(() => import('@/features/communities/pages/CommunityManagePage'))

// Profile pages
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'))
const EditProfilePage = lazy(() => import('@/features/profile/pages/EditProfilePage'))
const UserProfilePage = lazy(() => import('@/features/profile/pages/UserProfilePage'))

// Settings pages
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'))
const ProfileSettingsPage = lazy(() => import('@/features/settings/pages/ProfileSettingsPage'))
const AccountSettingsPage = lazy(() => import('@/features/settings/pages/AccountSettingsPage'))
const PrivacySettingsPage = lazy(() => import('@/features/settings/pages/PrivacySettingsPage'))
const SecuritySettingsPage = lazy(() => import('@/features/settings/pages/SecuritySettingsPage'))
const NotificationSettingsPage = lazy(() => import('@/features/settings/pages/NotificationSettingsPage'))
const ChatSettingsPage = lazy(() => import('@/features/settings/pages/ChatSettingsPage'))
const StorageDataPage = lazy(() => import('@/features/settings/pages/StorageDataPage'))
const AppearanceSettingsPage = lazy(() => import('@/features/settings/pages/AppearanceSettingsPage'))
const LanguageSettingsPage = lazy(() => import('@/features/settings/pages/LanguageSettingsPage'))
const DevicesPage = lazy(() => import('@/features/settings/pages/DevicesPage'))
const HelpSupportPage = lazy(() => import('@/features/settings/pages/HelpSupportPage'))
const AboutPage = lazy(() => import('@/features/settings/pages/AboutPage'))

// Explore
const ExplorePage = lazy(() => import('@/features/explore/pages/ExplorePage'))

// Updates hub
const UpdatesPage = lazy(() => import('@/features/updates/pages/UpdatesPage'))

// Stories
const StoryViewerPage = lazy(() => import('@/features/stories/pages/StoryViewerPage'))
const CreateStoryPage = lazy(() => import('@/features/stories/pages/CreateStoryPage'))

// Search & Notifications
const SearchPage = lazy(() => import('@/features/search/pages/SearchPage'))
const NotificationsPage = lazy(() => import('@/features/notifications/pages/NotificationsPage'))
const ContactsPage = lazy(() => import('@/features/contacts/pages/ContactsPage'))
const AddContactPage = lazy(() => import('@/features/contacts/pages/AddContactPage'))

// Organizations & moderation
const OrganizationsPage = lazy(() => import('@/features/organizations/pages/OrganizationsPage'))
const CreateOrganizationPage = lazy(() => import('@/features/organizations/pages/CreateOrganizationPage'))
const OrganizationPage = lazy(() => import('@/features/organizations/pages/OrganizationPage'))
const OrganizationSettingsPage = lazy(() => import('@/features/organizations/pages/OrganizationSettingsPage'))
const ModerationDashboardPage = lazy(() => import('@/features/moderation/pages/ModerationDashboardPage'))
const ReportedContentPage = lazy(() => import('@/features/moderation/pages/ReportedContentPage'))
const BannedUsersPage = lazy(() => import('@/features/moderation/pages/BannedUsersPage'))
const AdminLoginPage = lazy(() => import('@/features/admin/pages/AdminLoginPage'))
const AdminUsersPage = lazy(() => import('@/features/admin/pages/AdminUsersPage'))
const AdministratorsPage = lazy(() => import('@/features/admin/pages/AdministratorsPage'))
const InstitutionsPage = lazy(() => import('@/features/admin/pages/InstitutionsPage'))
const AdminContentPage = lazy(() => import('@/features/admin/pages/AdminContentPage'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <Spinner size="lg" />
    </div>
  )
}

function LegacyChatRedirect() {
  const { conversationId } = useParams()
  return <Navigate to={conversationId ? `/home/c/${conversationId}` : ROUTES.HOME} replace />
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Auth routes */}
        <Route element={<GuestGuard><AuthLayout /></GuestGuard>}>
          <Route path={ROUTES.AUTH.SIGNUP} element={<SignUpPage />} />
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.AUTH.VERIFY} element={<VerifyOtpPage />} />
          <Route path={ROUTES.AUTH.PROFILE} element={<CreateProfilePage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<AuthGuard><MainLayout /></AuthGuard>}>
          <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
          <Route path="/chat" element={<Navigate to={ROUTES.HOME} replace />} />
          <Route path="/chat/:conversationId" element={<LegacyChatRedirect />} />
          
          {/* Chat routes with WhatsApp-style side-by-side layout */}
          <Route path={ROUTES.CHAT.LIST} element={<ChatLayout />}>
            <Route index element={<WelcomePage />} />
            <Route path={ROUTES.CHAT.CONVERSATION.replace('/home/', '')} element={<ConversationPage />} />
            <Route path={ROUTES.CHAT.DETAILS.replace('/home/', '')} element={<ChatDetailsPage />} />
            <Route path={ROUTES.CHAT.GROUP.replace('/home/', '')} element={<GroupPage />} />
            <Route path={ROUTES.CHAT.GROUP_DETAILS.replace('/home/', '')} element={<GroupDetailsPage />} />
            <Route path={ROUTES.GROUP.MEMBERS.replace('/home/', '')} element={<GroupMembersPage />} />
            <Route path={ROUTES.GROUP.SETTINGS.replace('/home/', '')} element={<GroupSettingsPage />} />
            <Route path={ROUTES.CHAT.MEDIA.replace('/home/', '')} element={<SharedMediaPage />} />
            <Route path={ROUTES.CHAT.CONVERSATION_SEARCH.replace('/home/', '')} element={<SearchMessagesPage />} />
          </Route>

          {/* Standalone chat pages (not in side-by-side layout) */}
          <Route path={ROUTES.CHAT.SEARCH} element={<SearchChatsPage />} />
          <Route path={ROUTES.CHAT.SEARCH_MESSAGES} element={<SearchMessagesPage />} />
          <Route path={ROUTES.CHAT.ADD} element={<AddChatPage />} />
          <Route path={ROUTES.CHAT.CREATE_GROUP} element={<CreateGroupPage />} />
          <Route path={ROUTES.CHAT.ARCHIVED} element={<ArchivedChatsPage />} />
          <Route path={ROUTES.CHAT.PINNED} element={<PinnedChatsPage />} />

          {/* Channel routes */}
          <Route path={ROUTES.CHANNEL.ROOT} element={<JoinedChannelsPage />} />
          <Route path={ROUTES.CHANNEL.DISCOVER} element={<DiscoverChannelsPage />} />
          <Route path={ROUTES.CHANNEL.CREATE} element={<CreateChannelPage />} />
          <Route path={ROUTES.CHANNEL.FEED} element={<ChannelFeedPage />} />
          <Route path={ROUTES.CHANNEL.DETAILS} element={<ChannelDetailsPage />} />
          <Route path={ROUTES.CHANNEL.INVITE} element={<InviteMembersPage />} />
          <Route path={ROUTES.CHANNEL.ANALYTICS} element={<ChannelAnalyticsPage />} />
          <Route path={ROUTES.CHANNEL.SETTINGS} element={<ChannelSettingsPage />} />
          <Route path={ROUTES.CHANNEL.ADMINS} element={<ChannelAdminsPage />} />
          <Route path={ROUTES.CHANNEL.POSTS} element={<ChannelPostsPage />} />

          {/* Community routes */}
          <Route path={ROUTES.COMMUNITY.ROOT} element={<JoinedCommunitiesPage />} />
          <Route path={ROUTES.COMMUNITY.DISCOVER} element={<DiscoverCommunitiesPage />} />
          <Route path={ROUTES.COMMUNITY.JOIN} element={<JoinCommunityPage />} />
          <Route path={ROUTES.COMMUNITY.DETAILS} element={<CommunityDetailsPage />} />
          <Route path={ROUTES.COMMUNITY.OVERVIEW} element={<CommunityOverviewPage />} />
          <Route path={ROUTES.COMMUNITY.MEMBERS} element={<CommunityMembersPage />} />
          <Route path={ROUTES.COMMUNITY.GROUPS} element={<CommunityGroupsPage />} />
          <Route path={ROUTES.COMMUNITY.CHANNELS} element={<CommunityChannelsPage />} />
          <Route path={ROUTES.COMMUNITY.ABOUT} element={<CommunityAboutPage />} />
          <Route path={ROUTES.COMMUNITY.MANAGE} element={<CommunityManagePage />} />
          <Route path={ROUTES.COMMUNITY.CREATE} element={<CreateCommunityPage />} />
          
          {/* Profile routes */}
          <Route path={ROUTES.PROFILE.SELF} element={<ProfilePage />} />
          <Route path={ROUTES.PROFILE.EDIT} element={<EditProfilePage />} />
          <Route path={ROUTES.PROFILE.USER} element={<UserProfilePage />} />

          {/* Settings routes */}
          <Route path={ROUTES.SETTINGS.ROOT} element={<SettingsPage />} />
          <Route path={ROUTES.SETTINGS.PROFILE} element={<ProfileSettingsPage />} />
          <Route path={ROUTES.SETTINGS.ACCOUNT} element={<AccountSettingsPage />} />
          <Route path={ROUTES.SETTINGS.PRIVACY} element={<PrivacySettingsPage />} />
          <Route path={ROUTES.SETTINGS.SECURITY} element={<SecuritySettingsPage />} />
          <Route path={ROUTES.SETTINGS.NOTIFICATIONS} element={<NotificationSettingsPage />} />
          <Route path={ROUTES.SETTINGS.CHATS} element={<ChatSettingsPage />} />
          <Route path={ROUTES.SETTINGS.STORAGE} element={<StorageDataPage />} />
          <Route path={ROUTES.SETTINGS.APPEARANCE} element={<AppearanceSettingsPage />} />
          <Route path={ROUTES.SETTINGS.LANGUAGE} element={<LanguageSettingsPage />} />
          <Route path={ROUTES.SETTINGS.DEVICES} element={<DevicesPage />} />
          <Route path={ROUTES.SETTINGS.HELP} element={<HelpSupportPage />} />
          <Route path={ROUTES.SETTINGS.ABOUT} element={<AboutPage />} />

          {/* Explore */}
          <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />

          {/* Updates hub */}
          <Route path={ROUTES.UPDATES} element={<UpdatesPage />} />

          {/* Stories */}
          <Route path={ROUTES.STORY_VIEWER} element={<StoryViewerPage />} />
          <Route path={ROUTES.STORY_CREATE} element={<CreateStoryPage />} />

          {/* Search & Notifications */}
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />

          {/* Contacts */}
          <Route path={ROUTES.CONTACTS.ROOT} element={<ContactsPage />} />
          <Route path={ROUTES.CONTACTS.ADD} element={<AddContactPage />} />

          {/* Organizations */}
          <Route path={ROUTES.ORGANIZATIONS.LIST} element={<OrganizationsPage />} />
          <Route path={ROUTES.ORGANIZATIONS.CREATE} element={<CreateOrganizationPage />} />
          <Route path={ROUTES.ORGANIZATIONS.DETAIL} element={<OrganizationPage />} />
          <Route path={ROUTES.ORGANIZATIONS.SETTINGS} element={<OrganizationSettingsPage />} />
        </Route>

        {/* Separate admin portal authentication and shell */}
        <Route path={ROUTES.ADMIN.LOGIN} element={<AdminLoginPage />} />
        <Route element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.MODERATION.DASHBOARD} element={<ModerationDashboardPage />} />
            <Route path={ROUTES.ADMIN.USERS} element={<AdminUsersPage />} />
            <Route path={ROUTES.ADMIN.ADMINISTRATORS} element={<AdministratorsPage />} />
            <Route path={ROUTES.ADMIN.INSTITUTIONS} element={<InstitutionsPage />} />
            <Route path={ROUTES.MODERATION.REPORTS} element={<ReportedContentPage />} />
            <Route path={ROUTES.ADMIN.CONTENT} element={<AdminContentPage />} />
            <Route path={ROUTES.MODERATION.BANS} element={<BannedUsersPage />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Suspense>
  )
}

// WelcomePage — shown on desktop when no conversation is selected
function WelcomePage() {
  return (
    <div className="hidden lg:flex h-full w-full flex-col items-center justify-center bg-background p-8 text-center relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(14,165,131,0.07) 0%, transparent 70%)',
            top: '-150px', left: '-100px',
            animation: 'drift 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '350px', height: '350px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
            bottom: '-80px', right: '-60px',
            animation: 'drift 30s ease-in-out 4s infinite reverse',
          }}
        />
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '250px', height: '250px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)',
            top: '50%', left: '60%',
            animation: 'drift 28s ease-in-out 8s infinite',
          }}
        />
      </div>

      <div className="relative animate-reveal">
        {/* Decorative line */}
        <div className="w-12 h-px bg-accent/40 mx-auto mb-6" />

        {/* Logo mark */}
        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-accent/10 flex items-center justify-center ring-1 ring-accent/20">
          <svg className="h-10 w-10 text-accent/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="font-serif italic text-3xl text-foreground tracking-tight mb-2">
          Wisal
        </h1>
        <p className="text-sm text-muted-foreground/50 max-w-xs mx-auto leading-relaxed">
          اختر محادثة من الجانب لبدء الدردشة، أو ابدأ محادثة جديدة.
        </p>

        {/* Separator */}
        <div className="mt-8 flex items-center gap-3 justify-center">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/30">آمن</span>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>

        {/* Feature list */}
        <div className="mt-6 space-y-3">
          {[
            { icon: 'M6 18L18 6M6 6l12 12', label: 'مشفر طرفًا بطرف' },
            { icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'مراسلة فورية' },
          ].map((feat) => (
            <div key={feat.label} className="flex items-center gap-2.5 text-xs text-muted-foreground/40">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={feat.icon} />
              </svg>
              {feat.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
