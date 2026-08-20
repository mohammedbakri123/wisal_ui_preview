import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { useConversations } from '../hooks/useConversations'

export default function ArchivedChatsPage() {
  const { conversations } = useConversations()
  const archived = conversations.filter((conversation) => conversation.isMuted && !conversation.isPinned)

  return (
    <FeatureScaffold
      title="Archived Chats"
      description="Archived conversations are quiet spaces you can restore by opening them again."
      backTo={ROUTES.CHAT.LIST}
      sections={[
        {
          title: 'Archived',
          items: archived.map((conversation) => ({
            title: conversation.name,
            description: conversation.lastMessage ?? 'No recent message',
            meta: 'Archived',
            path: conversation.type === 'group' ? `/home/g/${conversation.id}` : `/home/c/${conversation.id}`,
          })),
        },
      ]}
    />
  )
}
