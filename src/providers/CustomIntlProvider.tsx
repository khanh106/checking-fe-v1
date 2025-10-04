"use client"

import { NextIntlClientProvider } from "next-intl"

interface CustomIntlProviderProps {
  children: React.ReactNode
  messages: Record<string, Record<string, string>>
  locale: string
}

export default function CustomIntlProvider({ 
  children, 
  messages, 
  locale 
}: CustomIntlProviderProps) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  )
}