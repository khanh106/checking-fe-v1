import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED_ROUTES = ["/", "/dashboard", "/attendance", "/work-location", "/guide"] 
const AUTH_TOKEN_KEY = "auth_token"

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value
  const { pathname } = request.nextUrl

  const isAccessingProtectedRoute = PROTECTED_ROUTES.some((path) => pathname === path || (path !== "/" && pathname.startsWith(path)))

  if (isAccessingProtectedRoute && !token) {
  
    const loginUrl = new URL("https://psvn-fe-auth-service.gasy.one/login")
    const callbackUrl = new URL("/auth/callback", request.url).toString()
    loginUrl.searchParams.set("redirect_uri", callbackUrl)

    const APP_KEY = "xJhGznIP5u8jA24YwKDH"
    loginUrl.searchParams.set("key", APP_KEY)
    console.log(`Chưa đăng nhập, đang chuyển hướng đến: ${loginUrl.toString()}`)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}