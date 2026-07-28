import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { mockConversations } from '@/mocks/data/conversations'

export default function PinnedChatsPage() {
  return (
    <FeatureScaffold
      title="Pinned Chats"
      description="Pinned conversations stay at the top of your messaging hub for fast access."
      backTo={ROUTES.CHAT.LIST}
      sections={[
        {
          title: 'Pinned',
          items: mockConversations.filter((item) => item.isPinned).map((conversation) => ({
            title: conversation.name,
            description: conversation.lastMessage ?? 'No recent message',
            meta: conversation.type,
            path: conversation.type === 'group' ? `/home/g/${conversation.id}` : `/home/c/${conversation.id}`,
          })),
        },
      ]}
    />
  )
}
