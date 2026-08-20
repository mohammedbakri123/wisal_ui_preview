import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { ROUTES } from '@/core/utils/routes'

export default function SecuritySettingsPage() {
  const navigate = useNavigate()
  const [appLock, setAppLock] = useState(false)
  const [pin, setPin] = useState('')
  const [pinDraft, setPinDraft] = useState('')
  const [pinEditing, setPinEditing] = useState(false)

  function savePin() {
    if (pinDraft.length < 4) return
    setPin(pinDraft)
    setPinDraft('')
    setPinEditing(false)
  }

  return <div className="flex h-full flex-col bg-black text-[#e7e9ea]"><PageContainer className="w-full px-4 pt-3 pb-8"><div className="mx-auto max-w-xl"><BackButton to={ROUTES.SETTINGS.ROOT} /><header className="mb-6 mt-2"><p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">Account protection</p><h1 className="mt-1 text-2xl font-bold">Security</h1><p className="mt-2 text-sm leading-relaxed text-[#71767b]">Control app lock, your PIN, and the devices connected to your account.</p></header><section className="overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]"><div className="flex items-center justify-between gap-4 border-b border-[#2f3336] p-4"><div><p className="text-sm font-bold">App lock</p><p className="mt-1 text-xs text-[#71767b]">Require a PIN when Wisal is opened.</p></div><Toggle checked={appLock} onChange={setAppLock} label="App lock" /></div><div className="border-b border-[#2f3336] p-4"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-bold">PIN code</p><p className="mt-1 text-xs text-[#71767b]">{pin ? 'A PIN is configured on this device.' : 'No PIN configured.'}</p></div><Button size="sm" variant="secondary" onClick={() => setPinEditing((value) => !value)}>{pinEditing ? 'Cancel' : pin ? 'Change PIN' : 'Set PIN'}</Button></div>{pinEditing && <div className="mt-3 flex gap-2"><input type="password" inputMode="numeric" maxLength={6} value={pinDraft} onChange={(event) => setPinDraft(event.target.value.replace(/\D/g, ''))} placeholder="4–6 digits" className="h-10 min-w-0 flex-1 rounded-full border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0]" /><Button size="sm" onClick={savePin} disabled={pinDraft.length < 4}>Save PIN</Button></div>}</div><button type="button" onClick={() => navigate(ROUTES.SETTINGS.DEVICES)} className="flex w-full items-center justify-between p-4 text-left hover:bg-white/[0.03] cursor-pointer"><span><span className="block text-sm font-bold">Active devices</span><span className="mt-1 block text-xs text-[#71767b]">Review and end sessions connected to your account.</span></span><span className="text-xs font-bold text-[#1d9bf0]">Manage</span></button></section></div></PageContainer></div>
}
