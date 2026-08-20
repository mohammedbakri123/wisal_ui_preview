const relativeFormatter = new Intl.RelativeTimeFormat('ar', { numeric: 'auto', style: 'short' })

export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const target = typeof date === 'string' ? new Date(date) : date
  const diffMs = now.getTime() - target.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return relativeFormatter.format(Math.round(-diffSec), 'second')
  if (diffMin < 60) return relativeFormatter.format(Math.round(-diffMin), 'minute')
  if (diffHour < 24) return relativeFormatter.format(Math.round(-diffHour), 'hour')
  if (diffDay < 7) return relativeFormatter.format(Math.round(-diffDay), 'day')
  return target.toLocaleDateString('ar', { month: 'short', day: 'numeric' })
}

export function formatMessageTime(date: Date | string): string {
  const target = typeof date === 'string' ? new Date(date) : date
  return target.toLocaleTimeString('ar', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatPhone(identifier: string): string {
  if (identifier.startsWith('+')) {
    return identifier.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d+)/, '$1 $2 $3 $4')
  }
  return identifier
}

export function maskIdentifier(identifier: string): string {
  if (identifier.includes('@')) {
    const [local, domain] = identifier.split('@')
    const masked = local[0] + '***' + local[local.length - 1]
    return `${masked}@${domain}`
  }
  return identifier.replace(/(\+\d{2})\d+(\d{4})/, '$1****$2')
}