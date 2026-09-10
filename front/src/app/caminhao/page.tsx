"use client"

import { useEffect, useState } from "react"
import getTrucksList from "./action"
import Link from "next/link"
import { deleteTruck } from "@/lib/db"
import Navbar from "@/components/Navbar"

export default function Page() {
    const [trucks, setTrucks] = useState<{id: number, plate: string}[]>([])
    // const itens = [
    //     {placa: "12345F", motorista:"juninho"},
    //     {placa: "12345A", motorista:"juninho"},
    //     {placa: "12345B", motorista:"juninho"},
    //     {placa: "12345Z", motorista:"juninho"},
    //     {placa: "12345V", motorista:"juninho"},
    // ]

    useEffect(() => {
        getTrucksList().then(setTrucks)
    }, [])

    async function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
        await deleteTruck(parseInt(e.currentTarget.id))
    }

    const links = [
        {name: "Mapa", href: "/mapa"},
        {name: "Início", href: "/"}
    ]

    const drops = [
        {name: "Caminhões", ways: [{name: "Lista", href: "/caminhao"}, {name: "Adicionar", href: "/caminhao/add"}, {name: "Rotas", href: "/caminhao/rotas"}]}
    ]

    return(
        <div className="h-screen flex flex-col">
            <Navbar drops={drops} links={links} location={["Início","Caminhões"]} />
            <div className="p-6 w-full h-full">
                <div className="w-full h-full flex flex-row flex-wrap bg-background2 p-2 gap-5 overflow-scroll">
                    {trucks.map((el, ind) => (
                        <div key={ind} className="bg-background3 text-xl text-foreground h-55 w-45 rounded-xl p-2 flex flex-col justify-between">
                            <div>
                                <h1 className="font-bold">Placa: {el.plate}</h1>
                            </div>
                            <div className="flex flex-row justify-between font-bold">
                                <div className="flex items-center justify-center rounded hover:cursor-pointer text-2xl bg-botaoapagar w-9 h-9" id={el.id.toString()} onClick={handleDelete}>X</div>
                                <Link href={`/caminhao/update?id=${el.id}`}><div className="flex items-center justify-center rounded hover:cursor-pointer text-2xl bg-botaoedit w-9 h-9 ">🖉</div></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}