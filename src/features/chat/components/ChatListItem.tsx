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

  return (
    <span className="text-[#71767b]" title={type === 'group' ? 'Group' : 'Channel'}>
      {type === 'group' ? (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.34 15.84c-.012-.03-.027-.06-.046-.089a4.5 4.5 0 116.892-5.467M12 21.75a9.75 9.75 0 110-19.5 9.75 9.75 0 010 19.5z" />
        </svg>
      )}
    </span>
  )
}

interface ContextMenuState {
  x: number
  y: number
}

export function ChatListItem({
  conversation,
  onTogglePin,
  onArchive,
  onDelete,
  onMarkRead,
}: ChatListItemProps) {
  const navigate = useNavigate()
  const path = conversation.type === 'group' ? `/home/g/${conversation.id}` : `/home/c/${conversation.id}`
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null)
  const menuOpenRef = useRef(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const itemRef = useRef<HTMLDivElement>(null)

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
    const menuHeight = 220
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
      className="relative border-b border-[#2f3336] select-none"
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Context dropdown menu */}
      {contextMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setContextMenu(null)} />
          <div
            ref={menuRef}
            className="fixed z-50 w-52 bg-[#16181c] border border-[#2f3336] rounded-2xl shadow-2xl overflow-hidden animate-dropdown-in py-1"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            {/* Mark as read / unread */}
            {onMarkRead && (
              <button
                onClick={() => handleAction(() => onMarkRead(conversation.id))}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-[14px] font-medium text-[#e7e9ea] hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <svg className="h-4 w-4 text-[#71767b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {hasUnread ? 'Mark as read' : 'Mark as unread'}
              </button>
            )}

            {/* Pin / Unpin */}
            {onTogglePin && (
              <button
                onClick={() => handleAction(() => onTogglePin(conversation.id))}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-[14px] font-medium text-[#e7e9ea] hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <svg className="h-4 w-4 text-[#71767b]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2z" />
                </svg>
                {isPinned ? 'Unpin conversation' : 'Pin conversation'}
              </button>
            )}

            {/* Archive */}
            {onArchive && (
              <button
                onClick={() => handleAction(() => onArchive(conversation.id))}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-[14px] font-medium text-[#e7e9ea] hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <svg className="h-4 w-4 text-[#71767b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                Archive conversation
              </button>
            )}

            <div className="border-t border-[#2f3336] my-1" />

            {/* Delete */}
            {onDelete && (
              <button
                onClick={() => handleAction(() => onDelete(conversation.id))}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-[14px] font-medium text-[#f4212e] hover:bg-[#f4212e]/10 transition-colors cursor-pointer"
              >
                <svg className="h-4 w-4 text-[#f4212e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Delete conversation
              </button>
            )}
          </div>
        </>
      )}

      {/* Main Row */}
      <button
        onClick={handleClick}
        className={cn(
          'group w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors cursor-pointer',
          'bg-transparent hover:bg-white/[0.03] active:bg-white/[0.06]',
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
                <svg className="h-3.5 w-3.5 shrink-0 text-[#71767b]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2z" />
                </svg>
              )}
              <span className={cn(
                'text-[15px] truncate',
                hasUnread ? 'font-bold text-[#e7e9ea]' : 'font-semibold text-[#e7e9ea]',
              )}>
                {conversation.name}
              </span>
              <ConversationTypeIcon type={conversation.type} />
            </div>

            <span className="text-[13px] text-[#71767b] shrink-0 tabular-nums">
              {conversation.lastMessageAt ? formatRelativeTime(conversation.lastMessageAt) : ''}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-0.5">
            <p className={cn(
              'text-[15px] truncate flex-1',
              hasUnread ? 'text-[#e7e9ea] font-medium' : 'text-[#71767b]',
            )}>
              {conversation.lastMessage ?? 'No messages yet'}
            </p>

            <div className="flex items-center gap-1.5 shrink-0">
              {conversation.isMuted && (
                <svg className="h-4 w-4 text-[#71767b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              )}
              {hasUnread && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-bold text-white bg-[#1d9bf0] rounded-full tabular-nums">
                  {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}
