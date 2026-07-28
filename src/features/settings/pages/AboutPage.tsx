import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'

export default function AboutPage() {
  return (
    <FeatureScaffold
      title="About"
      description="Wisal frontend prototype built with React, Vite, TypeScript, Tailwind CSS, and MSW."
      backTo={ROUTES.SETTINGS.ROOT}
      stats={[
        { label: 'Version', value: '0.1.0' },
        { label: 'Build', value: 'Vite' },
        { label: 'UI', value: 'React' },
        { label: 'Mocking', value: 'MSW' },
      ]}
      sections={[
        {
          title: 'Legal',
          items: [
            { title: 'Terms of service', description: 'Placeholder route target for legal copy.' },
            { title: 'Privacy policy', description: 'Placeholder route target for data handling copy.' },
            { title: 'Open-source licenses', description: 'Runtime packages and third-party credits.' },
          ],
        },
      ]}
    />
  )
}
