import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { MemberCard } from '@/core/components/shared/MemberCard'
import { mockUsers } from '@/mocks/data/users'
import { communities } from '../data'

export default function CommunityMembersPage() {
  const { communityId } = useParams()
  const navigate = useNavigate()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]

  return (
    <div className="flex h-full flex-col bg-background">
      <PageContainer className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
        <BackButton to={`/communities/${community.id}/overview`} />
        <div className="max-w-3xl mx-auto space-y-4">
          <section className="rounded-2xl border border-border-light/40 bg-surface p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">{community.name}</p>
            <h2 className="mt-2 text-lg sm:text-xl font-bold">Member directory</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80">
              Browse member roles, presence, and direct message entry points.
            </p>
          </section>
          <div className="grid gap-2 sm:grid-cols-2">
            {mockUsers.map((user, index) => (
              <MemberCard
                key={user.id}
                user={user}
                role={index === 0 ? 'Admin' : 'Member'}
                onClick={() => navigate('/home/c/c1')}
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
