"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getRouteUpate } from "./action"
import dynamic from "next/dynamic"
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


  if (points) {
    return(
      <div className="p-12 w-full h-screen flex flex-row gap-12">
        <div className="w-full h-full flex flex-row flex-wrap bg-background2 p-4 rounded-xl gap-5">
          <MapPointsUpdate position={points[0]} zoom={15} pointsSet={points} id={id}/>
        </div>
      </div>
    )
  }
}
