"use client"

import LoadingScreen from "@/components/LoadingScreen/LoadingScreen"
import { STORAGE_KEY } from "@/constants/storage-key"
import { useLoadingDelay } from "@/hooks/useDelayedLoading"
import { useGetAuthUser, useGetUserProfile } from "@/services/react-query/psvn/queries/user"
import { initAuth } from "@/utils/auth"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const authToken = searchParams.get(STORAGE_KEY.TOKEN)
  const refreshToken = searchParams.get(STORAGE_KEY.REFRESH_TOKEN)

  const { data, isLoading } = useGetAuthUser({
    token: authToken ?? undefined,
  })

  useEffect(() => {
    if (data?.token && authToken) {
      initAuth({
        token: data?.token,
        authToken,
        refreshToken,
        permissions: data?.permissions,
      })

      const url = new URL(window.location.href)
      url.searchParams.delete(STORAGE_KEY.TOKEN)
      url.searchParams.delete(STORAGE_KEY.REFRESH_TOKEN)
      router.replace(url.pathname + url.search)
    }
  }, [authToken, data, refreshToken, router])

  const { isLoading: getUserProfileLoading } = useGetUserProfile(!authToken)

  // Delay việc ẩn loading để tránh hiện tượng giật
  const shouldShowLoading = useLoadingDelay(isLoading || getUserProfileLoading)

  if (shouldShowLoading) return <LoadingScreen />

  return <>{children}</>
}
