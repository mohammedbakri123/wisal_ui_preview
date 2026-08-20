import type { NotificationRecord } from '../services/notifications.service'

interface NotificationItemProps {
  item: NotificationRecord
  onOpen: (item: NotificationRecord) => void
}

export function NotificationItem({ item, onOpen }: NotificationItemProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border bg-surface p-4 text-start transition-all hover:bg-surface-hover hover:shadow-sm ${
        item.isUnread ? 'border-accent/30 shadow-sm shadow-accent/5' : 'border-border-light/40'
      }`}
    >
      {item.isUnread && <div className="absolute end-4 top-4 h-2 w-2 rounded-full bg-accent" />}
      <div className="mt-0.5 rounded-xl bg-muted p-2 text-muted-foreground">
        <span className="block h-4 w-4 text-center text-xs font-bold uppercase">{item.type[0]}</span>
      </div>
      <div className="min-w-0 flex-1 pe-4">
        <p className={`truncate text-sm text-foreground ${item.isUnread ? 'font-bold' : 'font-semibold'}`}>
          {item.title}
        </p>
        <p className="mt-0.5 text-xs leading-5 text-muted-foreground/80">{item.body}</p>
        <span className="mt-2 block text-[10px] font-medium text-muted-foreground/50">{item.time}</span>
      </div>
    </button>
  )
}
