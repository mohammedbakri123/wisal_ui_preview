import { useNavigate } from 'react-router'

interface SettingsItemProps {
  title: string
  description: string
  path?: string
  value?: string
  destructive?: boolean
}

export function SettingsItem({ title, description, path, value, destructive = false }: SettingsItemProps) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => path && navigate(path)}
      disabled={!path}
      className="flex w-full items-center gap-3 border-b border-border-light/30 p-3.5 sm:p-4 text-start last:border-b-0 enabled:hover:bg-surface-hover disabled:cursor-default transition-colors"
    >
      <div className={`shrink-0 w-2 h-2 rounded-full ${destructive ? 'bg-destructive' : 'bg-accent'}`} />
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-semibold ${destructive ? 'text-destructive' : 'text-foreground'}`}>
          {title}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground/70">{description}</p>
      </div>
      {value && <span className="text-xs text-muted-foreground/60 shrink-0">{value}</span>}
    </button>
  )
}
