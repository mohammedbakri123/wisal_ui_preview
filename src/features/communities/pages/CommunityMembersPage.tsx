import { useNavigate, useParams } from 'react-router'
import { Avatar } from '@/core/components/ui/Avatar'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { mockUsers } from '@/mocks/data/users'
import { communities } from '../data'

export default function CommunityMembersPage() {
  const { communityId } = useParams()
  const navigate = useNavigate()
  const community = communities.find((item) => item.id === communityId) ?? communities[0]
  return <div className="flex h-full flex-col bg-black text-[#e7e9ea]"><PageContainer className="w-full px-4 pt-3 pb-8 sm:px-6"><div className="mx-auto max-w-2xl"><BackButton to={`/communities/${community.id}/overview`} /><header className="mt-2 border-b border-[#2f3336] pb-5"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1d9bf0]">{community.name}</p><h1 className="mt-2 text-2xl font-bold">الأعضاء</h1><p className="mt-2 text-sm leading-relaxed text-[#71767b]">استعرض أدوار الأعضاء والحضور ونقاط الدخول للرسائل المباشرة.</p></header><section className="mt-6 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">{mockUsers.map((user, index) => <button type="button" key={user.id} onClick={() => navigate(`/profile/${user.name.toLowerCase().replace(/\s+/g, '')}`)} className="flex w-full items-center gap-3 border-b border-[#2f3336] p-4 text-start transition-colors last:border-b-0 hover:bg-white/[0.03] cursor-pointer"><Avatar src={user.avatar} alt={user.name} size="md" online={user.isOnline} /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{user.name}</span><span className="mt-1 block truncate text-xs text-[#71767b]">{user.bio ?? user.email ?? 'عضو وصال'}</span></span><span className="rounded-full bg-[#1d9bf0]/10 px-2.5 py-1 text-[10px] font-bold text-[#1d9bf0]">{index === 0 ? 'مشرف' : 'عضو'}</span></button>)}</section></div></PageContainer></div>
}
