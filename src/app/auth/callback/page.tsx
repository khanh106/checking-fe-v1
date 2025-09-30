"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { setAuthTokens } from "@/utils/auth"
import { getMyProfile } from "@/services/apis/auth"


export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const refreshToken = searchParams.get("refresh_token")

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!token) {
        router.replace("/unauthorized?error=no_token")
        return
      }

      try {
        const userProfile = await getMyProfile(token)
        const REQUIRED_ACCESS_KEY = "Rt7EJMIJP0wE5H820gET"
        const hasAccessKey = userProfile.key === REQUIRED_ACCESS_KEY

        if (hasAccessKey) {
          setAuthTokens({ token, refreshToken })
          router.replace("/")
        } else {
          router.replace("/unauthorized?error=permission_denied")
        }
      } catch (error) {
        console.error("Xác thực thất bại:", error)
        router.replace("/unauthorized?error=api_failed")
      }
    }

    handleAuthentication()
  }, [token, refreshToken, router])
  return <div>Đang xử lý đăng nhập...</div>
}