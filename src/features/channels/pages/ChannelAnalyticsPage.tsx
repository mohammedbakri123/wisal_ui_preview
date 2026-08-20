import { useParams } from 'react-router'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { channels } from '../data'

export default function ChannelAnalyticsPage() {
  const { channelId } = useParams()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]

  return (
    <FeatureScaffold
      title="تحليلات القناة"
      eyebrow={channel.name}
      description="تتبع نمو المشتركين وتفاعل المنشورات وأفضل التحديثات أداءً."
      backTo={`/channels/${channel.id}/details`}
      stats={[
        { label: 'الوصول', value: '72%' },
        { label: 'النمو', value: '+8.4%' },
        { label: 'التفاعلات', value: '1.8k' },
        { label: 'الردود', value: '342' },
      ]}
    />
  )
}
