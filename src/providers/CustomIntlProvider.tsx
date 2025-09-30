import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

export default async function CustomIntlProvider({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  )
}
