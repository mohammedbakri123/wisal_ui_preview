import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const router = readFileSync(resolve(root, 'src/app/router/index.tsx'), 'utf8')
const routes = readFileSync(resolve(root, 'src/core/utils/routes.ts'), 'utf8')

const expectedFiles = [
  'src/features/authentication/pages/LoginPage.tsx',
  'src/features/authentication/pages/VerifyOtpPage.tsx',
  'src/features/authentication/pages/CreateProfilePage.tsx',
  'src/features/chat/pages/ChatListPage.tsx',
  'src/features/chat/pages/ConversationPage.tsx',
  'src/features/chat/pages/ChatDetailsPage.tsx',
  'src/features/chat/pages/GroupPage.tsx',
  'src/features/chat/pages/GroupDetailsPage.tsx',
  'src/features/chat/pages/ArchivedChatsPage.tsx',
  'src/features/chat/pages/PinnedChatsPage.tsx',
  'src/features/chat/pages/SearchChatsPage.tsx',
  'src/features/chat/pages/SearchMessagesPage.tsx',
  'src/features/chat/pages/AddChatPage.tsx',
  'src/features/chat/pages/CreateGroupPage.tsx',
  'src/features/channels/pages/JoinedChannelsPage.tsx',
  'src/features/channels/pages/DiscoverChannelsPage.tsx',
  'src/features/channels/pages/CreateChannelPage.tsx',
  'src/features/channels/pages/ChannelFeedPage.tsx',
  'src/features/channels/pages/ChannelDetailsPage.tsx',
  'src/features/channels/pages/InviteMembersPage.tsx',
  'src/features/channels/pages/ChannelAnalyticsPage.tsx',
  'src/features/channels/pages/ChannelSettingsPage.tsx',
  'src/features/communities/pages/JoinedCommunitiesPage.tsx',
  'src/features/communities/pages/DiscoverCommunitiesPage.tsx',
  'src/features/communities/pages/CommunityDetailsPage.tsx',
  'src/features/communities/pages/JoinCommunityPage.tsx',
  'src/features/communities/pages/CommunityOverviewPage.tsx',
  'src/features/communities/pages/CommunityMembersPage.tsx',
  'src/features/communities/pages/CommunityGroupsPage.tsx',
  'src/features/communities/pages/CommunityChannelsPage.tsx',
  'src/features/communities/pages/CommunityAboutPage.tsx',
  'src/features/settings/pages/SettingsPage.tsx',
  'src/features/settings/pages/ProfileSettingsPage.tsx',
  'src/features/settings/pages/AccountSettingsPage.tsx',
  'src/features/settings/pages/PrivacySettingsPage.tsx',
  'src/features/settings/pages/SecuritySettingsPage.tsx',
  'src/features/settings/pages/NotificationSettingsPage.tsx',
  'src/features/settings/pages/ChatSettingsPage.tsx',
  'src/features/settings/pages/StorageDataPage.tsx',
  'src/features/settings/pages/AppearanceSettingsPage.tsx',
  'src/features/settings/pages/DevicesPage.tsx',
  'src/features/settings/pages/HelpSupportPage.tsx',
  'src/features/settings/pages/AboutPage.tsx',
  'src/features/notifications/pages/NotificationsPage.tsx',
  'src/features/organizations/pages/OrganizationsPage.tsx',
  'src/features/organizations/pages/CreateOrganizationPage.tsx',
  'src/features/organizations/pages/OrganizationPage.tsx',
  'src/features/organizations/pages/OrganizationSettingsPage.tsx',
  'src/features/moderation/pages/ModerationDashboardPage.tsx',
  'src/features/moderation/pages/ReportedContentPage.tsx',
  'src/features/moderation/pages/BannedUsersPage.tsx',
]

const expectedRouteTokens = [
  'AUTH.LOGIN',
  'AUTH.VERIFY',
  'AUTH.PROFILE',
  'CHAT.LIST',
  'CHAT.SEARCH',
  'CHAT.SEARCH_MESSAGES',
  'CHAT.ADD',
  'CHAT.CREATE_GROUP',
  'CHAT.ARCHIVED',
  'CHAT.PINNED',
  'CHAT.CONVERSATION',
  'CHAT.DETAILS',
  'CHAT.GROUP',
  'CHAT.GROUP_DETAILS',
  'CHANNEL.ROOT',
  'CHANNEL.DISCOVER',
  'CHANNEL.CREATE',
  'CHANNEL.FEED',
  'CHANNEL.DETAILS',
  'CHANNEL.INVITE',
  'CHANNEL.ANALYTICS',
  'CHANNEL.SETTINGS',
  'COMMUNITY.ROOT',
  'COMMUNITY.DISCOVER',
  'COMMUNITY.JOIN',
  'COMMUNITY.DETAILS',
  'COMMUNITY.OVERVIEW',
  'COMMUNITY.MEMBERS',
  'COMMUNITY.GROUPS',
  'COMMUNITY.CHANNELS',
  'COMMUNITY.ABOUT',
  'SETTINGS.ROOT',
  'SETTINGS.PROFILE',
  'SETTINGS.ACCOUNT',
  'SETTINGS.PRIVACY',
  'SETTINGS.SECURITY',
  'SETTINGS.NOTIFICATIONS',
  'SETTINGS.CHATS',
  'SETTINGS.STORAGE',
  'SETTINGS.APPEARANCE',
  'SETTINGS.DEVICES',
  'SETTINGS.HELP',
  'SETTINGS.ABOUT',
  'NOTIFICATIONS',
  'ORGANIZATIONS.LIST',
  'ORGANIZATIONS.CREATE',
  'ORGANIZATIONS.DETAIL',
  'ORGANIZATIONS.SETTINGS',
  'MODERATION.DASHBOARD',
  'MODERATION.REPORTS',
  'MODERATION.BANS',
]

const missingFiles = expectedFiles.filter((file) => !existsSync(resolve(root, file)))
const missingRouterTokens = expectedRouteTokens.filter((token) => !router.includes(`ROUTES.${token}`))
const missingRouteConstants = [
  '/home',
  '/channels',
  '/communities',
  '/settings',
  '/notifications',
  '/organizations',
  '/admin',
].filter((path) => !routes.includes(path))

if (missingFiles.length || missingRouterTokens.length || missingRouteConstants.length) {
  console.error('Route smoke test failed.')
  if (missingFiles.length) console.error('Missing files:', missingFiles)
  if (missingRouterTokens.length) console.error('Missing router tokens:', missingRouterTokens)
  if (missingRouteConstants.length) console.error('Missing route constants:', missingRouteConstants)
  process.exit(1)
}

console.log(`Route smoke test passed for ${expectedFiles.length} planned screens.`)
