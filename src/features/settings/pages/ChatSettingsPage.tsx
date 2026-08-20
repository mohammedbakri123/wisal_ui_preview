import { useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { ROUTES } from '@/core/utils/routes'

export default function ChatSettingsPage() {
  const [enterToSend, setEnterToSend] = useState(true)
  const [autoDownload, setAutoDownload] = useState(true)
  const [backupEnabled, setBackupEnabled] = useState(false)
  const [fontSize, setFontSize] = useState('Standard')

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]"><PageContainer className="w-full px-4 pt-3 pb-8"><div className="mx-auto max-w-xl"><BackButton to={ROUTES.SETTINGS.ROOT} /><header className="mb-6 mt-2"><p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">Settings</p><h1 className="mt-1 text-2xl font-bold">Chat settings</h1><p className="mt-2 text-sm leading-relaxed text-[#71767b]">Tune the composer, media downloads, appearance, and local backup preferences.</p></header><section className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]"><ToggleRow label="Enter to send" description="Send messages with Enter and insert line breaks with Shift+Enter." checked={enterToSend} onChange={setEnterToSend} /><ToggleRow label="Auto-download media" description="Download incoming images and videos automatically." checked={autoDownload} onChange={setAutoDownload} /><div className="flex items-center justify-between gap-4 border-t border-[#2f3336] p-4"><div><p className="text-sm font-bold">Font size</p><p className="mt-1 text-xs text-[#71767b]">Adjust text density in conversations.</p></div><select value={fontSize} onChange={(event) => setFontSize(event.target.value)} className="h-9 rounded-full border border-[#2f3336] bg-[#202327] px-3 text-xs text-[#e7e9ea] outline-none focus:border-[#1d9bf0]"><option>Compact</option><option>Standard</option><option>Large</option></select></div><div className="flex items-center justify-between gap-4 border-t border-[#2f3336] p-4"><div><p className="text-sm font-bold">Chat wallpaper</p><p className="mt-1 text-xs text-[#71767b]">Use the default low-contrast grid texture.</p></div><span className="text-xs text-[#71767b]">Default</span></div><ToggleRow label="Local chat backup" description="Keep a mock backup status ready for this device." checked={backupEnabled} onChange={setBackupEnabled} /></section></div></PageContainer></div>
  )
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex items-center justify-between gap-4 border-b border-[#2f3336] p-4"><div><p className="text-sm font-bold">{label}</p><p className="mt-1 text-xs text-[#71767b]">{description}</p></div><Toggle checked={checked} onChange={onChange} label={label} /></div>
}
