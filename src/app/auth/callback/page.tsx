"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, Suspense } from "react"

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const refreshToken = searchParams.get("refresh_token")

  useEffect(() => {
    if (token) {
      localStorage.setItem('auth_token', token)
      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken)
      }
      
      router.replace("/dashboard")
    } else {
      router.replace("/")
    }
  }, [token, refreshToken, router])

  return <div>Đang xử lý đăng nhập...</div>
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <AuthCallbackContent />
    </Suspense>
  )
}