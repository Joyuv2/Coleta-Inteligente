import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: { signIn: "/login" },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard")
      if (isOnDashboard) return isLoggedIn
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.flags = user.flags
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.flags = token.flags as string[]
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig