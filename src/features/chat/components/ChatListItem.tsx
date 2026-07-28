import { useNavigate } from 'react-router'
import { useRef, useState, useEffect } from 'react'
import type { Conversation } from '@/core/types'
import { Avatar } from '@/core/components/ui/Avatar'
import { cn } from '@/core/utils/cn'
import { formatRelativeTime } from '@/core/utils/formatters'

interface ChatListItemProps {
  conversation: Conversation
  onTogglePin?: (id: string) => void
  onArchive?: (id: string) => void
  onDelete?: (id: string) => void
  onMarkRead?: (id: string) => void
}

function ConversationTypeIcon({ type }: { type: Conversation['type'] }) {
  if (type === 'direct') return null

  const icon =
    type === 'group' ? (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ) : (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.559 6.438V17.01a.472.472 0 00.707.405l4.037-2.48a.473.473 0 01.527 0l4.037 2.48a.472.472 0 00.707-.405V6.438a.472.472 0 00-.354-.457l-4.5-1a.473.473 0 01-.272 0l-4.5 1A.472.472 0 005.559 6.438z" />
      </svg>
    )

  return (
    <span className="text-muted-foreground/50">{icon}</span>
  )
}

interface ContextMenuState {
  x: number
  y: number
}

export function ChatListItem({ conversation, onTogglePin, onArchive, onDelete, onMarkRead }: ChatListItemProps) {
  const navigate = useNavigate()
  const path = conversation.type === 'group' ? `/home/g/${conversation.id}` : `/home/c/${conversation.id}`
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null)
  const menuOpenRef = useRef(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  // Close menu on outside click
  useEffect(() => {
    if (!contextMenu) return
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null)
      }
    }
    const handleScroll = () => setContextMenu(null)
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('scroll', handleScroll, true)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('scroll', handleScroll)
    }
  }, [contextMenu])

  const openMenu = (x: number, y: number) => {
    const menuWidth = 200
    const menuHeight = 200
    const adjustedX = Math.min(x, window.innerWidth - menuWidth - 16)
    const adjustedY = Math.min(y, window.innerHeight - menuHeight - 16)
    menuOpenRef.current = true
    setContextMenu({ x: adjustedX, y: adjustedY })
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    openMenu(e.clientX, e.clientY)
  }

  const handleMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      // Trigger on long press (800ms)
      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect()
        openMenu(rect.right - 160, rect.top + 10)
      }
    }, 600)
  }

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
  }

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect()
        openMenu(rect.right - 160, rect.top + 10)
      }
    }, 600)
  }

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
  }

  const handleClick = () => {
    if (menuOpenRef.current) {
      menuOpenRef.current = false
      setContextMenu(null)
      return
    }
    navigate(path)
  }

  const handleAction = (action: () => void) => {
    action()
    menuOpenRef.current = false
    setContextMenu(null)
  }

  const isPinned = conversation.isPinned
  const hasUnread = conversation.unreadCount > 0

  return (
    <div
      ref={itemRef}
      className="relative border-b border-border-light/30 no-tap-highlight"
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Context menu */}
      {contextMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setContextMenu(null)} />
          <div
            ref={menuRef}
            className="fixed z-50 w-48 bg-surface border border-border-light/60 rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            {/* Mark as read / unread */}
            {onMarkRead && (
              <button
                onClick={() => handleAction(() => onMarkRead(conversation.id))}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={hasUnread
                    ? "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    : "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"}
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d={hasUnread
                    ? "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    : "m15.75 10.5 2.25 2.25L21 10.5"}
                  />
                </svg>
                {hasUnread ? 'Mark as read' : 'Mark as unread'}
              </button>
            )}

            {/* Divider */}
            <div className="border-t border-border-light/30" />

            {/* Pin / Unpin */}
            {onTogglePin && (
              <button
                onClick={() => handleAction(() => onTogglePin(conversation.id))}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                  {isPinned
                    ? <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2zm-5.78 5.58c.25-.55.6-.55.85 0l1.06 2.43 2.6.24c.54.05.98.19 1.21.58.23.39.09.8-.29 1.18l-1.36 1.36.44 2.58c.11.67-.19 1.02-.68 1.02-.14 0-.3-.03-.47-.12L12 13.95l-2.51 1.32c-.17.09-.33.12-.47.12-.49 0-.79-.35-.68-1.02l.44-2.58-1.36-1.36c-.38-.38-.52-.79-.29-1.18.23-.39.67-.53 1.21-.58l2.6-.24 1.06-2.43z" />
                    : <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2z" />
                  }
                </svg>
                {isPinned ? 'Unpin' : 'Pin'}
              </button>
            )}

            {/* Archive */}
            {onArchive && (
              <button
                onClick={() => handleAction(() => onArchive(conversation.id))}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                Archive
              </button>
            )}

            {/* Divider */}
            <div className="border-t border-border-light/30" />

            {/* Delete */}
            {onDelete && (
              <button
                onClick={() => handleAction(() => onDelete(conversation.id))}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                Delete chat
              </button>
            )}
          </div>
        </>
      )}

      {/* Main content */}        <button
          onClick={handleClick}
          className={cn(
            'group w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-150 cursor-pointer relative bg-surface',
            'hover:bg-surface-hover active:bg-muted/40',
            isPinned && 'bg-surface/30',
          )}
        >
        <Avatar
          src={conversation.avatar}
          alt={conversation.name}
          size="md"
          online={conversation.type === 'direct'}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              {isPinned && (
                <svg className="h-3 w-3 shrink-0 text-muted-foreground/40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2zm-1.65 8.47l-1.36 1.36.44 2.58c.11.67-.19 1.02-.68 1.02-.14 0-.3-.03-.47-.12l-2.51-1.32-2.51 1.32c-.17.09-.33.12-.47.12-.48 0-.79-.35-.68-1.02l.44-2.58-1.36-1.36c-.38-.38-.52-.79-.29-1.18.23-.39.67-.53 1.21-.58l2.6-.24 1.06-2.43c.24-.55.6-.55.84 0l1.06 2.43 2.6.24c.54.05.98.19 1.21.58.23.39.09.8-.29 1.18z" />
                </svg>
              )}
              <span className={cn(
                'text-sm truncate',
                conversation.unreadCount > 0 ? 'font-semibold text-foreground' : 'font-medium text-foreground/90',
              )}>{conversation.name}</span>
              <ConversationTypeIcon type={conversation.type} />
            </div>
            <span className={cn(
              'text-[11px] shrink-0 tabular-nums',
              conversation.unreadCount > 0 ? 'text-muted-foreground/70' : 'text-muted-foreground/50',
            )}>
              {conversation.lastMessageAt
                ? formatRelativeTime(conversation.lastMessageAt)
                : ''}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-0.5">
            <p className={cn(
              'text-xs truncate flex-1',
              conversation.unreadCount > 0 ? 'text-muted-foreground/80 font-medium' : 'text-muted-foreground/60',
            )}>
              {conversation.lastMessage ?? 'No messages yet'}
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              {conversation.isMuted && (
                <svg className="h-3.5 w-3.5 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              )}
              {conversation.unreadCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[10px] font-bold text-white bg-accent rounded-full tabular-nums shadow-sm shadow-accent/30">
                  {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                </span>
              )}
              {/* Three-dot context menu indicator */}
              <span className="flex items-center justify-center w-5 h-5 rounded-full text-muted-foreground/30 group-hover:text-muted-foreground/60 hover:text-muted-foreground/60 transition-colors cursor-pointer">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}
