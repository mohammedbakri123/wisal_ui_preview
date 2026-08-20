import { useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { ROUTES } from '@/core/utils/routes'

export default function DevicesPage() {
  const [sessions, setSessions] = useState([
    { id: 'current', title: 'Chrome on Linux', description: 'Current session in Asia/Aden timezone.', meta: 'Current' },
    { id: 'iphone', title: 'Safari on iPhone', description: 'Last active 2 days ago.', meta: 'Mobile' },
  ])

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PageContainer className="w-full px-4 pt-3 pb-8">
        <div className="mx-auto max-w-xl">
          <BackButton to={ROUTES.SETTINGS.ROOT} />
          <header className="mb-6 mt-2"><p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">Security</p><h1 className="mt-1 text-2xl font-bold">Active devices</h1><p className="mt-2 text-sm leading-relaxed text-[#71767b]">Review where your account is signed in and end sessions you no longer recognize.</p></header>
          <section className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
            {sessions.map((session) => <div key={session.id} className="flex items-center gap-4 border-b border-[#2f3336] p-4 last:border-b-0"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1d9bf0]/10 text-[#1d9bf0]">{session.id === 'current' ? '⌂' : '↗'}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{session.title}</p><p className="mt-0.5 text-xs text-[#71767b]">{session.description}</p></div>{session.id === 'current' ? <span className="text-xs font-bold text-[#00ba7c]">{session.meta}</span> : <Button size="sm" variant="danger" onClick={() => setSessions((current) => current.filter((item) => item.id !== session.id))}>End session</Button>}</div>)}
            {sessions.length === 1 && <p className="p-4 text-sm text-[#71767b]">No other active sessions.</p>}
          </section>
        </div>
      </PageContainer>
    </div>
  )
}
