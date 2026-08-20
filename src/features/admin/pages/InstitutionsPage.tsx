import { useState } from 'react'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'

const initialRequests = [
  { id: 'req-1', name: 'مختبرات نجم الشمال', submitted: 'اليوم', status: 'قيد الانتظار' },
  { id: 'req-2', name: 'تجمع الملاحظات الميدانية', submitted: 'أمس', status: 'قيد الانتظار' },
  { id: 'req-3', name: 'أطلس للتعليم', submitted: 'منذ 3 أيام', status: 'قيد الانتظار' },
]

export default function InstitutionsPage() {
  const [requests, setRequests] = useState(initialRequests)
  const resolve = (id: string, status: string) => setRequests((current) => current.map((request) => request.id === id ? { ...request, status } : request))
  const remove = (id: string) => setRequests((current) => current.filter((request) => request.id !== id))

  return <div className="flex h-full flex-col bg-black"><PageContainer className="w-full max-w-3xl px-3 pt-3 sm:px-5"><BackButton to={ROUTES.ADMIN.ROOT} label="نظرة عامة" /><div className="mt-3"><p className="text-xs font-bold uppercase tracking-wider text-[#71767b]">سير عمل التحقق</p><h1 className="mt-1 text-2xl font-bold text-[#e7e9ea]">طلبات المؤسسات</h1><p className="mt-1 text-sm text-[#71767b]">راجع تفاصيل المؤسسات المقدمة قبل التحقق.</p></div><div className="mt-5 space-y-3">{requests.map((request) => <article key={request.id} className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-4"><div className="flex items-start justify-between gap-4"><div><h2 className="font-bold text-[#e7e9ea]">{request.name}</h2><p className="mt-1 text-xs text-[#71767b]">تم التقديم {request.submitted}</p></div><span className={`text-xs font-bold ${request.status === 'تمت الموافقة' ? 'text-[#00ba7c]' : request.status === 'مرفوض' ? 'text-[#f4212e]' : request.status === 'موقوف' ? 'text-[#ffd400]' : 'text-[#ffd400]'}`}>{request.status}</span></div><div className="mt-4 flex flex-wrap gap-2">{request.status === 'قيد الانتظار' && <><Button size="sm" onClick={() => resolve(request.id, 'تمت الموافقة')}>موافقة</Button><Button size="sm" variant="danger" onClick={() => resolve(request.id, 'مرفوض')}>رفض</Button></>}{request.status === 'تمت الموافقة' && <Button size="sm" variant="danger" onClick={() => resolve(request.id, 'موقوف')}>إيقاف المؤسسة</Button>}{request.status === 'موقوف' && <Button size="sm" onClick={() => resolve(request.id, 'تمت الموافقة')}>استعادة المؤسسة</Button>}{request.status !== 'قيد الانتظار' && <Button size="sm" variant="ghost" onClick={() => remove(request.id)}>حذف السجل</Button>}</div></article>)}</div>{requests.length === 0 && <p className="mt-6 text-center text-sm text-[#71767b]">لا توجد سجلات مؤسسات متبقية.</p>}</PageContainer></div>
}
