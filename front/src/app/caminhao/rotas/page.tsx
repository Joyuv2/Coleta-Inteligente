"use client"

import { useEffect, useState } from "react"
import { getRoutesList } from "./action"
import Link from "next/link"
import { deleteRoute } from "@/lib/db"
import dynamic from "next/dynamic"

const MapPoints = dynamic(() => import("@/components/MapPoints"))

export default function Page() {
  const [routes, setRoutes] = useState<{id: number, points: string}[]>([])
  
  useEffect(() => {
    getRoutesList().then(setRoutes)
  }, [])

  async function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    await deleteRoute(parseInt(e.currentTarget.id))
  }

  return(
    <div className="p-12 w-full h-screen flex flex-row gap-12">
      <div className="w-1/2 h-full flex flex-row flex-wrap bg-background2 p-4 rounded-xl gap-5">
        <MapPoints position={[-6.455410, -37.094683]} zoom={15}/>
      </div>
      <div className="w-1/2 h-full flex flex-row flex-wrap bg-background2 p-4 rounded-xl gap-5">
        {routes.map((el, ind) => (
          <div key={ind} className="bg-background3 text-xl text-foreground h-55 w-45 rounded-xl p-2 flex flex-col justify-between">
            <div>
                <h1 className="font-bold">ID: {el.id}</h1>
            </div>
            <div className="flex flex-row justify-between font-bold">
                <div className="flex items-center justify-center rounded hover:cursor-pointer text-2xl bg-botaoapagar w-9 h-9" id={el.id.toString()} onClick={handleDelete}>X</div>
                <Link href={`/caminhao/rotas/update?id=${el.id}`}><div className="flex items-center justify-center rounded hover:cursor-pointer text-2xl bg-botaoedit w-9 h-9">🖉</div></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
