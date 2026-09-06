import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { checkAdmin } from "@/lib/db"
import { verifyPassword } from "@/lib/encrypt"
import { authConfig } from "./auth.config"

const credentialsSchema = z.object({
    name: z.string().min(3).max(32),
    password: z.string().min(8)
})

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    session: { strategy: "jwt" },
    providers: [
        Credentials ({
            credentials: {
                name: { label: "Nome", type: "text" },
                password: { label: "Senha", type:"password" },
            },
            authorize: async (raw) => {
                const parsed = credentialsSchema.safeParse(raw)
                if (!parsed.success) return null

                const { name, password } = parsed.data
                const [user] = await checkAdmin(name)

                if(!user || !user.password_hash) return null

                const passwordsMatch = await verifyPassword(password, user.password_hash)
                if (!passwordsMatch) return null

                return { id: String(user.id), name: user.username }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },

    },
    pages: {
        signIn: "/login"
    }
})