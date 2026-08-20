export const APP_NAME = 'Wisal'

export const OTP_LENGTH = 6
export const OTP_RESEND_COOLDOWN = 60

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'wisal_auth_token',
  THEME: 'wisal_theme',
  ACCENT: 'wisal_accent',
  BUBBLE_STYLE: 'wisal_bubble_style',
  CHAT_BACKGROUND: 'wisal_chat_background',
  CHAT_FONT_SIZE: 'wisal_chat_font_size',
  LANGUAGE: 'wisal_language',
  PRIVACY_STORY: 'wisal_privacy_story',
  PRIVACY_GROUP_ADD: 'wisal_privacy_group_add',
  PRIVACY_CONTACT: 'wisal_privacy_contact',
} as const
