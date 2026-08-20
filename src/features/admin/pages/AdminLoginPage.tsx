import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAdminAuth } from '@/app/providers/useAdminAuth'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAdminAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const from = (location.state as { from?: string } | null)?.from ?? ROUTES.ADMIN.ROOT

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (login(username, password)) navigate(from, { replace: true })
    else setError('بيانات اعتماد الإدارة غير صحيحة.')
  }

  return <div className="flex min-h-dvh items-center justify-center bg-black px-4 text-[#e7e9ea]"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-[#2f3336] bg-[#16181c] p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1d9bf0]">وصال / الإدارة</p><h1 className="mt-3 text-2xl font-bold">تسجيل دخول غرفة التحكم</h1><p className="mt-2 text-sm leading-relaxed text-[#71767b]">هذه البوابة تستخدم اسم مستخدم وكلمة مرور منفصلين عن تطبيق المستخدمين.</p><label className="mt-6 block text-xs font-bold text-[#71767b]">اسم المستخدم<input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" className="mt-2 h-11 w-full rounded-full border border-transparent bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0] focus:bg-black" /></label><label className="mt-4 block text-xs font-bold text-[#71767b]">كلمة المرور<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" className="mt-2 h-11 w-full rounded-full border border-transparent bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none focus:border-[#1d9bf0] focus:bg-black" /></label>{error && <p className="mt-4 rounded-xl border border-[#f4212e]/30 bg-[#f4212e]/10 px-3 py-2 text-sm text-[#f4212e]">{error}</p>}<Button type="submit" className="mt-6 w-full">تسجيل الدخول</Button><p className="mt-4 text-center text-xs text-[#71767b]">وصول التطوير: <span className="font-mono text-[#e7e9ea]">admin / admin</span></p></form></div>
}
