"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"
import SideBar from "@/components/Sidebar";
import Link from "next/link";
import Button from "@/components/Button";

function Input({name, placeholder, type}: {name:string, placeholder:string, type:string}) {
    return (
        <input className="p-3 bg-gray-900 rounded-2xl border-2 w-full focus:outline-0 border-foreground-3 text-xl" name={name} type={type} placeholder={placeholder} required></input>
    )
}

export default function LoginPage() {
    const [error, setError] = useState("")
    const router = useRouter()

    const buttons = [
    {text: "Início", href: "/"},
    {text: "Mapa", href: "/mapa"},
    {text: "Caminhões", href: "/caminhao"}
  ]

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
    return (
        <div className={`flex h-screen items-center gap-[40rem]`}>
            <SideBar>
                {
                    buttons.map((el, ind) => (
                        <Link href={el.href} key={ind}>
                            <Button>
                                {el.text}
                            </Button>
                        </Link>
                    ))
                }
            </SideBar>
            <form action={handleSubmit} className="flex flex-col m-10 gap-4 p-4 bg-background3 rounded-xl justify-center items-center w-[40em]">
                <Input name="name" type="text" placeholder="Nome..."/>
                <Input name="password" type="password" placeholder="Senha..."/>
                <button type="submit" className="hover:cursor-pointer border-black border-b-2 border-r-2 rounded-2xl text-2xl bg-background2 hover:border-0 min-w-[10em] hover:mb-[2px] hover:mr-[2px]">Entrar</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}