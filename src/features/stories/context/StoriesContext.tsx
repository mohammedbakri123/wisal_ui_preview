import { type ReactNode } from 'react'
import { useStories } from '@/features/stories/hooks/useStories'
import { StoriesContext } from './stories-context'

export function StoriesProvider({ children }: { children: ReactNode }) {
  const stories = useStories()

  return (
    <StoriesContext.Provider value={stories}>
      {children}
    </StoriesContext.Provider>
  )
}
