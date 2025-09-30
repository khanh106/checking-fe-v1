import { resolveLocale } from "@/utils/action"
import { IntlErrorCode } from "next-intl"
import { getRequestConfig } from "next-intl/server"

export const defaultLocale = "en"

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await resolveLocale()

  return {
    locale,
    messages: {
      ...(await import(`../locales/${locale}/common.json`)).default,
      ...(await import(`../locales/${locale}/dashboard.json`)).default,
      ...(await import(`../locales/${locale}/attendance.json`)).default,
      ...(await import(`../locales/${locale}/work-location.json`)).default,
      ...(await import(`../locales/${locale}/guide.json`)).default,
    },
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected and should only log an error
        console.error(error.originalMessage)
      }
    },
    getMessageFallback({ key }) {
      return key
    },
  }
})
