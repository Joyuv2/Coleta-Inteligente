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

  function handleViagemClick(viagem: any) {
    setViagem(viagem)
  }

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
            <MapRun key={viagem?.id ?? "empty"} position={[-6.45541, -37.094683]} zoom={15} id={viagem?.id} />
        </div>

        <div className="w-1/2 h-full bg-background2 p-4 rounded-xl shadow-sm">
            <div className="mb-4 flex flex-col items-center">
                <div className="flex flex-row justify-between w-full">
                  <h1 className="text-2xl font-bold text-foreground">Coletas</h1> 
                  <Link href={"/caminhao/rotas/percorrer/add"}><h1 className="text-2xl font-bold text-foreground">Adicionar</h1></Link>
                </div>
                <div className="mt-4 flex w-full flex-col gap-3">
                  {Array.isArray(viagens) && viagens.map((viagem: any) => (
                    <div
                      key={viagem.id}
                      className="rounded-xl border border-border bg-background p-4 shadow-sm transition hover:shadow-md cursor-pointer"
                      onClick={() => handleViagemClick(viagem)}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Viagem</p>
                          <p className="text-lg font-semibold text-foreground">#{viagem.id}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}