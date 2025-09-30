"use client"

import { queryClient } from "@/services/react-query/query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

export default function ProviderQueryClient({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
