"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getRouteUpate } from "./action"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
const MapPointsUpdate = dynamic(() => import("@/components/MapPointsUpdate"))


export default function Page() {
  const [route, setRoute] = useState<{id: number, points: string}[]>()
  const [points, setPoints] = useState<[number,number][]>()
  const searchParams = useSearchParams()

  const id = parseInt(searchParams.get('id')!)

  useEffect(() => {
      getRouteUpate(id).then(setRoute)
  }, [id])
  
  useEffect(() => {
    if (route) {
        setPoints(JSON.parse(route![0].points))
        console.log(points)
    }
  }, [route])

  const links = [
    {name: "Mapa", href: "/mapa"},
    {name: "Início", href: "/"}
  ]

  const drops = [
    {name: "Caminhões", ways: [{name: "Lista", href: "/caminhao"}, {name: "Adicionar", href: "/caminhao/add"}, {name: "Rotas", href: "/caminhao/rotas"}]}
  ]
  
  if (points) {
    return(
      <div className="w-full h-screen flex flex-col">
        <Navbar drops={drops} links={links} location={["Início","Caminhões","Rotas","Atualizar"]} />
        <div className="h-full flex p-6">
          <div className="w-full h-full bg-background2 p-3">
            <MapPointsUpdate position={points[0]} zoom={15} pointsSet={points} id={id}/>
          </div>
        </div>
      </div>
    )
  }
}
