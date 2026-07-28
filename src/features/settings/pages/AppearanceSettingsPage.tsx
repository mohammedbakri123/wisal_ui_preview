import { useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { useTheme, type AccentColor } from '@/app/providers/ThemeProvider'
import { ROUTES } from '@/core/utils/routes'

const ACCENT_PREVIEW: Record<AccentColor, { bg: string; ring: string }> = {
  green: { bg: '#0ea583', ring: 'ring-green-500' },
  blue: { bg: '#3b82f6', ring: 'ring-blue-500' },
  purple: { bg: '#8b5cf6', ring: 'ring-purple-500' },
  orange: { bg: '#f59e0b', ring: 'ring-amber-500' },
  pink: { bg: '#ec4899', ring: 'ring-pink-500' },
}

export default function AppearanceSettingsPage() {
  const { theme, accentColor, setTheme, setAccentColor } = useTheme()
  const [backgroundPattern, setBackgroundPattern] = useState('classic')

  const patterns = [
    { id: 'classic', label: 'Classic Grid' },
    { id: 'dots', label: 'Polka Dots' },
    { id: 'solid', label: 'Solid' },
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      <PageContainer className="max-w-md mx-auto w-full space-y-5 pt-3 sm:pt-4">
        <div className="-mt-1">
          <BackButton to={ROUTES.SETTINGS.ROOT} label="Settings" />
        </div>
        
        {/* Theme selector with preview */}
        <section className="bg-surface rounded-2xl border border-border-light/50 overflow-hidden">
          <div className="p-4 border-b border-border-light/30">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Display Mode</h3>
          </div>
          <div className="grid grid-cols-2 gap-0">
            <button
              onClick={() => setTheme('light')}
              className={`p-5 flex flex-col items-center gap-3 transition-all cursor-pointer border-r border-border-light/30 ${
                theme === 'light' ? 'bg-accent/[0.03]' : 'hover:bg-surface-hover'
              }`}
            >
              {/* Light mode preview */}
              <div className="w-full h-20 rounded-xl bg-white border border-gray-200 overflow-hidden relative">
                <div className="h-5 bg-gray-100 border-b border-gray-200" />
                <div className="p-2 space-y-1.5">
                  <div className="h-2 w-16 bg-gray-200 rounded" />
                  <div className="h-2 w-24 bg-gray-100 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  theme === 'light' ? 'border-accent' : 'border-muted-foreground/40'
                }`}>
                  {theme === 'light' && <div className="w-2 h-2 rounded-full bg-accent" />}
                </div>
                <span className={`text-xs font-semibold ${theme === 'light' ? 'text-accent' : 'text-muted-foreground'}`}>
                  Light
                </span>
              </div>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-5 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                theme === 'dark' ? 'bg-accent/[0.03]' : 'hover:bg-surface-hover'
              }`}
            >
              {/* Dark mode preview */}
              <div className="w-full h-20 rounded-xl bg-[#1a1a2e] border border-[#2a2a3e] overflow-hidden relative">
                <div className="h-5 bg-[#252540] border-b border-[#2a2a3e]" />
                <div className="p-2 space-y-1.5">
                  <div className="h-2 w-16 bg-[#2a2a3e] rounded" />
                  <div className="h-2 w-24 bg-[#222238] rounded" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  theme === 'dark' ? 'border-accent' : 'border-muted-foreground/40'
                }`}>
                  {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-accent" />}
                </div>
                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-accent' : 'text-muted-foreground'}`}>
                  Dark
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* Accent color picker */}
        <section className="bg-surface rounded-2xl border border-border-light/50 overflow-hidden">
          <div className="p-4 border-b border-border-light/30">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Accent Color</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
              {(Object.keys(ACCENT_PREVIEW) as AccentColor[]).map((color) => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all cursor-pointer ${
                    accentColor === color 
                      ? 'scale-110 ring-2 ring-offset-2 ring-offset-surface ring-accent shadow-lg' 
                      : 'hover:scale-105 ring-1 ring-white/10'
                  }`}
                  style={{ backgroundColor: ACCENT_PREVIEW[color].bg }}
                  title={color.charAt(0).toUpperCase() + color.slice(1)}
                >
                  {accentColor === color && (
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <p className="text-center text-[10px] text-muted-foreground/50 mt-3 capitalize">
              Current: {accentColor}
            </p>
          </div>
        </section>

        {/* Chat background pattern */}
        <section className="bg-surface rounded-2xl border border-border-light/50 overflow-hidden">
          <div className="p-4 border-b border-border-light/30">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chat Background</h3>
          </div>
          <div className="p-3 space-y-2">
            {patterns.map((pat) => (
              <button
                key={pat.id}
                onClick={() => setBackgroundPattern(pat.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors cursor-pointer text-left ${
                  backgroundPattern === pat.id
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-background border-border-light/40 text-foreground hover:bg-surface-hover'
                }`}
              >
                <span className="text-sm font-medium">{pat.label}</span>
                {backgroundPattern === pat.id && (
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Live preview note */}
        <p className="text-center text-[10px] text-muted-foreground/40 pb-4">
          Changes apply instantly ✨
        </p>
      </PageContainer>
    </div>
  )
}
