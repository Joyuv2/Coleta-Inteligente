"use client"

import { useEffect, useState } from "react"
import { addFlag, getUsersList, removeFlag } from "./action"
import Navbar from "@/components/Navbar"
import { IBM_Plex_Mono } from "next/font/google"

const IPMono = IBM_Plex_Mono({
    weight: "400"
})

export default function Page() {
    const [users, setUsers] = useState<any[]>()

    useEffect(() => {
        getUsersList().then(setUsers)
    }, [])

    const links = [
        {name: "Mapa", href: "/mapa"},
        {name: "Cadastrar", href: "/cadastro"},
        {name: "Login", href: "/login"}
        // {name: "Caminhões", href: "/caminhao"}
    ]
    const drops = [
        {name: "Caminhões", ways: [{name: "Lista", href: "/caminhao"}, {name: "Adicionar", href: "/caminhao/add"}, {name: "Rotas", href: "/caminhao/rotas"}]}
    ]

    function handleAddFlag(e: React.MouseEvent<HTMLButtonElement>) {
        const flagValue = e.currentTarget.parentElement?.querySelector("input")?.value!
        const username = e.currentTarget.id
        addFlag(username, flagValue).then(() => {
            window.location.reload()
        })
    }

    function handleRemoveFlag(e: React.MouseEvent<HTMLLIElement>) {
        const flagValue = e.currentTarget.innerText
        const username = e.currentTarget.id
        removeFlag(username, flagValue).then(() => {
            window.location.reload()
        })
    }

    return (
        <div className={`flex flex-col h-screen items-center`}>
            <Navbar links={links} drops={drops} location={["Início","Login"]}/>
                <div className={`flex flex-col text-xl justify-center items-center h-full w-full ${IPMono.className}`}>
                    <div className="flex flex-col m-10 gap-2 p-4 bg-background2 rounded h-9/10 border-3 border-background3 justify-center items-center w-9/10">
                        {users?.map((user, index) => (
                        <div key={index} className="w-full h-2/10 bg-background3 p-4">
                            <h2>{user.username}</h2>
                            <div className="flex flex-row justify-between w-full">
                                <ul>
                                    {JSON.parse(user.flags).map((flag: string, index: number) => (
                                        <li onClick={handleRemoveFlag} id={user.username} key={index}>{flag}</li>
                                    ))}
                                </ul>
                                <div className="flex flex-row gap-2">
                                    <input type="text" placeholder="Flag..." className="p-2 bg-background rounded border-2 w-full focus:outline-0 border-foreground3 text-xl required"/>
                                    <button onClick={handleAddFlag} id={user.username} className="w-1/4 hover:cursor-pointer border-black shadow-lg hover:shadow-none duration-200 shadow-background text-2xl bg-background2 hover:border-0 py-2 min-w-[8em] my-5">Adicionar</button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
            </div>
        </div>
    )
}