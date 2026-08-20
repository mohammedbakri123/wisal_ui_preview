import { useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'

export default function StorageDataPage() {
  const [images, setImages] = useState(true)
  const [files, setFiles] = useState(false)
  const [cacheCleared, setCacheCleared] = useState(false)

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]"><PageContainer className="w-full px-4 pt-3 pb-8"><div className="mx-auto max-w-xl"><BackButton to={ROUTES.SETTINGS.ROOT} /><header className="mb-6 mt-2"><p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">Settings</p><h1 className="mt-1 text-2xl font-bold">Storage & data</h1><p className="mt-2 text-sm leading-relaxed text-[#71767b]">Control cached media and automatic downloads on this device.</p></header><div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]">{[['Media cache', '248 MB'], ['Documents', '41 MB'], ['Network', '1.2 GB'], ['Backups', '3']].map(([label, value]) => <div key={label} className="border-b border-r border-[#2f3336] p-4 last:border-r-0"><p className="text-xs text-[#71767b]">{label}</p><p className="mt-1 text-base font-bold">{cacheCleared && label === 'Media cache' ? '0 MB' : value}</p></div>)}</div><section className="mt-6 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]"><ToggleRow label="Auto-download images" description="Download images on Wi-Fi and cellular." checked={images} onChange={setImages} /><ToggleRow label="Auto-download files" description="Download files only on Wi-Fi." checked={files} onChange={setFiles} /><div className="flex items-center justify-between gap-4 border-t border-[#2f3336] p-4"><div><p className="text-sm font-bold">Clear media cache</p><p className="mt-1 text-xs text-[#71767b]">Remove cached media from this device.</p></div><Button size="sm" variant="secondary" onClick={() => setCacheCleared(true)}>{cacheCleared ? 'Cleared' : 'Clear'}</Button></div></section></div></PageContainer></div>
  )
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex items-center justify-between gap-4 border-b border-[#2f3336] p-4 last:border-b-0"><div><p className="text-sm font-bold">{label}</p><p className="mt-1 text-xs text-[#71767b]">{description}</p></div><Toggle checked={checked} onChange={onChange} label={label} /></div>
}
