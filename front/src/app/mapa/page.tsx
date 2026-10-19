"use client"

import dynamic from "next/dynamic"
import { useMemo, useState, useEffect } from "react"
import getRoutesList from "./action"

export default function Page(){
    const [routes, setRoutes] = useState<{id: number, points: string}[]>([])
    const Map = useMemo(() => dynamic(
        () => import("@/components/Map"),
        {
            loading: () => <p>O mapa está carregando</p>,
            ssr: false
        }
    ), [])


    useEffect(() => {
        getRoutesList().then(setRoutes)
    }, [])

    return(
        <div className="p-6 w-full h-full">
            <div className="w-full h-full flex flex-row flex-wrap bg-background2 p-3 gap-5 ">
                <Map position={[-6.455410, -37.094683]} routes={routes} zoom={15}/>
            </div>
        </div>
    )
}