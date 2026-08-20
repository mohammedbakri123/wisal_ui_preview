import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { EmptyState } from '@/core/components/ui/EmptyState'
import { Spinner } from '@/core/components/ui/Spinner'
import { Sheet } from '@/core/components/ui/Sheet'
import { ROUTES } from '@/core/utils/routes'
import { useAuth } from '@/app/providers/AuthProvider'
import { mockConversations } from '@/mocks/data/conversations'
import { ConversationDetailsPanel } from '../components/ConversationDetailsPanel'
import { MessageInput } from '../components/MessageInput'
import { MessageList } from '../components/MessageList'
import { useMessages } from '../hooks/useMessages'
import { useRealtimeMessages } from '../hooks/useRealtimeMessages'
import { useSendMessage } from '../hooks/useSendMessage'
import { updateMockConversation } from '../hooks/useConversations'
import type { User } from '@/core/types'

export default function ConversationPage() {
  const { conversationId, groupId } = useParams<{ conversationId?: string; groupId?: string }>()
  const activeConversationId = conversationId ?? groupId
  const navigate = useNavigate()
  const location = useLocation()
  const { user: currentUser } = useAuth()
  const [showDetails, setShowDetails] = useState(false)
  const [replyingTo, setReplyingTo] = useState<import('@/core/types').Message | null>(null)
  const [selectedMember, setSelectedMember] = useState<User | null>(null)

  const conversation = mockConversations.find((item) => item.id === activeConversationId)
  const { messages, isLoading, isReplying, error, clearMessages } = useMessages(conversation)
  const sendMessage = useSendMessage(conversation, currentUser)
  useRealtimeMessages(conversation)
  const isMuted = conversation?.isMuted ?? false
  const isBlocked = conversation?.isBlocked ?? false
  const storyReply = (location.state as { prefill?: string } | null)?.prefill ?? ''
  const highlightMessageId = (location.state as { highlightMessageId?: string } | null)?.highlightMessageId

  if (!activeConversationId) {
    return (
      <div className="flex h-full items-center justify-center bg-black">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center bg-black p-6">
        <EmptyState
          title="المحادثة غير موجودة"
          description="قد تكون هذه المحادثة محذوفة أو غير موجودة."
          action={<Button variant="primary" onClick={() => navigate(ROUTES.CHAT.LIST)}>العودة إلى الرسائل</Button>}
        />
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-black text-[#e7e9ea]">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-20 flex h-[53px] shrink-0 items-center justify-between gap-3 border-b border-[#2f3336] bg-black/65 px-4 backdrop-blur-md">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          <button
            type="button"
            onClick={() => navigate(ROUTES.CHAT.LIST)}
            className="w-[34.75px] h-[34.75px] rounded-full flex items-center justify-center text-[#e7e9ea] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors md:hidden cursor-pointer shrink-0"
            title="العودة إلى المحادثات"
          >
            <svg className="h-5 w-5 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="flex min-w-0 items-center gap-3 text-start hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Avatar
              src={conversation.avatar}
              alt={conversation.name}
              size="sm"
              online={conversation.type === 'direct'}
              verified
              verifiedType={conversation.type === 'channel' ? 'gold' : 'blue'}
            />
            <div className="min-w-0">
              <h1 className="truncate text-[15px] font-bold text-[#e7e9ea] leading-tight">
                {conversation.name}
              </h1>
              <p className="truncate text-[12px] text-[#71767b] leading-tight">
                {conversation.type === 'direct'
                  ? isMuted ? 'مكتومة' : 'متصل'
                  : `${conversation.members.length || 0} أعضاء`}
              </p>
            </div>
          </button>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => navigate(`/home/c/${conversation.id}/search`)}
            className="w-[34.75px] h-[34.75px] rounded-full flex items-center justify-center text-[#e7e9ea] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors cursor-pointer"
            title="البحث في المحادثة"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="w-[34.75px] h-[34.75px] rounded-full flex items-center justify-center text-[#e7e9ea] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors cursor-pointer"
            title="تفاصيل المحادثة"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Message Stream */}
      <main className="relative flex-1 overflow-y-auto scrollbar-thin bg-black">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <MessageList
            conversation={conversation}
            currentUserId={currentUser?.id}
            messages={messages}
            isReplying={isReplying}
            highlightMessageId={highlightMessageId}
            onReply={setReplyingTo}
            onOpenMember={conversation.type !== 'direct' ? setSelectedMember : undefined}
          />
        )}
      </main>

      {/* Bottom Composer */}
      <footer className="shrink-0 bg-black">
        {error && <p className="px-4 py-1 text-center text-xs text-[#f4212e]">{error}</p>}
        <MessageInput
          disabled={isBlocked}
          initialValue={storyReply}
          mentionUsers={conversation.type !== 'direct' ? conversation.members : []}
          onSend={sendMessage}
          replyingTo={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
        />
      </footer>

      {/* Details Sheet Modal */}
      <Sheet open={showDetails} onClose={() => setShowDetails(false)} title="معلومات المحادثة">
        <ConversationDetailsPanel
          conversation={conversation}
          isMuted={isMuted}
          isBlocked={isBlocked}
          onMutedChange={(value) => {
            updateMockConversation(conversation.id, { isMuted: value })
          }}
          onBlockedChange={(value) => {
            updateMockConversation(conversation.id, { isBlocked: value })
          }}
          onClearMessages={clearMessages}
          onClose={() => setShowDetails(false)}
        />
      </Sheet>

      <Sheet open={selectedMember !== null} onClose={() => setSelectedMember(null)} title="الملف الشخصي للعضو">
        {selectedMember && (
          <div className="text-center">
            <Avatar src={selectedMember.avatar} alt={selectedMember.name} size="xl" online={selectedMember.isOnline} />
            <h2 className="mt-3 text-xl font-bold">{selectedMember.name}</h2>
            <p className="mt-1 text-sm text-[#71767b]">عضو في المجموعة</p>
            <p className="mt-4 text-sm leading-relaxed text-[#71767b]">{selectedMember.bio ?? 'لا توجد نبذة بعد.'}</p>
            <div className="mt-5 flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => navigate(`/profile/${selectedMember.name.toLowerCase().replace(/\s+/g, '')}`)}>عرض الملف الشخصي</Button>
              <Button className="flex-1" onClick={() => { setSelectedMember(null); navigate('/home/c/c1') }}>مراسلة</Button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  )
}
