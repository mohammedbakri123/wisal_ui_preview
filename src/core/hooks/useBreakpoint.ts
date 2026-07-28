import { useMediaQuery } from './useMediaQuery'

export function useBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px)')

  if (isDesktop) return 'desktop'
  if (isTablet) return 'tablet'
  return 'mobile'
}
