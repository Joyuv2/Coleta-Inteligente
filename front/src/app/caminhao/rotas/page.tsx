"use client"

import { useEffect, useState } from "react"
import { getRoutesList } from "./action"
import Link from "next/link"
import { deleteRoute } from "@/lib/db"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"

const MapPoints = dynamic(() => import("@/components/MapPoints"), { ssr: false })

export default function Page() {
  const [routes, setRoutes] = useState<{ id: number; points: string }[]>([])

  useEffect(() => {
    getRoutesList().then(setRoutes)
  }, [])

  async function handleDelete(id: number) {
    await deleteRoute(id)
    setRoutes((current) => current.filter((route) => route.id !== id))
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
      <Navbar drops={drops} links={links} location={["Início", "Caminhões", "Rotas"]} />

      <div className="p-6 w-full h-full flex flex-row gap-6">
        <div className="w-1/2 h-full bg-background2 p-3 rounded-xl shadow-sm">
          <MapPoints position={[-6.45541, -37.094683]} zoom={15} />
        </div>

        <div className="w-1/2 h-full bg-background2 p-4 rounded-xl shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Rotas</h1>
          </div>

          {routes.length === 0 ? (
            <div className="flex h-[calc(100%-3rem)] items-center justify-center rounded-xl border border-dashed border-white/20 bg-background3 text-foreground/70">
              Nenhuma rota cadastrada.
            </div>
          ) : (
            <div className="flex h-full flex-row flex-wrap gap-5 overflow-auto">
              {routes.map((el) => (
                <div
                  key={el.id}
                  className="bg-background3 text-foreground h-52 w-48 rounded-xl p-3 flex flex-col justify-between shadow-md"
                >
                  <div className="space-y-2">
                    <h2 className="font-bold text-lg">Rota #{el.id}</h2>
                    <p className="text-sm text-foreground/70 break-words">
                      {el.points ? el.points.slice(0, 60) : "Sem pontos cadastrados"}
                      {el.points?.length > 60 ? "..." : ""}
                    </p>
                  </div>

                  <div className="flex flex-row justify-between items-center font-bold">
                    <button
                      type="button"
                      className="flex items-center justify-center rounded hover:cursor-pointer text-2xl bg-botaoapagar w-9 h-9 text-white"
                      onClick={() => handleDelete(el.id)}
                    >
                      X
                    </button>

                    <Link
                      href={`/caminhao/rotas/update?id=${el.id}`}
                      className="flex items-center justify-center rounded hover:cursor-pointer text-2xl bg-botaoedit w-9 h-9"
                    >
                      🖉
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}