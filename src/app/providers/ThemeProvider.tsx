/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { STORAGE_KEYS } from '@/core/utils/constants'

export type Theme = 'dark' | 'light'
export type AccentColor = 'green' | 'blue' | 'purple' | 'orange' | 'pink'

interface ThemeContextValue {
  theme: Theme
  accentColor: AccentColor
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  setAccentColor: (color: AccentColor) => void
}

const ACCENT_COLORS: Record<AccentColor, string> = {
  green: '#0ea583',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  orange: '#f59e0b',
  pink: '#ec4899',
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null
    return stored ?? 'dark'
  })

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.ACCENT) as AccentColor | null
    return stored ?? 'green'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.classList.add('theme-transition')
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
    
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 400)
    
    return () => clearTimeout(timeout)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    const accentValue = ACCENT_COLORS[accentColor]
    root.style.setProperty('--color-accent', accentValue)
    localStorage.setItem(STORAGE_KEYS.ACCENT, accentColor)
    
    // Sync browser theme-color meta tag for mobile browser UI
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
      metaTheme.setAttribute('content', accentValue)
    }
  }, [accentColor])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggleTheme = useCallback(() => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')), [])
  const setAccentColor = useCallback((color: AccentColor) => setAccentColorState(color), [])

  return (
    <ThemeContext.Provider value={{ theme, accentColor, toggleTheme, setTheme, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
