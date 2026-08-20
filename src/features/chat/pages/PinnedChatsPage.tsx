import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { useConversations } from '../hooks/useConversations'

export default function PinnedChatsPage() {
  const { conversations } = useConversations()

  return (
    <FeatureScaffold
      title="Pinned Chats"
      description="Pinned conversations stay at the top of your messaging hub for fast access."
      backTo={ROUTES.CHAT.LIST}
      sections={[
        {
          title: 'Pinned',
          items: conversations.filter((item) => item.isPinned).map((conversation) => ({
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
