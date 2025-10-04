import AlertProvider from "./AlertProvider"
import CustomIntlProvider from "./CustomIntlProvider"
import ProviderQueryClient from "./QueryClientProvider"
import { NuqsAdapter } from "nuqs/adapters/next/app"

interface AppProviderProps {
  children: React.ReactNode
  messages: Record<string, any>
  locale: string
}

export default function AppProvider({ children, messages, locale }: AppProviderProps) {
  return (
    <NuqsAdapter>
      <CustomIntlProvider messages={messages} locale={locale}>
        <ProviderQueryClient>
          <AlertProvider>
          {children}
          </AlertProvider>
        </ProviderQueryClient>
      </CustomIntlProvider>
    </NuqsAdapter>
  )
}