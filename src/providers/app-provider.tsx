import AlertProvider from "./AlertProvider"
import AuthProvider from "./AuthProvider"
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
            <AuthProvider>{children}</AuthProvider>
          </AlertProvider>
        </ProviderQueryClient>
      </CustomIntlProvider>
    </NuqsAdapter>
  )
}
