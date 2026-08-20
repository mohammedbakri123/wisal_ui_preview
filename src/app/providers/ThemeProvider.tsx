/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { STORAGE_KEYS } from '@/core/utils/constants'

export type Theme = 'dark' | 'light'
export type AccentColor = 'green' | 'blue' | 'purple' | 'orange' | 'pink'
export type BubbleStyle = 'rounded' | 'sharp' | 'compact'
export type ChatBackground = 'classic' | 'dots' | 'solid'
export type ChatFontSize = 'small' | 'standard' | 'large'

interface ThemeContextValue {
  theme: Theme
  accentColor: AccentColor
  bubbleStyle: BubbleStyle
  chatBackground: ChatBackground
  chatFontSize: ChatFontSize
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  setAccentColor: (color: AccentColor) => void
  setBubbleStyle: (style: BubbleStyle) => void
  setChatBackground: (background: ChatBackground) => void
  setChatFontSize: (size: ChatFontSize) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null
    return stored === 'light' ? 'light' : 'dark'
  })

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.ACCENT) as AccentColor | null
    return stored ?? 'blue'
  })
  const [bubbleStyle, setBubbleStyle] = useStoredValue<BubbleStyle>(STORAGE_KEYS.BUBBLE_STYLE, 'rounded')
  const [chatBackground, setChatBackground] = useStoredValue<ChatBackground>(STORAGE_KEYS.CHAT_BACKGROUND, 'classic')
  const [chatFontSize, setChatFontSize] = useStoredValue<ChatFontSize>(STORAGE_KEYS.CHAT_FONT_SIZE, 'standard')

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
    root.dataset.bubbleStyle = bubbleStyle
    root.dataset.chatBackground = chatBackground
    root.dataset.chatFontSize = chatFontSize

    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff')
    }
  }, [theme, bubbleStyle, chatBackground, chatFontSize])

  useEffect(() => {
    const language = localStorage.getItem(STORAGE_KEYS.LANGUAGE) ?? 'ar'
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACCENT, accentColor)
  }, [accentColor])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggleTheme = useCallback(() => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')), [])
  const setAccentColor = useCallback((color: AccentColor) => setAccentColorState(color), [])

  return (
    <ThemeContext.Provider value={{ theme, accentColor, bubbleStyle, chatBackground, chatFontSize, toggleTheme, setTheme, setAccentColor, setBubbleStyle, setChatBackground, setChatFontSize }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useStoredValue<T extends string>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => (localStorage.getItem(key) as T | null) ?? fallback)
  const update = useCallback((next: T) => {
    setValue(next)
    localStorage.setItem(key, next)
  }, [key])
  return [value, update] as const
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
