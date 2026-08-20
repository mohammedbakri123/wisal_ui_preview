import { useState } from 'react'
import { useParams } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { channelPosts } from '../data'
import { useChannels } from '../context/useChannels'

interface ManagedPost { id: string; body: string; pinned: boolean }

export default function ChannelPostsPage() {
  const { channelId } = useParams()
  const { channels } = useChannels()
  const channel = channels.find((item) => item.id === channelId) ?? channels[0]
  const [posts, setPosts] = useState<ManagedPost[]>(() => {
    const initialPosts = channel.id.startsWith('channel-')
      ? (channel.lastPost ? [channel.lastPost] : [])
      : channelPosts
    return initialPosts.map((body, index) => ({ id: `post-${index}`, body, pinned: index === 0 }))
  })
  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  function savePost() {
    const body = draft.trim()
    if (!body) return
    if (editingId) {
      setPosts((current) => current.map((post) => post.id === editingId ? { ...post, body } : post))
    } else {
      setPosts((current) => [{ id: `post-${Date.now()}`, body, pinned: false }, ...current])
    }
    setDraft('')
    setEditingId(null)
  }

  function editPost(post: ManagedPost) { setEditingId(post.id); setDraft(post.body) }

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PageContainer className="w-full px-4 pt-3 pb-8">
        <div className="mx-auto max-w-2xl">
          <BackButton to={`/channels/${channel.id}/details`} />
          <header className="mb-6 mt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">{channel.name}</p>
            <h1 className="mt-1 text-2xl font-bold">Manage posts</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#71767b]">Publish updates and keep the channel feed focused for subscribers.</p>
          </header>

          <section className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-4">
            <h2 className="text-[15px] font-bold">{editingId ? 'Edit post' : 'Create a post'}</h2>
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Share an update with subscribers" rows={4} className="mt-3 w-full resize-none rounded-xl border border-[#2f3336] bg-[#202327] p-3 text-sm text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0]" />
            <div className="mt-3 flex justify-end gap-2">
              {editingId && <Button size="sm" variant="ghost" onClick={() => { setEditingId(null); setDraft('') }}>Cancel</Button>}
              <Button size="sm" onClick={savePost} disabled={!draft.trim()}>{editingId ? 'Save changes' : 'Publish post'}</Button>
            </div>
          </section>

          <section className="mt-6 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">
            <div className="border-b border-[#2f3336] p-4"><h2 className="text-[15px] font-bold">Published posts <span className="ml-1 font-normal text-[#71767b]">{posts.length}</span></h2></div>
            {posts.map((post) => (
              <article key={post.id} className="border-b border-[#2f3336] p-4 last:border-b-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0"><div className="flex items-center gap-2">{post.pinned && <span className="text-xs font-bold text-[#1d9bf0]">Pinned</span>}<span className="text-xs text-[#71767b]">Published now</span></div><p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#e7e9ea]">{post.body}</p></div>
                  <div className="flex shrink-0 gap-1">
                    <Button size="sm" variant="ghost" onClick={() => setPosts((current) => current.map((item) => ({ ...item, pinned: item.id === post.id })))}>{post.pinned ? 'Unpin' : 'Pin'}</Button>
                    <Button size="sm" variant="ghost" onClick={() => editPost(post)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => setPosts((current) => current.filter((item) => item.id !== post.id))}>Delete</Button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </PageContainer>
    </div>
  )
}
