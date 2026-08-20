import { Outlet, useLocation } from 'react-router'
import { ROUTES } from '@/core/utils/routes'

export function AuthLayout() {
  const location = useLocation()
  const isSignUp = location.pathname === ROUTES.AUTH.SIGNUP

  return (
    <div className="flex min-h-dvh bg-black text-[#e7e9ea] selection:bg-[#1d9bf0] selection:text-white">
      <div className="flex w-full max-w-[1280px] mx-auto min-h-dvh">
        {/* Left branding panel (desktop only) */}
        <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-12 border-e border-[#2f3336]">
          <div className="max-w-md text-start flex flex-col items-start">
            {/* Iconic Wisal Logo */}
            <div className="w-24 h-24 rounded-full bg-[#1d9bf0] flex items-center justify-center text-black font-black text-5xl tracking-tighter mb-8 shadow-lg shadow-[#1d9bf0]/20">
              W
            </div>

            <h1 className="text-5xl font-black tracking-tight text-[#e7e9ea] mb-4">
              يحدث الآن
            </h1>

            <p className="text-2xl font-bold text-[#71767b] mb-10">
              انضم إلى وصال اليوم. تواصل سريع وخاص وقوي.
            </p>

            <div className="space-y-4 text-[15px] text-[#71767b]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#1d9bf0]/10 text-[#1d9bf0] flex items-center justify-center font-bold text-xs">
                  ✓
                </span>
                <span>مراسلة فردية وجماعية مشفرة طرفًا بطرف</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#1d9bf0]/10 text-[#1d9bf0] flex items-center justify-center font-bold text-xs">
                  ✓
                </span>
                <span>قنوات موثقة ومجموعات مجتمعية</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#1d9bf0]/10 text-[#1d9bf0] flex items-center justify-center font-bold text-xs">
                  ✓
                </span>
                <span>قصص حالة لمدة 25 ساعة بخصوصية دقيقة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-sm">
            {/* Mobile Logo */}
            <div className="lg:hidden flex flex-col items-center text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-[#1d9bf0] flex items-center justify-center text-black font-black text-2xl tracking-tighter mb-3 shadow-md shadow-[#1d9bf0]/20">
                W
              </div>
              <h1 className="text-2xl font-black text-[#e7e9ea]">Wisal</h1>
              <p className="text-sm text-[#71767b] mt-1">
                {isSignUp ? 'أنشئ حسابك' : 'سجّل دخولك إلى حسابك'}
              </p>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
