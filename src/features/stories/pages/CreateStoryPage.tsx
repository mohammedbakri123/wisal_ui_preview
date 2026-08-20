import { useNavigate } from 'react-router'
import { useAuth } from '@/app/providers/AuthProvider'
import { StoryCreator } from '@/features/stories/components/StoryCreator'
import { useStoriesContext } from '@/features/stories/context/useStoriesContext'

export default function CreateStoryPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addStory } = useStoriesContext()
  const userName = user?.name ?? 'You'
  const userId = user?.id ?? '1'

  return (
    <div className="flex h-full items-center justify-center bg-black">
      <StoryCreator
        userName={userName}
        userAvatar={user?.avatar ?? null}
        onPublish={(content, backgroundColor, type, mediaUrl, privacy) => {
          addStory(userId, content, type, backgroundColor, mediaUrl, privacy)
          navigate('/stories')
        }}
        onClose={() => navigate('/stories')}
      />
    </div>
  )
}
