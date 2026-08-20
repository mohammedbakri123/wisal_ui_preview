import { useContext } from 'react'
import { StoriesContext } from './stories-context'

export function useStoriesContext() {
  const ctx = useContext(StoriesContext)
  if (!ctx) throw new Error('useStoriesContext must be used within StoriesProvider')
  return ctx
}
