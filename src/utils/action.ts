"use server"

import { defaultLocale } from "@/lib/i18n"
import { COOKIE_KEYS } from "@/constants/app"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const LANGUAGE_CODES = ["vi", "en"]

const revalidateAllPaths = async () => {
  revalidatePath("/", "layout")
}

export const setAuthenticateCookie = async (
  { accessToken, remember = false, expires = 24 * 3600000 }: { accessToken: string; remember: boolean; expires?: number },
) => {
  if (accessToken) {
    const currentCookies = await cookies()
    const cookieOption: {
      path: string
      expires?: number
    } = {
      path: "/",
    }
    if (remember) {
      cookieOption.expires = Date.now() + expires * 1000
    }
    currentCookies.set(COOKIE_KEYS.REMEMBER, String(remember), {
      expires: Date.now() + 365 * 24 * 3600000,
      path: "/",
    })
    currentCookies.set(COOKIE_KEYS.AUTHORIZATION, accessToken, cookieOption)
    await revalidateAllPaths()
  }
}

export const clearAuthenticateCookie = async () => {
  const currentCookies = await cookies()
  currentCookies.delete(COOKIE_KEYS.REMEMBER)
  currentCookies.delete(COOKIE_KEYS.AUTHORIZATION)
  currentCookies.delete(COOKIE_KEYS.USER)
}



export const setLocaleCookie = async (locale: string) => {
  const currentCookies = await cookies()
  currentCookies.set(COOKIE_KEYS.LOCALE, locale)
}

export const getUserInitial = async () => {
  if (typeof window === "undefined") {
    const currentCookies = await cookies()
    const cookieData = currentCookies.get(COOKIE_KEYS.USER)?.value
    if (cookieData) {
      return JSON.parse(cookieData)
    }
  } else {
    const localStorageData = localStorage.getItem("app-storage")
    if (localStorageData) {
      console.log(JSON.parse(localStorageData))
      return JSON.parse(localStorageData)?.currentUser
    }
  }
  return
}