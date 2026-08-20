import { useNavigate } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { Toggle } from '@/core/components/ui/Toggle'
import type { Conversation } from '@/core/types'
import { ROUTES } from '@/core/utils/routes'
import { removeMockConversation } from '../hooks/useConversations'

interface ConversationDetailsPanelProps {
  conversation: Conversation
  isMuted: boolean
  isBlocked: boolean
  onMutedChange: (value: boolean) => void
  onBlockedChange: (value: boolean) => void
  onClearMessages: () => void
  onClose: () => void
}

export function ConversationDetailsPanel({
  conversation,
  isMuted,
  isBlocked,
  onMutedChange,
  onBlockedChange,
  onClearMessages,
  onClose,
}: ConversationDetailsPanelProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 text-[#e7e9ea]">
      {/* Profile summary header */}
      <div className="flex flex-col items-center py-2 text-center">
        <Avatar src={conversation.avatar} alt={conversation.name} size="xl" verified verifiedType="blue" />
        <h3 className="mt-3 text-[20px] font-bold text-[#e7e9ea]">{conversation.name}</h3>
        <p className="mt-0.5 text-[13px] text-[#71767b]">
          {conversation.type === 'direct' ? '@' + conversation.name.toLowerCase().replace(/\s+/g, '') : `${conversation.members.length} أعضاء`}
        </p>
        {conversation.type === 'direct' && (
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => navigate(`/profile/${conversation.name.toLowerCase().replace(/\s+/g, '')}`)}
          >
            عرض الملف الشخصي
          </Button>
        )}
      </div>

      {/* Notifications & Security Preferences */}
      <section className="space-y-2">
        <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#71767b] px-1">
          Settings
        </h4>
        <div className="rounded-2xl bg-[#16181c] border border-[#2f3336] overflow-hidden divide-y divide-[#2f3336]">
          <ToggleRow
            label="كتم الإشعارات"
            checked={isMuted}
            onChange={onMutedChange}
            iconPath="M14.86 17.08a23.85 23.85 0 0 0 5.45-1.31A8.97 8.97 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.97 8.97 0 0 1-2.31 6.02c1.73.64 3.56 1.09 5.45 1.31m5.72 0a24.26 24.26 0 0 1-5.72 0m5.72 0a3 3 0 1 1-5.72 0"
          />
          {conversation.type === 'direct' && (
            <ToggleRow
              label="حظر المستخدم"
              checked={isBlocked}
              onChange={onBlockedChange}
              destructive
              iconPath="M18.36 18.36A9 9 0 0 0 5.64 5.64m12.72 12.72A9 9 0 0 1 5.64 5.64m12.72 12.72L5.64 5.64"
            />
          )}
        </div>
      </section>

      {/* Members (for groups) */}
      {conversation.type !== 'direct' && (
        <section className="space-y-2">
          <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#71767b] px-1">
            أعضاء المجموعة ({conversation.members.length})
          </h4>
          <div className="rounded-2xl bg-[#16181c] border border-[#2f3336] p-3 space-y-1 divide-y divide-[#2f3336]">
            {conversation.members.map((member, index) => (
              <div key={member.id} className="flex items-center gap-3 pt-2 first:pt-0">
                <Avatar src={member.avatar} alt={member.name} size="xs" online={member.isOnline ?? true} />
                <div className="min-w-0 flex-1 text-start">
                  <p className="truncate text-sm font-bold text-[#e7e9ea]">{member.name}</p>
                  <span className="text-[11px] text-[#71767b]">{index === 0 ? 'مسؤول' : 'عضو'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="space-y-2 pt-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-[#71767b] hover:text-[#e7e9ea]"
          onClick={() => {
            onClearMessages()
            onClose()
          }}
        >
          مسح سجل المحادثة
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="w-full"
          onClick={() => {
            onClearMessages()
            removeMockConversation(conversation.id)
            navigate(ROUTES.CHAT.LIST)
          }}
        >
          حذف المحادثة
        </Button>
      </div>
    </div>
  )
}

interface ToggleRowProps {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
  iconPath: string
  destructive?: boolean
}

function ToggleRow({ label, checked, onChange, iconPath, destructive = false }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div className="flex items-center gap-3">
        <svg
          className={destructive ? 'h-5 w-5 text-[#f4212e]' : 'h-5 w-5 text-[#71767b]'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
        <span className={destructive ? 'text-[15px] font-bold text-[#f4212e]' : 'text-[15px] font-medium text-[#e7e9ea]'}>
          {label}
        </span>
      </div>
      <Toggle checked={checked} onChange={onChange} label={label} destructive={destructive} />
    </div>
  )
}
