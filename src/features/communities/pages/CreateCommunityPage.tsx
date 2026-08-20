import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { ROUTES } from '@/core/utils/routes'
import { useCommunities } from '../context/useCommunities'

const inputClass = 'mt-2 h-11 w-full rounded-xl border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0] focus:ring-2 focus:ring-[#1d9bf0]/20'

export default function CreateCommunityPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [created, setCreated] = useState(false)
  const { addCommunity } = useCommunities()

  function createCommunity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim()) return
    addCommunity(name.trim(), description.trim(), visibility)
    setCreated(true)
  }

  if (created) {
    return (
      <div className="flex h-full items-center justify-center bg-black px-4 text-[#e7e9ea]">
        <section className="w-full max-w-md rounded-2xl border border-[#2f3336] bg-[#16181c] p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00ba7c]/15 text-[#00ba7c]">✓</div>
          <h1 className="mt-4 text-xl font-bold">تم إنشاء المجتمع</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#71767b]">{name} جاهز لأعضائه ومحادثاته الأولى.</p>
          <Button className="mt-6 w-full" onClick={() => navigate(ROUTES.COMMUNITY.ROOT)}>الذهاب إلى المجتمعات</Button>
        </section>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PageContainer className="w-full px-4 pt-3 pb-8">
        <div className="mx-auto max-w-2xl">
          <BackButton to={ROUTES.COMMUNITY.ROOT} />
          <header className="mb-6 mt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">مساحة عمل جديدة</p>
            <h1 className="mt-1 text-2xl font-bold">إنشاء مجتمع</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#71767b]">اجمع المجموعات والقنوات والأشخاص ذات الصلة معًا في مساحة واحدة مركزة.</p>
          </header>
          <form onSubmit={createCommunity} className="space-y-5 rounded-2xl border border-[#2f3336] bg-[#16181c] p-4 sm:p-6">
            <label className="block text-sm font-bold">اسم المجتمع<input value={name} onChange={(event) => setName(event.target.value)} className={inputClass} placeholder="مثال: بناة المنتجات" required /></label>
            <label className="block text-sm font-bold">الوصف<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} className={`${inputClass} h-auto resize-none py-3`} placeholder="ما الغرض من هذا المجتمع؟" /></label>
            <fieldset>
              <legend className="text-sm font-bold">الرؤية</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {[
                  { value: 'public', label: 'عام', copy: 'يمكن لأي شخص اكتشافه وطلب الانضمام.' },
                  { value: 'private', label: 'خاص', copy: 'يمكن للأشخاص المدعوين فقط العثور على المجتمع.' },
                ].map((option) => (
                  <label key={option.value} className={`cursor-pointer rounded-xl border p-3 transition-colors ${visibility === option.value ? 'border-[#1d9bf0] bg-[#1d9bf0]/10' : 'border-[#2f3336] hover:bg-white/[0.03]'}`}>
                    <input type="radio" name="visibility" value={option.value} checked={visibility === option.value} onChange={(event) => setVisibility(event.target.value)} className="sr-only" />
                    <span className="text-sm font-bold">{option.label}</span><span className="mt-1 block text-xs leading-relaxed text-[#71767b]">{option.copy}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <Button type="submit" className="w-full" disabled={!name.trim()}>إنشاء المجتمع</Button>
          </form>
        </div>
      </PageContainer>
    </div>
  )
}
