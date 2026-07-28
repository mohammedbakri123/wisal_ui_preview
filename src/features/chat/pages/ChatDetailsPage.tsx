import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { mockConversations } from '@/mocks/data/conversations'

export default function ChatDetailsPage() {
  const { conversationId } = useParams()
  const conversation = mockConversations.find((item) => item.id === conversationId) ?? mockConversations[0]

  return (
    <FeatureScaffold
      title={`${conversation.name} Details`}
      description="Review shared media, pinned messages, privacy controls, and conversation management actions."
      backTo={`/home/c/${conversation.id}`}
      sections={[
        {
          title: 'Conversation controls',
          items: [
            { title: 'Mute notifications', description: 'Pause push and in-app alerts from this conversation.', meta: conversation.isMuted ? 'On' : 'Off' },
            { title: 'Pinned messages', description: 'Review important messages saved from this chat.', meta: '2' },
            { title: 'Shared media', description: 'Images, files, and links exchanged in the chat.', meta: '18' },
            { title: 'Block contact', description: 'Stop receiving messages from this contact.', meta: 'Direct' },
          ],
        },
      ]}
    />
  )
}
