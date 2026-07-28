# React Messaging App — Frontend Architecture & Screen Planning

A comprehensive planning document for building a modern, mobile-first messaging platform frontend using React. This document serves as the implementation roadmap covering folder architecture, feature breakdown, screen planning, navigation, responsive layouts, shared components, routing, MVP phases, and development order.

---

## Tech Stack

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Framework | React 19 + TypeScript 6 | Latest React with full type safety |
| Build tool | Vite 8 | Fast HMR, native ESM, Rolldown bundler |
| Styling | Tailwind CSS v4 | Utility-first, mobile-first by design |
| Routing | React Router v7 | Industry standard, lazy route support |
| State | React Context + useReducer | Built-in, sufficient for auth/app state |
| Mocking | MSW (Mock Service Worker) | Intercepts network calls, easy to swap for real API |
| Utilities | clsx + tailwind-merge | Classname merging via `cn()` helper |

---

## 1. Project Folder Planning

The application follows a **feature-based architecture** with three top-level directories: `app/`, `core/`, and `features/`.

### app/

Contains application-level functionality that wires everything together.

**Responsibilities:**
- Application bootstrap and entry point
- Route definitions and route guards
- Layout shells (authenticated, unauthenticated, error)
- Global providers (theme, auth, query, state)
- Authentication guards and redirect logic
- Error boundaries at the application level
- Application shell (navigation chrome, status bar, layout frame)

**Current structure:**

```
src/app/
├── App.tsx                          # Root component, provider tree
├── providers/
│   ├── AuthProvider.tsx             # Auth state context (user, token, login, logout)
│   ├── ThemeProvider.tsx            # Light/dark mode context
│   └── ErrorBoundary.tsx            # App-level error boundary
├── layouts/
│   ├── AuthLayout.tsx               # Unauthenticated shell (split branding on desktop)
│   └── MainLayout.tsx               # Authenticated shell (sidebar desktop, bottom nav mobile)
├── guards/
│   ├── AuthGuard.tsx                # Redirects unauthenticated users to /auth/login
│   └── GuestGuard.tsx               # Redirects authenticated users away from auth pages
└── router/
    └── index.tsx                    # Route aggregator with lazy-loaded routes
```

### core/

Contains reusable functionality shared across every feature. Features depend on core; core never depends on features.

**Responsibilities:**
- Shared UI components (buttons, inputs, avatars, spinners)
- Layout primitives (page header, page container, sidebar, bottom nav)
- Custom hooks (useMediaQuery, useDebounce, useBreakpoint)
- Utility functions (cn, formatters, constants, routes)
- TypeScript types and interfaces (User, Message, Conversation)

**Current structure:**

```
src/core/
├── components/
│   ├── ui/
│   │   ├── Button.tsx              # Primary/secondary/ghost/danger variants
│   │   ├── Input.tsx               # Label + error state
│   │   ├── Avatar.tsx              # Image/initials fallback + online indicator
│   │   ├── Spinner.tsx             # Loading indicator (sm/md/lg)
│   │   └── EmptyState.tsx          # Title + description + optional action
│   └── layout/
│       ├── PageHeader.tsx           # Sticky top bar with title + actions
│       ├── PageContainer.tsx        # Scrollable page wrapper
│       ├── BottomNavigation.tsx     # Mobile bottom tab bar (Home/Channels/Communities/Settings)
│       └── Sidebar.tsx             # Desktop sidebar navigation
├── hooks/
│   ├── useMediaQuery.ts            # CSS media query matching
│   ├── useDebounce.ts              # Value debouncing
│   └── useBreakpoint.ts            # Current breakpoint (mobile/tablet/desktop)
├── types/
│   ├── index.ts                    # Re-exports
│   ├── user.ts                     # User, UserProfile
│   ├── conversation.ts             # Conversation
│   ├── message.ts                  # Message, Reaction
│   └── api.ts                      # ApiResponse, PaginatedResponse, ApiError
└── utils/
    ├── cn.ts                       # clsx + tailwind-merge
    ├── constants.ts                # APP_NAME, OTP_LENGTH, BREAKPOINTS, STORAGE_KEYS
    ├── formatters.ts               # formatRelativeTime, formatMessageTime, maskIdentifier
    └── routes.ts                   # All route path constants
```

### features/

Each major feature is isolated in its own folder. Features own their pages, components, hooks, services, routes, and local state.

**Current structure:**

```
src/features/
├── authentication/                  ✅ IMPLEMENTED
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── VerifyOtpPage.tsx
│   │   └── CreateProfilePage.tsx
│   ├── components/
│   │   ├── LoginForm.tsx            # Phone/email toggle + input
│   │   ├── OtpInput.tsx            # 6-digit auto-submit OTP
│   │   └── ProfileForm.tsx         # Name + avatar upload + bio
│   ├── hooks/
│   │   ├── useAuth.ts              # Re-exports AuthProvider hook
│   │   └── useOtp.ts              # OTP state + verify + resend cooldown
│   ├── services/
│   │   └── auth.service.ts         # login, verifyOtp, createProfile, getCurrentUser
│   └── types/
│       └── auth.types.ts           # Request/response types
├── home/                            🚧 PARTIALLY IMPLEMENTED
│   ├── pages/
│   │   ├── ChatListPage.tsx        # Home screen with search bar + FAB — ✅ DONE
│   │   ├── ConversationPage.tsx    # Placeholder conversation view — 🚧
│   │   ├── ChatDetailsPage.tsx
│   │   ├── GroupDetailsPage.tsx
│   │   ├── GroupPage.tsx
│   │   ├── ArchivedChatsPage.tsx
│   │   ├── PinnedChatsPage.tsx
│   │   ├── SearchChatsPage.tsx
│   │   ├── SearchMessagesPage.tsx
│   │   ├── AddChatPage.tsx
│   │   └── CreateGroupPage.tsx
│   ├── components/
│   │   ├── ChatList.tsx            # Pinned/unpinned sections + loading skeletons
│   │   ├── ChatListItem.tsx        # Avatar, name, last message, unread badge
│   │   ├── GroupCard.tsx
│   │   └── SearchResultItem.tsx
│   ├── hooks/
│   │   └── useConversations.ts     # Fetch conversations from API
│   └── services/
│       └── home.service.ts
├── channels/                         (placeholder)
│   ├── pages/
│   │   ├── DiscoverChannelsPage.tsx
│   │   ├── JoinedChannelsPage.tsx
│   │   ├── CreateChannelPage.tsx
│   │   ├── ChannelFeedPage.tsx
│   │   ├── ChannelDetailsPage.tsx
│   │   ├── InviteMembersPage.tsx
│   │   ├── ChannelAnalyticsPage.tsx
│   │   └── ChannelSettingsPage.tsx
│   ├── components/
│   │   └── ChannelCard.tsx
│   └── services/
│       └── channels.service.ts
├── communities/                      (placeholder)
│   ├── pages/
│   │   ├── DiscoverCommunitiesPage.tsx
│   │   ├── JoinedCommunitiesPage.tsx
│   │   ├── CommunityDetailsPage.tsx
│   │   ├── CommunityOverviewPage.tsx
│   │   ├── CommunityMembersPage.tsx
│   │   ├── CommunityGroupsPage.tsx
│   │   ├── CommunityChannelsPage.tsx
│   │   └── CommunityAboutPage.tsx
│   ├── components/
│   │   └── CommunityCard.tsx
│   └── services/
│       └── communities.service.ts
├── settings/                         (placeholder)
│   ├── pages/
│   │   ├── SettingsPage.tsx
│   │   ├── ProfileSettingsPage.tsx
│   │   ├── AccountSettingsPage.tsx
│   │   ├── PrivacySettingsPage.tsx
│   │   ├── SecuritySettingsPage.tsx
│   │   ├── NotificationSettingsPage.tsx
│   │   ├── ChatSettingsPage.tsx
│   │   ├── StorageDataPage.tsx
│   │   ├── AppearanceSettingsPage.tsx
│   │   ├── DevicesPage.tsx
│   │   ├── HelpSupportPage.tsx
│   │   └── AboutPage.tsx
│   ├── components/
│   │   └── SettingsItem.tsx
│   └── services/
│       └── settings.service.ts
├── notifications/                    (placeholder)
├── organizations/                    (placeholder)
└── moderation/                       (placeholder)
```

---

## 2. Feature Breakdown

### Authentication ✅ Implemented

**Purpose:** Handle user identification, verification, and session management.

**Responsibility:**
- Phone/email-based login
- OTP verification
- Profile creation after first login
- Session persistence (localStorage)
- Auth state management (Context + useReducer)
- Logout

**Main Screens:**
- Login Page
- OTP Verification Page
- Create Profile Page

**Shared Components:**
- LoginForm (phone/email toggle)
- OtpInput (6-digit auto-submit with paste support)
- ProfileForm (name + avatar + bio)

**Navigation Entry Points:**
- Direct URL access
- AuthGuard redirect (unauthenticated users)
- GuestGuard redirect (authenticated users on auth pages)

**Mock API:** MSW handlers accept any 6-digit code. Existing mock users (`alex@example.com`, `jordan@example.com`, `sam@example.com`) return user data; unknown identifiers create new users.

---

### Home (Messaging Hub) 🚧 Partially Implemented

**Purpose:** Central messaging hub that brings together all conversation types — direct messages, groups, and channels — in one place.

**Responsibility:**
- List all conversations sorted by recency (DMs, groups, channels)
- Display conversation previews with last message, timestamp, unread count
- Organize conversations into pinned, archived, and standard sections
- Search across chats and messages
- Create new conversations and groups
- Navigate to conversation details and group details
- Support conversation management (mute, archive, pin, delete)

**Main Screens:**
- Chat List Page (home screen)
- Conversation Page
- Chat Details Page
- Group Details Page
- Group Page
- Archived Chats Page
- Pinned Chats Page
- Search Chats Page
- Search Messages Page
- Add Chat Page
- Create Group Page

**Shared Components:**
- ChatList (pinned/unpinned sections, loading skeletons, empty state)
- ChatListItem (avatar, name, type icon, last message, timestamp, unread badge)
- GroupCard (group avatar, member count, last activity)
- SearchResultItem (result type indicator, snippet preview)

**Navigation Entry Points:**
- Bottom navigation bar — Home tab (default)
- Deep link from notification

**Mock API:** MSW handler returns 8 mock conversations with varied types (DM, group, channel), timestamps, and unread counts.

---

### Channels 🚧 Not yet implemented

**Purpose:** Enable broadcast-style one-to-many communication where channel owners and administrators post content that subscribers can read, react to, and discuss.

**Responsibility:**
- Discover and browse available channels
- Subscribe/unsubscribe from channels
- View channel feed with admin posts
- Channel details and metadata
- Create new channels
- Invite members to channels (owner/admin)
- View channel analytics (owner/admin only)
- Manage channel settings (owner/admin only)
- Post management for admins

**Main Screens:**
- Discover Channels Page
- Joined Channels Page
- Create Channel Page
- Channel Details Page
- Channel Feed Page
- Invite Members Page
- Channel Analytics Page
- Channel Settings Page

**Navigation Entry Points:**
- Bottom navigation bar — Channels tab
- Deep link from channel invite

---

### Communities 🚧 Not yet implemented

**Purpose:** Provide a space for organized groups of users to gather around shared interests, topics, or organizations, with multiple subgroups and channels within each community.

**Responsibility:**
- Discover and browse available communities
- Join and leave communities
- View community details and metadata
- Navigate within a community's internal structure:
  - Overview (feed, announcements, recent activity)
  - Members (directory with roles)
  - Groups (subgroups within the community)
  - Channels (broadcast channels within the community)
  - About (description, rules, guidelines)

**Main Screens:**
- Discover Communities Page
- Joined Communities Page
- Community Details Page
- Join Community Page
- Community Overview Page
- Community Members Page
- Community Groups Page
- Community Channels Page
- Community About Page

**Navigation Entry Points:**
- Bottom navigation bar — Communities tab
- Deep link from community invite

---

### Settings 🚧 Not yet implemented

**Purpose:** Central hub for managing user profile, account configuration, privacy, security, notifications, and application preferences.

**Responsibility:**
- Manage personal profile and identity (display name, avatar, bio, status)
- Configure account details (email, phone, password)
- Control privacy (last seen, read receipts, profile visibility, blocking)
- Manage security (two-factor authentication, active sessions, passkeys)
- Configure notification preferences per category (messages, groups, channels, communities)
- Manage chat-specific settings (wallpaper, font size, enter-to-send, backup)
- Monitor storage and data usage, manage cached media
- Customize appearance (theme, dark mode, accent color, language)
- View and manage active devices and sessions
- Access help resources, FAQs, contact support
- View app version, licenses, and legal information

**Main Screens:**
- Settings Page (main menu)
- Profile Settings Page
- Account Settings Page
- Privacy Settings Page
- Security Settings Page
- Notification Settings Page
- Chat Settings Page
- Storage & Data Page
- Appearance Settings Page
- Devices Page
- Help & Support Page
- About Page

**Navigation Entry Points:**
- Bottom navigation bar — Settings tab

---

### Notifications 🚧 Not yet implemented

**Purpose:** Display and manage notifications for messages, mentions, group invitations, channel updates, community invites, and system alerts.

**Responsibility:**
- List all notifications
- Mark as read/unread
- Filter notifications by type
- Notification preferences
- Push notification registration
- Deep link from notification to relevant screen

**Main Screens:**
- Notifications Page

**Navigation Entry Points:**
- Settings (Notifications section)
- In-app banner or system notification tap

---

### Organizations 🚧 Not yet implemented

**Purpose:** Manage organizational structures, teams, and multi-tenant contexts.

**Responsibility:**
- Create and manage organizations
- Invite members to organization
- Organization roles and permissions
- Organization settings
- Switch between organizations

**Main Screens:**
- Organization Page
- Organization Settings Page

---

### Moderation 🚧 Not yet implemented

**Purpose:** Administrative tools for content moderation, user management, and safety.

**Responsibility:**
- Review reported content
- Ban/unban users
- Moderate messages and groups
- View moderation logs
- Configure moderation rules

**Main Screens:**
- Moderation Dashboard
- Reported Content Page
- Banned Users Page

---

## 3. Screen Planning

### Login Page ✅

**Purpose:** Authenticate the user via phone number or email.

**Navigation To:**
- OTP Verification Page (after submitting login)

**Navigation From:**
- App launch (if not authenticated)
- AuthGuard redirect
- Logout from settings

---

### OTP Verification Page ✅

**Purpose:** Verify the user's identity via one-time password.

**Navigation To:**
- Create Profile Page (first-time user)
- Home/Chat List (returning user)

**Navigation From:**
- Login Page

---

### Create Profile Page ✅

**Purpose:** Collect initial profile information from new users.

**Navigation To:**
- Home/Chat List (after completing profile)

**Navigation From:**
- OTP Verification Page (first-time user)

---

### Home Tab — Screens

---

### Chat List Page ✅

**Purpose:** The main messaging hub displaying all conversations sorted by recency.

**Navigation To:**
- Conversation Page (tap conversation)
- Search Chats Page (tap search bar)
- Add Chat Page (tap FAB)
- Pinned Chats Page (tap pinned header)
- Archived Chats Page (tap archive link)
- Chat Details Page (long-press or swipe → info)

**Navigation From:**
- Bottom navigation — Home tab (default)
- App launch (if authenticated)
- Create Group Page (after creation)

---

### Conversation Page 🚧 Placeholder

**Purpose:** Display messages within a conversation and allow messaging.

**Navigation To:**
- Chat Details Page (tap header)
- Chat List Page (tap back, mobile)

**Navigation From:**
- Chat List Page (tap conversation)
- Search Chats Page (tap result)
- Search Messages Page (tap result)

---

### Chat Details Page

**Purpose:** Display metadata for a direct message conversation — shared media, pinned messages, mute/block options, and member info.

**Navigation To:**
- Chat List Page (back)

**Navigation From:**
- Conversation Page (tap header)
- Chat List Page (long-press or swipe menu)

---

### Group Page

**Purpose:** Group conversation view with all group members and messaging.

**Navigation To:**
- Group Details Page (tap header)
- Chat List Page (tap back)

**Navigation From:**
- Chat List Page (tap group conversation)
- Group Details Page (start conversation)
- Create Group Page (after creation)

---

### Group Details Page

**Purpose:** Manage group metadata — members, roles, invite links, and group settings.

**Navigation To:**
- Create Group Page (edit group info)
- Group Page (back to conversation)

**Navigation From:**
- Group Page (tap header)
- Chat List Page (long-press or swipe menu)

---

### Create Group Page

**Purpose:** Create a new group by selecting members, setting a name, and configuring initial permissions.

**Navigation To:**
- Group Page (after creation)

**Navigation From:**
- Chat List Page (FAB → Create Group)
- Group Details Page (edit)

---

### Add Chat Page

**Purpose:** Start a new direct message conversation by searching for or selecting a contact.

**Navigation To:**
- Conversation Page (after selecting contact)

**Navigation From:**
- Chat List Page (FAB → Add Chat)

---

### Search Chats Page

**Purpose:** Search across all conversations by name, participant, or type.

**Navigation To:**
- Conversation Page (tap result)
- Group Page (tap group result)

**Navigation From:**
- Chat List Page (tap search bar)

---

### Search Messages Page

**Purpose:** Search within the text of all messages across conversations.

**Navigation To:**
- Conversation Page (scrolled to message result)

**Navigation From:**
- Chat List Page (search bar → messages tab)

---

### Archived Chats Page

**Purpose:** Display conversations that the user has archived to declutter the main list.

**Navigation To:**
- Conversation Page (tap archived conversation to unarchive and open)

**Navigation From:**
- Chat List Page (scroll to bottom or tap archive link)

---

### Pinned Chats Page

**Purpose:** Display all conversations the user has pinned for quick access.

**Navigation To:**
- Conversation Page (tap pinned conversation)

**Navigation From:**
- Chat List Page (tap pinned section header)

---

### Channels Tab — Screens

---

### Joined Channels Page

**Purpose:** List all channels the user has subscribed to.

**Navigation To:**
- Channel Feed Page (tap channel)
- Discover Channels Page (tap discover link)

**Navigation From:**
- Bottom navigation — Channels tab

---

### Discover Channels Page

**Purpose:** Browse and search available channels by category, popularity, or recent activity.

**Navigation To:**
- Channel Details Page (tap channel)
- Join Community Page (tap join)

**Navigation From:**
- Joined Channels Page (tap discover link)
- Channels bottom tab (discover tab)

---

### Channel Feed Page

**Purpose:** Display posts from a channel's administrators in a chronological feed.

**Navigation To:**
- Channel Details Page (tap channel info)

**Navigation From:**
- Joined Channels Page (tap channel)
- Discover Channels Page (tap channel)

---

### Channel Details Page

**Purpose:** View channel metadata — description, subscriber count, admin list, and join/leave actions.

**Navigation To:**
- Channel Feed Page (back)
- Invite Members Page (owner/admin — tap invite)
- Channel Analytics Page (owner/admin — tap analytics)
- Channel Settings Page (owner/admin — tap settings)

**Navigation From:**
- Discover Channels Page (tap channel)
- Channel Feed Page (tap info)

---

### Create Channel Page

**Purpose:** Create a new broadcast channel with name, description, avatar, and initial settings.

**Navigation To:**
- Channel Feed Page (after creation)

**Navigation From:**
- Joined Channels Page (tap create button)
- Discover Channels Page (tap create button)

---

### Invite Members Page

**Purpose:** Generate invites (link or direct) to add subscribers to a channel. Owner/Admin only.

**Navigation To:**
- Channel Details Page (back)

**Navigation From:**
- Channel Details Page (owner/admin — tap invite)
- Channel Settings Page (owner/admin — tap invite)

---

### Channel Analytics Page

**Purpose:** View channel performance metrics — subscriber growth, post engagement, top posts. Owner/Admin only.

**Navigation To:**
- Channel Details Page (back)

**Navigation From:**
- Channel Details Page (owner/admin — tap analytics)
- Channel Settings Page (owner/admin — tap analytics)

---

### Channel Settings Page

**Purpose:** Manage channel configuration — name, description, avatar, permissions, deletion. Owner/Admin only.

**Navigation To:**
- Channel Details Page (back)
- Invite Members Page (tap invite)

**Navigation From:**
- Channel Details Page (owner/admin — tap settings)

---

### Communities Tab — Screens

---

### Joined Communities Page

**Purpose:** List all communities the user is a member of.

**Navigation To:**
- Community Details Page (tap community)

**Navigation From:**
- Bottom navigation — Communities tab

---

### Discover Communities Page

**Purpose:** Browse and search available communities by category, size, or activity.

**Navigation To:**
- Community Details Page (tap community)

**Navigation From:**
- Joined Communities Page (tap discover link)
- Communities bottom tab (discover tab)

---

### Community Details Page

**Purpose:** View community metadata — name, description, member count, and join/leave actions.

**Navigation To:**
- Community Overview Page (if joined — tap Enter)
- Join Community Page (if not joined — tap Join)

**Navigation From:**
- Discover Communities Page (tap community)
- Joined Communities Page (tap community)

---

### Join Community Page

**Purpose:** Preview a community before joining — view rules, description, and member count.

**Navigation To:**
- Community Details Page (after joining — automatically navigated)
- Community Overview Page (after joining)

**Navigation From:**
- Discover Communities Page (tap Join)
- Community Details Page (tap Join)

---

### Community Overview Page

**Purpose:** The landing page inside a joined community — recent activity feed, announcements, and quick links to subgroups.

**Navigation To:**
- Community Members Page (tap members count)
- Community Groups Page (tap groups section)
- Community Channels Page (tap channels section)
- Community About Page (tap about link)
- Community Details Page (tap back)

**Navigation From:**
- Community Details Page (if joined — tap Enter)
- Joined Communities Page (tap community)

---

### Community Members Page

**Purpose:** Browse the member directory of a community with search, roles, and contact options.

**Navigation To:**
- Conversation Page (tap member to message)
- Community Overview Page (back)

**Navigation From:**
- Community Overview Page (tap members count)

---

### Community Groups Page

**Purpose:** List all subgroups within a community with join/leave and navigation.

**Navigation To:**
- Group Page (tap group)
- Community Overview Page (back)

**Navigation From:**
- Community Overview Page (tap groups section)

---

### Community Channels Page

**Purpose:** List all broadcast channels within a community.

**Navigation To:**
- Channel Feed Page (tap channel)
- Community Overview Page (back)

**Navigation From:**
- Community Overview Page (tap channels section)

---

### Community About Page

**Purpose:** Display community guidelines, rules, description, and creation date.

**Navigation To:**
- Community Overview Page (back)

**Navigation From:**
- Community Overview Page (tap about link)

---

### Settings Tab — Screens

---

### Settings Page

**Purpose:** Main settings menu listing all configurable sections.

**Navigation To:**
- Profile Settings Page (tap profile row)
- Account Settings Page (tap account row)
- Privacy Settings Page (tap privacy row)
- Security Settings Page (tap security row)
- Notification Settings Page (tap notifications row)
- Chat Settings Page (tap chats row)
- Storage & Data Page (tap storage row)
- Appearance Settings Page (tap appearance row)
- Devices Page (tap devices row)
- Help & Support Page (tap help row)
- About Page (tap about row)

**Navigation From:**
- Bottom navigation — Settings tab
- Profile avatar shortcut (various screens)

---

### Profile Settings Page

**Purpose:** View and edit personal profile — display name, avatar, bio, and status message.

**Navigation To:**
- Settings Page (back)

**Navigation From:**
- Settings Page (tap profile row)

---

### Account Settings Page

**Purpose:** Manage account-level information — email, phone number, password change, and account deletion.

**Navigation To:**
- Settings Page (back)

**Navigation From:**
- Settings Page (tap account row)

---

### Privacy Settings Page

**Purpose:** Configure privacy controls — last seen, profile photo visibility, read receipts, online status, and blocked users.

**Navigation To:**
- Settings Page (back)

**Navigation From:**
- Settings Page (tap privacy row)

---

### Security Settings Page

**Purpose:** Manage security settings — two-factor authentication, active sessions, passkeys, and login history.

**Navigation To:**
- Settings Page (back)

**Navigation From:**
- Settings Page (tap security row)

---

### Notification Settings Page

**Purpose:** Configure per-category notification preferences — messages, groups, channels, communities, and system alerts.

**Navigation To:**
- Settings Page (back)

**Navigation From:**
- Settings Page (tap notifications row)

---

### Chat Settings Page

**Purpose:** Manage chat behavior — wallpaper, font size, enter-to-send, chat backup, and archived chat retention.

**Navigation To:**
- Settings Page (back)

**Navigation From:**
- Settings Page (tap chats row)

---

### Storage & Data Page

**Purpose:** Monitor storage usage, manage cached media, configure auto-download preferences, and network usage controls.

**Navigation To:**
- Settings Page (back)

**Navigation From:**
- Settings Page (tap storage row)

---

### Appearance Settings Page

**Purpose:** Customize visual theme — dark/light/system mode, accent color, bubble style, and language.

**Navigation To:**
- Settings Page (back)

**Navigation From:**
- Settings Page (tap appearance row)

---

### Devices Page

**Purpose:** View and manage active sessions and linked devices — remote logout and device details.

**Navigation To:**
- Settings Page (back)

**Navigation From:**
- Settings Page (tap devices row)

---

### Help & Support Page

**Purpose:** Access FAQ, contact support, report a problem, and browse troubleshooting guides.

**Navigation To:**
- Settings Page (back)

**Navigation From:**
- Settings Page (tap help row)

---

### About Page

**Purpose:** Display app version, licenses, terms of service, privacy policy, and third-party credits.

**Navigation To:**
- Settings Page (back)

**Navigation From:**
- Settings Page (tap about row)

---

### Cross-Cutting Screens

---

### Notifications Page

**Purpose:** Display and manage all notifications — messages, mentions, invites, and system alerts.

**Navigation To:**
- Relevant screen via deep link (tap notification)

**Navigation From:**
- Notification banner or icon (global)
- Settings (Notifications section link)

---

### Moderation Dashboard

**Purpose:** Central moderation panel — review reported content, manage bans, and view audit logs.

**Navigation To:**
- Reported Content Page (tap reports tab)
- Banned Users Page (tap bans tab)

**Navigation From:**
- Admin shortcut or deep link

---

### Reported Content Page

**Purpose:** Review user-reported messages, profiles, and groups with action options (dismiss, warn, ban).

**Navigation To:**
- Specific reported item context (tap report)

**Navigation From:**
- Moderation Dashboard (tap reports tab)

---

### Banned Users Page

**Purpose:** View and manage banned users — lift bans, view ban history.

**Navigation To:**
- Moderation Dashboard (back)

**Navigation From:**
- Moderation Dashboard (tap bans tab)

---

### Organization Page

**Purpose:** View organization details, members, and teams within a multi-tenant context.

**Navigation To:**
- Organization Settings Page (tap settings)

**Navigation From:**
- Organization management entry point

---

### Organization Settings Page

**Purpose:** Configure organization — name, branding, roles, member management, and deletion.

**Navigation To:**
- Organization Page (back)

**Navigation From:**
- Organization Page (tap settings)

---

## 4. Navigation Structure

### Authentication Flow ✅

```
App Launch
    ↓
[Has valid session?] ──Yes──→ Home (Chat List)
    │
    No
    ↓
Login Page ✅
    ↓ (submit phone/email)
OTP Verification Page ✅
    ↓ (verify OTP)
[First time user?] ──Yes──→ Create Profile Page ✅ ──→ Home (Chat List)
    │
    No
    ↓
Home (Chat List) ✅
```

**Key decisions implemented:**
- OTP auto-submits when all 6 digits are entered
- Auth state persists in localStorage via `STORAGE_KEYS.AUTH_TOKEN`
- Returning users skip directly to Home on refresh
- GuestGuard redirects authenticated users away from auth pages

### Main Navigation

**Mobile: Bottom Tab Navigation**

```
┌──────────────────────────────────────────┐
│                                          │
│             (Active Screen)              │
│                                          │
├────────┬────────┬────────┬────────┤
│  Home  │Channels│Communit│Settings│
│   💬   │   📡   │   👥   │   ⚙️   │
└────────┴────────┴────────┴────────┘
```

- **Home** → Chat List Page (default screen)
- **Channels** → Joined Channels Page (or Discover if none joined)
- **Communities** → Joined Communities Page (or Discover if none joined)
- **Settings** → Settings Page (main menu)

Bottom navigation is hidden on desktop. Desktop uses a persistent sidebar.

**Desktop: Sidebar Navigation**

```
┌──────┬──────────────────────────────────────────┐
│      │                                          │
│ Nav  │           Main Content Area              │
│ Bar  │                                          │
│      │                                          │
│ Home ├──────────────────────────────────────────┤
│Channels│                                        │
│Communit│                                        │
│Settings│                                        │
│       │                                         │
├───────┤                                         │
│ User  │                                         │
└───────┴──────────────────────────────────────────┘
```

- Persistent left sidebar with navigation items matching the bottom tab structure
- Sidebar is hidden on mobile (`hidden lg:flex`)
- User section at the bottom of sidebar for quick profile access

### Home Navigation

```
Chat List Page ✅
    │
    ├── (tap search bar) → Search Chats Page
    │                          └── (switch tab) → Search Messages Page
    │
    ├── (tap FAB) → Add Chat Page
    │                   └── Create Group Page (alternative)
    │
    ├── (tap conversation) → Conversation Page 🚧
    │                           └── (tap header) → Chat Details Page / Group Details Page
    │
    ├── (tap pinned header) → Pinned Chats Page
    │
    └── (tap archive link) → Archived Chats Page

Create Group Page → Group Page (after creation)
Add Chat Page → Conversation Page (after selecting contact)
```

**Mobile:** Each destination is a full-screen push navigation. Back button returns to Chat List.

**Desktop:** Conversation opens in the main content area; sub-pages (details, search) can appear as a right panel or overlay.

### Channels Navigation

```
Joined Channels Page (default)
    │
    ├── (tap channel) → Channel Feed Page
    │                       └── (tap info) → Channel Details Page
    │                                             ├── (owner/admin) → Invite Members Page
    │                                             ├── (owner/admin) → Channel Analytics Page
    │                                             └── (owner/admin) → Channel Settings Page
    │
    ├── (tap create) → Create Channel Page → Channel Feed Page
    │
    └── (tap discover) → Discover Channels Page
                             └── (tap channel) → Channel Details Page
```

### Communities Navigation

```
Joined Communities Page (default)
    │
    ├── (tap community) → Community Details Page
    │                        ├── (if joined) → Community Overview Page
    │                        │                    ├── Community Members Page
    │                        │                    ├── Community Groups Page
    │                        │                    │   └── Group Page
    │                        │                    ├── Community Channels Page
    │                        │                    │   └── Channel Feed Page
    │                        │                    └── Community About Page
    │                        │
    │                        └── (if not joined) → Join Community Page → Community Overview Page
    │
    ├── (tap discover) → Discover Communities Page
    │                        └── (tap community) → Community Details Page
    │
    └── (tap create — future) → Create Community Page → Community Overview Page
```

### Settings Navigation

```
Settings Page (main menu)
    │
    ├── Profile Settings Page
    ├── Account Settings Page
    ├── Privacy Settings Page
    ├── Security Settings Page
    ├── Notification Settings Page
    ├── Chat Settings Page
    ├── Storage & Data Page
    ├── Appearance Settings Page
    ├── Devices Page
    ├── Help & Support Page
    └── About Page
```

All settings sub-pages navigate back to the main Settings Page.

---

## 5. Responsive Layout Planning

### Mobile (< 768px) ✅

**Layout paradigm:** Single-screen, full-bleed content with bottom tab navigation.

- **Bottom tab bar:** Fixed at bottom, 4 tabs (Home, Channels, Communities, Settings)
- **Full-screen conversations:** Tapping a chat replaces the entire screen; back button returns to list
- **Full-screen settings:** Each settings section is a separate screen
- **Full-screen forms:** Login, OTP, profile creation — all full-screen with centered content
- **FAB:** Floating action button for new conversations on ChatListPage

### Tablet (768px - 1024px) — Partially implemented

**Layout paradigm:** Centered cards for auth, split views where appropriate.

- **Auth pages:** Centered card layout on branded background (implemented via AuthLayout)
- **Home:** Bottom navigation persists; full-screen list and conversations
- **Settings:** Not yet implemented

### Desktop (> 1024px) ✅

**Layout paradigm:** Multi-column layouts with persistent navigation.

- **Auth pages:** Split layout — branding panel (left 50%) + form (right 50%)
- **Chat view:** Sidebar (~320px, nav + chat list) + main content area
- **Navigation:** Persistent sidebar (always visible)

### Screens That Benefit from Split Layouts

| Screen | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| Auth pages | Full → Full | Centered card | Split (50/50 branding + form) |
| Chat List + Conversation | Full → Full | Full → Full | Sidebar (320px) + content |
| Channels | Full → Full | Full → Full | Sidebar + content |
| Communities | Full → Full | Full → Full | Sidebar + content |
| Settings | Full → Full | Full → Full | Two-column (not yet built) |

### Screens That Should Always Remain Full Screen

- Login / OTP / Create Profile
- Image/Video Viewer (not yet built)
- Conversation Page (always fills available space)

---

## 6. Shared Components

### Implemented ✅

| Component | Location | Variants |
|-----------|----------|----------|
| **Button** | `core/components/ui/Button.tsx` | primary, secondary, ghost, danger / sm, md, lg / loading state |
| **Input** | `core/components/ui/Input.tsx` | With label, error state, icon support |
| **Avatar** | `core/components/ui/Avatar.tsx` | xs/sm/md/lg/xl sizes, image/initials fallback, online indicator |
| **Spinner** | `core/components/ui/Spinner.tsx` | sm/md/lg sizes |
| **EmptyState** | `core/components/ui/EmptyState.tsx` | Title + description + optional action |
| **PageHeader** | `core/components/layout/PageHeader.tsx` | Back button, title, action icons |
| **PageContainer** | `core/components/layout/PageContainer.tsx` | Scrollable wrapper with padding |
| **BottomNavigation** | `core/components/layout/BottomNavigation.tsx` | 4 tabs (Home, Channels, Communities, Settings) with active states and badges |
| **Sidebar** | `core/components/layout/Sidebar.tsx` | Nav items + user section |
| **ChatListItem** | `features/home/components/ChatListItem.tsx` | Avatar, name, type icon, last message, timestamp, badges |
| **ChatList** | `features/home/components/ChatList.tsx` | Pinned/unpinned sections, loading skeletons, empty state |

### Not yet implemented

| Component | Planned Location | Variants |
|-----------|-----------------|----------|
| User Card | `core/components/shared/` | Compact, standard, detailed |
| Conversation Card | `core/components/shared/` | Standard, compact |
| Member Card | `core/components/shared/` | Standard, with actions |
| Message Bubble | `features/home/components/` | Text, media, file, voice, reply, system |
| Message Input | `features/home/components/` | Standard, reply mode, edit mode |
| Channel Card | `features/channels/components/` | Default, subscribed, admin |
| Community Card | `features/communities/components/` | Default, joined, discover |
| Search Bar | `core/components/ui/` | Standalone, inline, floating |
| Media Grid | `core/components/ui/` | Thumbnail, full-width, story-style |
| Confirmation Dialog | `core/components/ui/` | Destructive, neutral, input required |
| Bottom Sheet | `core/components/ui/` | List, grid, custom |
| Context Menu | `core/components/ui/` | Standard, destructive, selection mode |
| Profile Header | `core/components/shared/` | Own profile, other user, compact |
| Settings Item | `features/settings/components/` | Label+value, label+toggle, label+chevron, destructive |
| Toggle | `core/components/ui/` | On/off switch |
| Group Card | `features/home/components/` | Standard, with members preview |
| Search Result Item | `features/home/components/` | Chat, message, channel, contact |

---

## 7. Route Planning

```
/                                            → Redirects to /home if authenticated, /auth/login if not

/auth/login                                  → Login Page                              ✅
/auth/verify                                 → OTP Verification Page                    ✅
/auth/profile                                → Create Profile Page                      ✅

/home                                        → Chat List Page (Home)                    ✅
/home/search                                 → Search Chats Page
/home/search/messages                        → Search Messages Page
/home/add                                    → Add Chat Page
/home/create-group                           → Create Group Page
/home/archived                               → Archived Chats Page
/home/pinned                                 → Pinned Chats Page
/home/c/:conversationId                      → Conversation Page                        🚧
/home/c/:conversationId/details              → Chat Details Page
/home/g/:groupId                             → Group Page
/home/g/:groupId/details                     → Group Details Page

/channels                                    → Joined Channels Page
/channels/discover                           → Discover Channels Page
/channels/create                             → Create Channel Page
/channels/:channelId                         → Channel Feed Page
/channels/:channelId/details                 → Channel Details Page
/channels/:channelId/invite                  → Invite Members Page
/channels/:channelId/analytics               → Channel Analytics Page (owner/admin)
/channels/:channelId/settings                → Channel Settings Page (owner/admin)

/communities                                 → Joined Communities Page
/communities/discover                        → Discover Communities Page
/communities/join/:communityId               → Join Community Page
/communities/:communityId                    → Community Details Page
/communities/:communityId/overview           → Community Overview Page
/communities/:communityId/members            → Community Members Page
/communities/:communityId/groups             → Community Groups Page
/communities/:communityId/channels           → Community Channels Page
/communities/:communityId/about              → Community About Page

/settings                                    → Settings Page (main menu)
/settings/profile                            → Profile Settings Page
/settings/account                            → Account Settings Page
/settings/privacy                            → Privacy Settings Page
/settings/security                           → Security Settings Page
/settings/notifications                      → Notification Settings Page
/settings/chats                              → Chat Settings Page
/settings/storage                            → Storage & Data Page
/settings/appearance                         → Appearance Settings Page
/settings/devices                            → Devices Page
/settings/help                               → Help & Support Page
/settings/about                              → About Page

/notifications                               → Notifications Page

/admin                                       → Moderation Dashboard (admin only)
/admin/reports                               → Reported Content Page
/admin/bans                                  → Banned Users Page

/organizations                               → Organizations list
/organizations/:orgId                        → Organization Page
/organizations/:orgId/settings               → Organization Settings Page
```

**Route parameter conventions:**
- `:conversationId` — direct message or generic conversation (under `/home/c/`)
- `:groupId` — group-specific routes (under `/home/g/`)
- `:channelId` — channel-specific routes (under `/channels/`)
- `:communityId` — community-specific routes (under `/communities/`)
- `:orgId` — organization by ID

**Route guards implemented:**
- `/auth/*` — GuestGuard (redirect to `/home` if authenticated)
- All other routes — AuthGuard (redirect to `/auth/login` if not authenticated)

**Route constants:** All route paths are defined in `core/utils/routes.ts` to avoid string duplication.

**Navigation tab mapping:**
- `/home/*` — Home tab active
- `/channels/*` — Channels tab active
- `/communities/*` — Communities tab active
- `/settings/*` — Settings tab active

**Route constants:** All route paths are defined in `core/utils/routes.ts` to avoid string duplication.

---

## 8. MVP Planning

### Phase 1 — Core Messaging Hub

| Feature | Screens | Status |
|---------|---------|--------|
| Authentication | Login, OTP, Create Profile | ✅ Done |
| Home (Chat List) | Chat List Page | ✅ Done |
| Conversation | Conversation Page | 🚧 Placeholder |
| Home — Search | Search Chats, Search Messages | Not started |
| Home — Groups | Create Group, Group Page, Group Details | Not started |
| Home — Management | Add Chat, Archived Chats, Pinned Chats, Chat Details | Not started |
| Settings (core) | Settings Page, Profile, Account, Privacy, Appearance | Not started |
| Notifications | Notifications Page | Not started |

**What's implemented:**
- Phone/email login with OTP (mocked via MSW)
- Profile creation
- Auth state persistence (localStorage)
- Route guards (auth + guest)
- Chat list with conversations (mocked data)
- Conversation page (placeholder only)
- Responsive layout (mobile bottom nav, desktop sidebar)
- Split-view auth layout on desktop

**What's NOT yet implemented:**
- Real messaging (text, image, file)
- Read receipts, typing indicators
- Online/offline status (UI exists, not wired)
- Search chats and messages
- Group creation and management
- Chat details, archived, pinned screens
- All settings screens
- Notifications

### Phase 2 — Channels & Communities

| Feature | Screens | Status |
|---------|---------|--------|
| Channels | Joined, Discover, Create, Feed, Details | Not started |
| Channels (Admin) | Invite Members, Analytics, Settings | Not started |
| Communities | Joined, Discover, Details, Join | Not started |
| Community Internal | Overview, Members, Groups, Channels, About | Not started |
| Settings (full) | Security, Notifications, Chats, Storage, Devices, Help, About | Not started |

### Phase 3 — Advanced Features

| Feature | Screens | Status |
|---------|---------|--------|
| Organizations | Organization Page, Settings | Not started |
| Moderation | Dashboard, Reports, Bans | Not started |

---

## 9. Development Order

### Step 1: Project Setup & Core Foundation ✅ Done

**What was built:**
- Vite + React 19 + TypeScript 6 project
- Tailwind CSS v4 configuration
- Path aliases (`@/` → `src/`)
- Folder structure (`app/`, `core/`, `features/`)
- Core UI components (Button, Input, Avatar, Spinner, EmptyState)
- Core layout components (PageHeader, PageContainer, BottomNavigation, Sidebar)
- Core hooks (useMediaQuery, useDebounce, useBreakpoint)
- Core types (User, Conversation, Message, Api)
- Core utils (cn, formatters, constants, routes)
- Providers (Theme, Auth, ErrorBoundary)
- MSW setup with `mockServiceWorker.js`

**Files:** 24 files created

---

### Step 2: Authentication Flow ✅ Done

**What was built:**
- LoginPage (phone/email toggle, input, submit)
- VerifyOtpPage (6-digit auto-submit, resend cooldown, masked identifier)
- CreateProfilePage (name, avatar upload with preview, bio)
- Auth components (LoginForm, OtpInput, ProfileForm)
- Auth hooks (useAuth, useOtp)
- Auth service (login, verifyOtp, createProfile, getCurrentUser)
- AuthLayout (split branding on desktop, centered on mobile)
- AuthGuard + GuestGuard
- MSW handlers for all auth endpoints
- Mock user data (3 test users)

**Files:** 13 files created

---

### Step 3: Home Screen & Navigation ✅ Done

**What was built:**
- MainLayout (responsive: sidebar on desktop, bottom nav on mobile)
- Sidebar component (nav items + user section)
- ChatListPage (header, search bar, conversation list, FAB)
- ChatListItem (avatar, name, type icon, last message, timestamp, badges)
- ChatList (pinned/unpinned sections, loading skeletons, empty state)
- ConversationPage (placeholder with header + empty state + input)
- useConversations hook (fetch from API)
- Mock conversation data (8 conversations: DMs, groups, channels)
- MSW handlers for conversation endpoints
- Router updated with routes for Home section

**Files:** 7 files created, 4 files updated

---

### Step 4: Real Messaging — Not yet started

**What to build:**
- MessageBubble component
- MessageInput component
- MessageList with virtual scrolling
- useMessages hook
- useSendMessage hook
- WebSocket connection for real-time messages
- Chat store for message state

**Why next:** The core value proposition — actual messaging. Transforms the placeholder ConversationPage into a functional chat.

**Depends on:** Steps 1-3 (foundation, conversation page shell).

**Unlocks:** Users can send and receive messages.

---

### Step 5: Home — Search & Conversation Management — Not yet started

**What to build:**
- Search Chats Page (search across conversations)
- Search Messages Page (search within message content)
- Add Chat Page (contact selection and new conversation)
- Archived Chats Page
- Pinned Chats Page
- Chat Details Page (metadata, shared media, mute, block)
- Search components, Archive/Pin management

**Why next:** Search and conversation management are essential for usability as the conversation list grows.

**Depends on:** Steps 3, 4 (conversation list, messaging).

**Unlocks:** Users can find conversations, manage chats, and access chat metadata.

---

### Step 6: Groups — Not yet started

**What to build:**
- Create Group Page (name, avatar, member selection)
- Group Page (group conversation view)
- Group Details Page (members, roles, invite links, settings)
- Group components (GroupCard, MemberList)

**Why next:** Groups are the second most important feature after 1:1 messaging.

**Depends on:** Steps 4, 5 (core messaging, conversation management patterns).

**Unlocks:** Group creation and management.

---

### Step 7: Settings — Not yet started

**What to build:**
- Settings Page (main menu with all sections)
- Profile Settings Page (name, avatar, bio, status)
- Account Settings Page (email, phone, password, delete account)
- Privacy Settings Page (last seen, read receipts, profile visibility)
- Security Settings Page (2FA, active sessions, passkeys)
- Notification Settings Page (per-category preferences)
- Chat Settings Page (wallpaper, font size, enter-to-send)
- Storage & Data Page (cache management, auto-download)
- Appearance Settings Page (theme, dark mode, accent color, language)
- Devices Page (active sessions management)
- Help & Support Page (FAQ, contact, report problem)
- About Page (version, licenses, legal)
- Settings components (SettingsItem, Toggle, ProfileForm)

**Why next:** Settings are needed for users to configure their experience and manage their account.

**Depends on:** Step 2 (auth for session management).

**Unlocks:** Full user control over account and preferences.

---

### Step 8: Channels — Not yet started

**What to build:**
- Joined Channels Page
- Discover Channels Page
- Create Channel Page
- Channel Feed Page (admin post feed)
- Channel Details Page (metadata, subscribe/unsubscribe)
- Invite Members Page (owner/admin)
- Channel Analytics Page (owner/admin — subscriber growth, engagement)
- Channel Settings Page (owner/admin — name, description, permissions)
- Channel components (ChannelCard, ChannelPost)

**Why next:** Channels provide one-to-many broadcast capabilities.

**Depends on:** Step 4 (core messaging patterns).

**Unlocks:** Broadcast communication.

---

### Step 9: Communities — Not yet started

**What to build:**
- Joined Communities Page
- Discover Communities Page
- Community Details Page (metadata, join/leave)
- Join Community Page (preview before joining)
- Community Overview Page (feed, announcements, quick links)
- Community Members Page (directory with roles)
- Community Groups Page (subgroup listing)
- Community Channels Page (channel listing within community)
- Community About Page (guidelines, rules, description)
- Community components (CommunityCard, MemberCard)

**Why next:** Communities organize users around shared interests with subgroups.

**Depends on:** Steps 6, 8 (groups and channels patterns).

**Unlocks:** Organized community spaces with subgroups.

---

### Step 10: Notifications — Not yet started

**What to build:**
- Notifications Page (list, mark read/unread)
- Notification components (NotificationList, NotificationItem)
- Notification service
- Push notification registration
- Notification badge on navigation tabs

**Why next:** Notifications drive re-engagement and inform users of activity.

**Depends on:** Steps 4, 6, 8, 9 (messaging, groups, channels, communities).

**Unlocks:** Users receive and act on activity notifications.

---

### Step 11: Organizations & Moderation — Not yet started

**What to build:**
- Organization Page (details, members, teams)
- Organization Settings Page (name, branding, roles, deletion)
- Moderation Dashboard (reports overview, audit logs)
- Reported Content Page (review and action reports)
- Banned Users Page (view, lift, history)

**Why next:** Enterprise features for multi-tenant management and content safety.

**Depends on:** All prior steps.

**Unlocks:** Multi-tenant support and content moderation.

---

### Step 12: Polish & Optimization — Not yet started

**What to build:**
- Performance optimization (virtual scrolling, lazy loading)
- Accessibility audit (screen readers, keyboard navigation)
- Offline support and optimistic updates
- End-to-end testing
- Animations and transitions polish
- Error handling and recovery flows

---

## Summary

| Step | Feature | Status |
|------|---------|--------|
| 1 | Project Setup & Core Foundation | ✅ Done |
| 2 | Authentication Flow | ✅ Done |
| 3 | Home Screen & Navigation | ✅ Done |
| 4 | Real Messaging | Not started |
| 5 | Home — Search & Conversation Management | Not started |
| 6 | Groups | Not started |
| 7 | Settings (full hierarchy) | Not started |
| 8 | Channels | Not started |
| 9 | Communities | Not started |
| 10 | Notifications | Not started |
| 11 | Organizations & Moderation | Not started |
| 12 | Polish & Optimization | Not started |

**Key principles:**
1. **Feature-based architecture** — Each feature is isolated and self-contained
2. **Mobile-first responsive design** — Every screen works on phones first, adapts to tablets and desktops
3. **Component reusability** — Shared components in `core/` prevent duplication
4. **Progressive enhancement** — MVP in Phase 1, enhanced features in Phase 2, advanced features in Phase 3
5. **Incremental development** — Each step builds on the previous, minimizing refactoring

**Implementation stats:**
- **47 source files** created
- **Zero TypeScript errors** in production build
- **Code-split bundles** for each lazy-loaded page
- **MSW mocking** for all auth + conversation endpoints
- **Responsive layouts** working across mobile, tablet, and desktop breakpoints
