import { cn } from '@/core/utils/cn'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string | null
  alt: string
  size?: AvatarSize
  online?: boolean
  story?: boolean
  storySeen?: boolean
  className?: string
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; dot: string }> = {
  xs: { container: 'h-6 w-6', text: 'text-[10px]', dot: 'h-1.5 w-1.5 border' },
  sm: { container: 'h-8 w-8', text: 'text-xs', dot: 'h-2 w-2 border' },
  md: { container: 'h-10 w-10', text: 'text-sm', dot: 'h-2.5 w-2.5 border-2' },
  lg: { container: 'h-14 w-14', text: 'text-lg', dot: 'h-3 w-3 border-2' },
  xl: { container: 'h-20 w-20', text: 'text-2xl', dot: 'h-3.5 w-3.5 border-2' },
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const colors = [
  'bg-accent/20 text-accent',
  'bg-emerald-500/20 text-emerald-400',
  'bg-amber-500/20 text-amber-400',
  'bg-sky-500/20 text-sky-400',
  'bg-violet-500/20 text-violet-400',
]

function getColorForName(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export function Avatar({ src, alt, size = 'md', online, story, storySeen, className }: AvatarProps) {
  const styles = sizeStyles[size]

  return (
    <div className={cn('relative inline-flex shrink-0', story && 'p-0.5', className)}>
      {story && (
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            storySeen ? 'story-ring-seen' : 'story-ring-unseen',
            'p-[2px]',
          )}
        >
          <div className="h-full w-full rounded-full bg-background" />
        </div>
      )}
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn(styles.container, 'rounded-full object-cover relative z-10')}
        />
      ) : (
        <div
          className={cn(
            styles.container,
            'rounded-full flex items-center justify-center font-semibold relative z-10',
            getColorForName(alt),
          )}
        >
          <span className={styles.text}>{getInitials(alt)}</span>
        </div>
      )}
      {online !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-background z-20',
            styles.dot,
            online ? 'bg-success' : 'bg-muted-foreground',
          )}
        />
      )}
    </div>
  )
}
