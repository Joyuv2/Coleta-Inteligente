"use client"

import { useEffect, useState } from "react"
import { getRuns } from "./actions"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import MapRun from "@/components/MapRun"

export default function Page() {
  const [viagens, setViagens] = useState<any>([])
  const [viagem, setViagem] = useState<any>(null)

  useEffect(() => {
    getRuns().then((data) => {
      setViagens(data)
    })
  }, [])

  const links = [
    { name: "Mapa", href: "/mapa" },
    { name: "Cadastrar", href: "/cadastro" },
    { name: "Início", href: "/" },
    { name: "Viagens", href: "/caminhao/rotas/percorrer" }
  ]

  const drops = [
    {
      name: "Caminhões",
      ways: [
        { name: "Lista", href: "/caminhao" },
        { name: "Adicionar", href: "/caminhao/add" },
        { name: "Rotas", href: "/caminhao/rotas" }
      ]
    }
  ]
  
  return (
    <div className="h-screen flex flex-col">
      <Navbar drops={drops} links={links} location={["Início", "Caminhões", "Rotas", "Viagens"]} />

      <div className="p-6 w-full h-full flex flex-row gap-6">
        <div className="w-1/2 h-full bg-background2 p-3 rounded-xl shadow-sm">
            <MapRun position={[-6.45541, -37.094683]} zoom={15} id={viagens[0]?.id} />
        </div>

        <div className="w-1/2 h-full bg-background2 p-4 rounded-xl shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Coletas</h1>
                {viagens && viagens.map((viagem: any) => (
                    <div key={viagem.id}>
                        <p className="text-lg font-semibold text-foreground">{viagem.id}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    </div>
  )
}