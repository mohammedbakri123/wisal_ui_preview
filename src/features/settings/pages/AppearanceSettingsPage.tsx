import { BackButton } from '@/core/components/ui/BackButton'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { useTheme, type AccentColor, type BubbleStyle, type ChatBackground, type ChatFontSize } from '@/app/providers/ThemeProvider'
import { ROUTES } from '@/core/utils/routes'

const ACCENT_PREVIEW: Record<AccentColor, { bg: string; ring: string }> = {
  green: { bg: '#0ea583', ring: 'ring-green-500' },
  blue: { bg: '#3b82f6', ring: 'ring-blue-500' },
  purple: { bg: '#8b5cf6', ring: 'ring-purple-500' },
  orange: { bg: '#f59e0b', ring: 'ring-amber-500' },
  pink: { bg: '#ec4899', ring: 'ring-pink-500' },
}

export default function AppearanceSettingsPage() {
  const { accentColor, setAccentColor, bubbleStyle, chatBackground, chatFontSize, setBubbleStyle, setChatBackground, setChatFontSize } = useTheme()

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
        
        {/* Bubble shape */}
        <section className="bg-surface rounded-2xl border border-border-light/50 overflow-hidden">
          <div className="p-4 border-b border-border-light/30">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bubble shape</h3>
          </div>
          <OptionGrid options={[
            { value: 'rounded', label: 'Rounded', copy: 'Soft corners for everyday chat.' },
            { value: 'sharp', label: 'Sharp', copy: 'Crisp, squared conversation blocks.' },
            { value: 'compact', label: 'Compact', copy: 'Tighter bubbles for dense threads.' },
          ]} value={bubbleStyle} onChange={(value) => setBubbleStyle(value as BubbleStyle)} />
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

        {/* Chat background */}
        <section className="bg-surface rounded-2xl border border-border-light/50 overflow-hidden">
          <div className="p-4 border-b border-border-light/30">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chat background</h3>
          </div>
          <div className="p-3 space-y-2">
            {patterns.map((pat) => (
              <button
                key={pat.id}
                onClick={() => setChatBackground(pat.id as ChatBackground)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors cursor-pointer text-left ${
                  chatBackground === pat.id
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-background border-border-light/40 text-foreground hover:bg-surface-hover'
                }`}
              >
                <span className="text-sm font-medium">{pat.label}</span>
                {chatBackground === pat.id && (
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-surface rounded-2xl border border-border-light/50 overflow-hidden">
          <div className="p-4 border-b border-border-light/30">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message text size</h3>
          </div>
          <OptionGrid options={[
            { value: 'small', label: 'Small', copy: 'More messages in view.' },
            { value: 'standard', label: 'Standard', copy: 'Balanced everyday reading.' },
            { value: 'large', label: 'Large', copy: 'More comfortable reading.' },
          ]} value={chatFontSize} onChange={(value) => setChatFontSize(value as ChatFontSize)} />
        </section>

        {/* Live preview note */}
        <p className="text-center text-[10px] text-muted-foreground/40 pb-4">
          Changes apply instantly ✨
        </p>
      </PageContainer>
    </div>
  )
}

function OptionGrid({ options, value, onChange }: { options: Array<{ value: string; label: string; copy: string }>; value: string; onChange: (value: string) => void }) {
  return <div className="grid gap-2 p-3">{options.map((option) => <button key={option.value} type="button" onClick={() => onChange(option.value)} className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors cursor-pointer ${value === option.value ? 'border-accent bg-accent/10' : 'border-border-light/40 hover:bg-surface-hover'}`}><span><span className={`block text-sm font-medium ${value === option.value ? 'text-accent' : 'text-foreground'}`}>{option.label}</span><span className="mt-1 block text-xs text-muted-foreground/70">{option.copy}</span></span>{value === option.value && <span className="text-accent">✓</span>}</button>)}</div>
}
