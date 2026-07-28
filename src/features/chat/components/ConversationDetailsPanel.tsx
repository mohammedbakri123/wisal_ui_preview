import { useNavigate } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { Button } from '@/core/components/ui/Button'
import { Toggle } from '@/core/components/ui/Toggle'
import type { Conversation } from '@/core/types'
import { ROUTES } from '@/core/utils/routes'

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
    <div className="space-y-6">
        {/* Profile section */}
        <div className="flex flex-col items-center py-4 text-center">
          <Avatar src={conversation.avatar} alt={conversation.name} size="xl" />
          <h3 className="mt-4 text-lg font-semibold">{conversation.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground/70">
            {conversation.type === 'direct' ? 'Direct message' : `${conversation.members.length} members`}
          </p>
          {conversation.type === 'direct' && (
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={() => navigate(`/profile/${conversation.name.toLowerCase().replace(/\s+/g, '')}`)}
            >
              View Profile
            </Button>
          )}
        </div>

        {/* Preferences */}
        <section className="space-y-2">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-1">Preferences</h4>
          <div className="rounded-xl bg-background border border-border-light/40 overflow-hidden">
            <ToggleRow
              label="Mute notifications"
              checked={isMuted}
              onChange={onMutedChange}
              iconPath="M14.86 17.08a23.85 23.85 0 0 0 5.45-1.31A8.97 8.97 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.97 8.97 0 0 1-2.31 6.02c1.73.64 3.56 1.09 5.45 1.31m5.72 0a24.26 24.26 0 0 1-5.72 0m5.72 0a3 3 0 1 1-5.72 0"
            />
            {conversation.type === 'direct' && (
              <div className="border-t border-border-light/40">
                <ToggleRow
                  label="Block contact"
                  checked={isBlocked}
                  onChange={onBlockedChange}
                  destructive
                  iconPath="M18.36 18.36A9 9 0 0 0 5.64 5.64m12.72 12.72A9 9 0 0 1 5.64 5.64m12.72 12.72L5.64 5.64"
                />
              </div>
            )}
          </div>
        </section>

        {/* Members (for groups) */}
        {conversation.type !== 'direct' && (
          <section className="space-y-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-1">
              Members ({conversation.members.length})
            </h4>
            <div className="rounded-xl bg-background border border-border-light/40 p-3 space-y-2">
              {conversation.members.slice(0, 6).map((member, index) => (
                <div key={member.id} className="flex items-center gap-3 py-1">
                  <Avatar src={member.avatar} alt={member.name} size="xs" online={member.isOnline ?? true} />
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-xs font-medium">{member.name}</p>
                    <span className="text-[9px] text-muted-foreground/60">{index === 0 ? 'Admin' : 'Member'}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Shared media */}
        <section className="space-y-2">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-1">Shared media</h4>
          <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-background border border-border-light/40 p-2">
            {['', '', ''].map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-lg bg-muted/40 border border-border-light/30"
              >
                <svg className="h-5 w-5 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.16-5.16a2.25 2.25 0 0 1 3.18 0l5.16 5.16m-1.5-1.5 1.41-1.41a2.25 2.25 0 0 1 3.18 0l2.91 2.91M3.75 19.5h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
                </svg>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="space-y-1 pt-2">
          <button
            onClick={() => {
              onClearMessages()
              onClose()
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            Clear chat history
          </button>
          <button
            onClick={() => {
              onClearMessages()
              navigate(ROUTES.CHAT.LIST)
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            Delete chat
          </button>
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
    <div className="flex items-center justify-between px-3 py-3">
      <div className="flex items-center gap-3">
        <svg
          className={destructive ? 'h-4.5 w-4.5 text-destructive' : 'h-4.5 w-4.5 text-muted-foreground'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
        <span className={destructive ? 'text-xs font-medium text-destructive' : 'text-xs font-medium'}>
          {label}
        </span>
      </div>
      <Toggle checked={checked} onChange={onChange} label={label} destructive={destructive} />
    </div>
  )
}
