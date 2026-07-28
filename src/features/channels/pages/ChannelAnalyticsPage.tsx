import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { channels } from '../data'

export default function ChannelAnalyticsPage() {
  const { channelId } = useParams()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]

  return (
    <FeatureScaffold
      title="Channel Analytics"
      eyebrow={channel.name}
      description="Track subscriber growth, post engagement, and top-performing updates."
      backTo={`/channels/${channel.id}/details`}
      stats={[
        { label: 'Reach', value: '72%' },
        { label: 'Growth', value: '+8.4%' },
        { label: 'Reactions', value: '1.8k' },
        { label: 'Replies', value: '342' },
      ]}
    />
  )
}
