import { cn } from '@/core/utils/cn'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'profile'

export interface AvatarProps {
  src?: string | null
  alt: string
  size?: AvatarSize
  online?: boolean
  story?: boolean
  storySeen?: boolean
  verified?: boolean
  verifiedType?: 'blue' | 'gold'
  className?: string
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; dot: string; verifiedIcon: string }> = {
  xs: { container: 'h-6 w-6', text: 'text-[10px]', dot: 'h-1.5 w-1.5 border', verifiedIcon: 'h-3 w-3' },
  sm: { container: 'h-8 w-8', text: 'text-xs', dot: 'h-2 w-2 border', verifiedIcon: 'h-3.5 w-3.5' },
  md: { container: 'h-10 w-10', text: 'text-sm font-bold', dot: 'h-2.5 w-2.5 border-2', verifiedIcon: 'h-4 w-4' },
  lg: { container: 'h-12 w-12', text: 'text-base font-bold', dot: 'h-3 w-3 border-2', verifiedIcon: 'h-4.5 w-4.5' },
  xl: { container: 'h-16 w-16', text: 'text-xl font-bold', dot: 'h-3.5 w-3.5 border-2', verifiedIcon: 'h-5 w-5' },
  profile: { container: 'h-28 w-28 sm:h-32 sm:w-32', text: 'text-3xl font-bold', dot: 'h-5 w-5 border-4', verifiedIcon: 'h-6 w-6' },
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const fallbackColors = [
  'bg-[#202327] text-[#e7e9ea]',
  'bg-[#1d9bf0]/20 text-[#1d9bf0]',
  'bg-[#00ba7c]/20 text-[#00ba7c]',
  'bg-[#ffd400]/20 text-[#ffd400]',
  'bg-[#f91880]/20 text-[#f91880]',
]

function getColorForName(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return fallbackColors[Math.abs(hash) % fallbackColors.length]
}

export function Avatar({
  src,
  alt,
  size = 'md',
  online,
  story,
  storySeen,
  verified,
  verifiedType = 'blue',
  className,
}: AvatarProps) {
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
          <div className="h-full w-full rounded-full bg-black" />
        </div>
      )}

      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn(styles.container, 'rounded-full object-cover relative z-10 bg-[#16181c]')}
        />
      ) : (
        <div
          className={cn(
            styles.container,
            'rounded-full flex items-center justify-center relative z-10 border border-[#2f3336]',
            getColorForName(alt || 'User'),
          )}
        >
          <span className={styles.text}>{getInitials(alt || 'User')}</span>
        </div>
      )}

      {online !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-black z-20',
            styles.dot,
            online ? 'bg-[#00ba7c]' : 'bg-[#71767b]',
          )}
        />
      )}

      {verified && (
        <span
          className={cn(
            'absolute -top-0.5 -right-0.5 z-20 rounded-full bg-black p-0.5',
            verifiedType === 'gold' ? 'text-[#ffd400]' : 'text-[#1d9bf0]',
          )}
          title={verifiedType === 'gold' ? 'Verified Organization' : 'Verified Account'}
        >
          <svg className={styles.verifiedIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.96-4.96 1.41 1.42-6.37 6.37z" />
          </svg>
        </span>
      )}
    </div>
  )
}
