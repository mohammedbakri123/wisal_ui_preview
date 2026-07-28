interface ChannelPostProps {
  title: string
  body: string
  meta?: string
}

export function ChannelPost({ title, body, meta = 'Live' }: ChannelPostProps) {
  return (
    <article className="rounded-lg border border-border/50 bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold">{title}</h3>
        <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground">
          {meta}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
      <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
        <span>24 reactions</span>
        <span>8 replies</span>
        <span>1.2k views</span>
      </div>
    </article>
  )
}
