import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { useConversations } from '../hooks/useConversations'

export default function PinnedChatsPage() {
  const { conversations } = useConversations()

  return (
    <FeatureScaffold
      title="المحادثات المثبتة"
      description="المحادثات المثبتة تبقى في أعلى مركز رسائلك للوصول السريع."
      backTo={ROUTES.CHAT.LIST}
      sections={[
        {
          title: 'المثبتة',
          items: conversations.filter((item) => item.isPinned).map((conversation) => ({
            title: conversation.name,
            description: conversation.lastMessage ?? 'لا توجد رسائل حديثة',
            meta: conversation.type,
            path: conversation.type === 'group' ? `/home/g/${conversation.id}` : `/home/c/${conversation.id}`,
          })),
        },
      ]}
    />
  )
}
