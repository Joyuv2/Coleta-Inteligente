import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextRequest, NextResponse } from "next/server"

export const { auth: middleware } = NextAuth(authConfig)

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}