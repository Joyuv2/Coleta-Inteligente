'use client'

import Navbar from "@/components/Navbar"
import { addTruck } from "@/lib/db"

export default function Page() {
    async function handleSubmit(formData: FormData) {
        const res = await addTruck(formData.get('plate')!)
    }

    const links = [
        {name: "Mapa", href: "/mapa"},
        {name: "Início", href: "/"}
    ]

    const drops = [
        {name: "Caminhões", ways: [{name: "Lista", href: "/caminhao"}, {name: "Adicionar", href: "/caminhao/add"}, {name: "Rotas", href: "/caminhao/rotas"}]}
    ]

    return (
        <div className="h-screen flex flex-col">
            <Navbar drops={drops} links={links} location={["Início","Caminhões","Adicionar"]}/>
            <div className="p-6 w-full h-full">
                <form action={handleSubmit} className="flex flex-col bg-background2 flex-wrap h-full text-3xl p-3 justify-between">
                    <div className="flex flex-col gap-6">
                    <input type="text" name="plate" id="plate" placeholder="Placa..." className="p-3 bg-background3 rounded border-2 border-foreground3 " required/>
                    </div>
                    <div className="opacity-70 flex flex-col items-end">
                        <button type="submit" className="flex items-center justify-center rounded-full hover:cursor-pointer text-5xl bg-green-600 p-8 w-9 h-9 ">✓</button>
                    </div>
                </form>
            </div>
        </div>
    )
}