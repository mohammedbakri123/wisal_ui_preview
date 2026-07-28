import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { Input } from '@/core/components/ui/Input'
import { Button } from '@/core/components/ui/Button'
import { Avatar } from '@/core/components/ui/Avatar'

interface ProfileFormProps {
  onSubmit: (data: { name: string; avatar?: File; bio?: string }) => Promise<void>
  isLoading?: boolean
  error?: string | null
}

export function ProfileForm({ onSubmit, isLoading, error }: ProfileFormProps) {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    await onSubmit({
      name: name.trim(),
      ...(avatarFile ? { avatar: avatarFile } : {}),
      ...(bio.trim() ? { bio: bio.trim() } : {}),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
      <div className="text-center lg:text-left">
        <h2 className="font-serif italic text-[1.6rem] sm:text-[1.8rem] leading-tight text-foreground tracking-tight">
          Create your profile
        </h2>
        <p className="mt-2 text-sm text-muted-foreground/60 leading-relaxed">
          Tell us a bit about yourself
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-accent/20 via-accent/5 to-transparent" />

      {/* Avatar upload */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative group cursor-pointer"
        >
          <Avatar src={avatarPreview} alt={name || 'Avatar'} size="xl" />
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
        <span className="text-xs text-muted-foreground/50">Tap to add a photo</span>
      </div>

      <Input
        label="Display name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        className="bg-surface/30 border-border-light/10 focus:border-accent/40"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bio" className="text-sm font-medium text-muted-foreground">
          Bio <span className="text-muted-foreground/40 font-normal">(optional)</span>
        </label>
        <textarea
          id="bio"
          placeholder="A short bio about yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full rounded-xl bg-surface/30 border border-border-light/10 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/5 px-4 py-2.5 rounded-xl border border-destructive/10">
          {error}
        </p>
      )}

      <Button type="submit" loading={isLoading} className="w-full h-12 rounded-xl text-sm font-semibold">
        Get started
      </Button>
    </form>
  )
}
