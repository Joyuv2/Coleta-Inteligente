"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar";
import { IBM_Plex_Mono } from "next/font/google";

const IPMono = IBM_Plex_Mono({
    weight: "400"
})

function Input({name, placeholder, type}: {name:string, placeholder:string, type:string}) {
    return (
        <input className="p-3 bg-background rounded border-2 w-full focus:outline-0 border-foreground3 text-xl" name={name} type={type} placeholder={placeholder} required></input>
    )
}

export default function LoginPage() {
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        const res = await signIn("credentials", {
            name: formData.get("name"),
            password: formData.get("password"),
            redirect: false,
        })

        if (res?.error) {
            setError("Nome e ou senha inválidos")
        } else {
            router.push("/caminhao")
        }
    }

    const links = [
        {name: "Mapa", href: "/mapa"},
        {name: "Início", href: "/"}
    ]
    return (
        <div className={`flex flex-col h-screen items-center`}>
            <Navbar links={links} location={["Início","Login"]}/>
            <div className={`flex flex-col text-xl justify-center h-full ${IPMono.className}`}>
                <form action={handleSubmit} className="flex flex-col m-10 gap-2 p-4 bg-background2 rounded border-3 border-background3 justify-center items-center w-[40em]">
                    <div className="pb-2 border-b-2 border-foreground2 px-30 text-2xl">
                        <h1>Login</h1>
                    </div>
                    <div className="flex flex-col gap-4 w-full items-center">
                        <div className="w-9/10">
                            <label htmlFor="name">Nome</label>
                            <Input name="name" type="text" placeholder="Nome..."/>
                        </div>
                        <div className="w-9/10">
                            <label htmlFor="password">Senha</label>
                            <Input name="password" type="password" placeholder="Senha..."/>
                        </div>
                        <button type="submit" className="w-1/2 hover:cursor-pointer border-black shadow-lg hover:shadow-none duration-200 shadow-background text-2xl bg-background2 hover:border-0 py-2 min-w-[8em] my-5">Entrar</button>
                        {error && <p>{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}