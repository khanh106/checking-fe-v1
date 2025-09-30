import { useRouter } from "next/navigation"
import { clearAuthTokens } from "@/utils/auth"

export function useLogout() {
  const router = useRouter()

  const logout = () => {
    clearAuthTokens()
    router.push("/")
  }

  return { logout }
}