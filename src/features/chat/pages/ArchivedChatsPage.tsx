import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { useConversations } from '../hooks/useConversations'

export default function ArchivedChatsPage() {
  const { conversations } = useConversations()
  const archived = conversations.filter((conversation) => conversation.isMuted && !conversation.isPinned)

  return (
    <FeatureScaffold
      title="المحادثات المؤرشفة"
      description="المحادثات المؤرشفة هي مساحات هادئة يمكنك استعادتها بفتحها مرة أخرى."
      backTo={ROUTES.CHAT.LIST}
      sections={[
        {
          title: 'المؤرشفة',
          items: archived.map((conversation) => ({
            title: conversation.name,
            description: conversation.lastMessage ?? 'لا توجد رسائل حديثة',
            meta: 'مؤرشفة',
            path: conversation.type === 'group' ? `/home/g/${conversation.id}` : `/home/c/${conversation.id}`,
          })),
        },
      ]}
    />
  )
}
