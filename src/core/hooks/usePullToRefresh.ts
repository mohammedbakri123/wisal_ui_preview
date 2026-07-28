import { useCallback, useEffect, useRef, useState } from 'react'

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void
  disabled?: boolean
  pullThreshold?: number
  maxPullDistance?: number
}

type PullState = 'idle' | 'pulling' | 'threshold-reached' | 'refreshing'

export function usePullToRefresh<T extends HTMLElement>({
  onRefresh,
  disabled = false,
  pullThreshold = 80,
  maxPullDistance = 120,
}: UsePullToRefreshOptions) {
  const [pullState, setPullState] = useState<PullState>('idle')
  const [pullDistance, setPullDistance] = useState(0)
  const startY = useRef(0)
  const currentY = useRef(0)
  const isPulling = useRef(false)
  const pullDistanceRef = useRef(0)
  const scrollEl = useRef<T | null>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled) return
    // Only activate if scrolled to top
    const el = scrollEl.current
    if (!el || el.scrollTop > 5) return

    startY.current = e.touches[0].clientY
    currentY.current = startY.current
    isPulling.current = true
  }, [disabled])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPulling.current || disabled) return
    currentY.current = e.touches[0].clientY
    const diff = currentY.current - startY.current

    if (diff <= 0) {
      isPulling.current = false
      setPullDistance(0)
      setPullState('idle')
      return
    }

    // Apply resistance for natural feel
    const resisted = Math.min(diff * 0.4, maxPullDistance)
    pullDistanceRef.current = resisted
    setPullDistance(resisted)

    if (resisted >= pullThreshold) {
      setPullState('threshold-reached')
    } else {
      setPullState('pulling')
    }
  }, [disabled, pullThreshold, maxPullDistance])

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling.current || disabled) return
    isPulling.current = false

    // Use ref for live pull distance to avoid stale closure
    const currentPull = pullDistanceRef.current

    if (currentPull >= pullThreshold) {
      setPullState('refreshing')
      setPullDistance(pullThreshold) // snap to threshold
      try {
        await onRefresh()
      } catch {
        // Refresh failed, just reset
      }
    }

    // Animate back to idle
    pullDistanceRef.current = 0
    setPullDistance(0)
    setPullState('idle')
  }, [disabled, pullThreshold, onRefresh])

  useEffect(() => {
    const el = scrollEl.current
    if (!el) return

    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchmove', handleTouchMove, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchmove', handleTouchMove)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  const setScrollRef = useCallback((el: T | null) => {
    scrollEl.current = el
  }, [])

  return {
    setScrollRef,
    pullState,
    pullDistance,
    pullProgress: pullDistance / pullThreshold,
  }
}
