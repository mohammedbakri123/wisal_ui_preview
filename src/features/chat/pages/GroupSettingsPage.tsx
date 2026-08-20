import { useState } from 'react'
import { useParams } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { Toggle } from '@/core/components/ui/Toggle'
import { mockConversations } from '@/mocks/data/conversations'

export default function GroupSettingsPage() {
  const { groupId } = useParams()
  const group = mockConversations.find((conversation) => conversation.id === groupId) ?? mockConversations.find((conversation) => conversation.type === 'group') ?? mockConversations[0]
  const [membersCanPost, setMembersCanPost] = useState(true)
  const [membersCanEdit, setMembersCanEdit] = useState(false)
  const [membersCanInvite, setMembersCanInvite] = useState(true)
  const [groupAlerts, setGroupAlerts] = useState(true)

  return <div className="flex h-full flex-col overflow-hidden bg-black text-[#e7e9ea]"><PageContainer className="w-full max-w-xl px-3 pt-3 sm:px-4 sm:pt-4"><BackButton to={`/home/g/${group.id}/details`} label="تفاصيل المجموعة" /><div className="mt-3"><p className="text-xs font-bold uppercase tracking-wider text-[#71767b]">ضوابط المسؤول</p><h1 className="mt-1 text-[20px] font-bold">{group.name} الإعدادات</h1></div><section className="mt-4 overflow-hidden rounded-2xl border border-[#2f3336] bg-[#16181c]"><SettingsRow label="يمكن للأعضاء إرسال الرسائل" description="السماح للأعضاء العاديين بالنشر في المجموعة." checked={membersCanPost} onChange={setMembersCanPost} /><SettingsRow label="يمكن للأعضاء تعديل معلومات المجموعة" description="السماح للأعضاء بتغيير الاسم أو الصورة." checked={membersCanEdit} onChange={setMembersCanEdit} /><SettingsRow label="يمكن للأعضاء دعوة الآخرين" description="السماح للأعضاء بإضافة أشخاص من جهات اتصالهم." checked={membersCanInvite} onChange={setMembersCanInvite} /><SettingsRow label="إشعارات المجموعة" description="استقبال تنبيهات لنشاط هذه المجموعة." checked={groupAlerts} onChange={setGroupAlerts} /></section><p className="mt-3 text-xs leading-relaxed text-[#71767b]">تنطبق التغييرات على جلسة النموذج الأولي هذه. تتبع اختيارات الصلاحيات قواعد المجموعة في قصة المستخدم.</p></PageContainer></div>
}

function SettingsRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <div className="flex items-center justify-between gap-4 border-b border-[#2f3336] px-4 py-3.5 last:border-b-0"><div className="min-w-0"><p className="text-[15px] font-bold">{label}</p><p className="mt-0.5 text-xs leading-relaxed text-[#71767b]">{description}</p></div><Toggle checked={checked} onChange={onChange} label={label} /></div>
}
