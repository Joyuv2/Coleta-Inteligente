"use server"

import { registerUser } from "@/lib/db"
import { hashPassword } from "@/lib/encrypt"

export async function registerUserAct(formData: FormData) {
    const username = formData.get("name") as string
    const password = formData.get("password") as string
    
    const passwordHash = await hashPassword(password)
    try {
        registerUser(username, passwordHash)
        return {sucesso: "Sucesso ao adicionar"}
    } catch (e) {
        return {error : "Erro ao tentar registrar"}
    }
}