import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { StoryViewer } from '@/features/stories/components/StoryViewer'
import { useStoriesContext } from '@/features/stories/context/useStoriesContext'

export default function StoryViewerPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const started = useRef(false)
  const hasPlayed = useRef(false)
  const {
    storyGroups,
    activeStoryIndex,
    openStoryViewer,
    closeStoryViewer,
    goToNextStory,
    goToPrevStory,
    markCurrentAsViewed,
    reactToStory,
    deleteStory,
  } = useStoriesContext()
  const { user } = useAuth()
  const requestedUserId = searchParams.get('userId')

  useEffect(() => {
    if (started.current || storyGroups.length === 0) return
    started.current = true
    openStoryViewer(requestedUserId ?? storyGroups[0].userId)
  }, [openStoryViewer, requestedUserId, storyGroups])

  useEffect(() => {
    if (activeStoryIndex) {
      hasPlayed.current = true
    } else if (hasPlayed.current) {
      navigate('/stories')
    }
  }, [activeStoryIndex, navigate])

  function close() {
    closeStoryViewer()
    navigate('/stories')
  }

  return (
    <div className="flex h-full items-center justify-center bg-black">
      <StoryViewer
        storyGroups={storyGroups}
        activeIndex={activeStoryIndex}
        onNext={goToNextStory}
        onPrev={goToPrevStory}
        onClose={close}
        onMarkViewed={markCurrentAsViewed}
        onReact={reactToStory}
        currentUserId={user?.id ?? '1'}
        onReply={(content) => navigate('/home/c/c1', { state: { prefill: content } })}
        onDelete={deleteStory}
      />
    </div>
  )
}
