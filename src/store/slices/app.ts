import { THEME } from "@/constants/app"
import { Language, EN } from "@/constants/languages"
import { STORAGE_KEY } from "@/constants/storage-key"
import { setLocalStorageItem } from "@/utils/local-storage"
import { setLocaleCookie } from "@/utils/action"
import type { StateSlice } from "../types"

export type AppSlice = {
  locale: Language
  theme: THEME
  userInfo: {
    fullName?: string
    username?: string
    email?: string
    avatar?: string
  } | null
  updateTheme: (payload: AppSlice["theme"]) => void
  updateLocale: (payload: AppSlice["locale"]) => void
  setUserInfo: (userInfo: AppSlice["userInfo"]) => void
}

const initialAppState = {
  locale: EN,
  theme: THEME.LIGHT,
  userInfo: null,
}

export const createAppSlice: StateSlice<AppSlice> = (set) => {
  const updateTheme = (payload: AppSlice["theme"]) => {
    return set(() => ({ theme: payload }))
  }

  const updateLocale = (payload: AppSlice["locale"]) => {
    setLocalStorageItem(STORAGE_KEY.LOCALE, payload.code)
    setLocaleCookie(payload.code)
    return set(() => ({ locale: payload }))
  }

  return {
    ...initialAppState,
    updateTheme,
    updateLocale,
    setUserInfo: (userInfo) => set(() => ({ userInfo })),
  }
}