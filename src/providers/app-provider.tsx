import AlertProvider from "./AlertProvider"
import CustomIntlProvider from "./CustomIntlProvider"
import ProviderQueryClient from "./QueryClientProvider"
import { NuqsAdapter } from "nuqs/adapters/next/app"

interface AppProviderProps {
  children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <NuqsAdapter>
      <CustomIntlProvider>
        <ProviderQueryClient>
          <AlertProvider>
          {children}
          </AlertProvider>
        </ProviderQueryClient>
      </CustomIntlProvider>
    </NuqsAdapter>
  )
}
