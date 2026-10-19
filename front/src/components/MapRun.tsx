"use client"

import { MapContainer, TileLayer, Polyline, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useEffect, useState } from "react"
import { getRouteTruckById, updateRouteTruck, getRoute } from "@/lib/db"
import { useRouter } from "next/navigation"
import styles from "@/components/line.module.css"

function HandleClick({onMapClick}: { onMapClick: (lat: number, lng: number) => void}) {
      useMapEvents({
        click(e) {
          onMapClick(e.latlng.lat, e.latlng.lng)
        }
      })
      return null;
    }

export default function MapPoints(props: any) {
  const [points, setPoints] = useState<[number, number][]>([])
  const [route, setRoute] = useState<any>(null)
  const { position, zoom, id } = props
  const router = useRouter()

  async function handleMapClick(lat: number, lng: number) {
    await updateRouteTruck(id, [lat,lng]).then(() => {
      window.location.reload()
    })
  }

  useEffect(() => {
    getRouteTruckById(id).then((routeTruck) => {
      if (routeTruck) {
        setPoints(JSON.parse(routeTruck[0].previous_points!) as [number, number][])
        getRoute(routeTruck[0].route_id).then((routeData) => {
          setRoute(routeData)
        })
        console.log(points, route)
      }})
    }, [])

  return <MapContainer className="w-full h-full" center={position} zoom={zoom} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <HandleClick onMapClick={handleMapClick}/>

    {points.length >= 1 && (
      <Polyline 
        positions={points}
        pathOptions={{color: "yellow", weight: 5, lineJoin: "bevel", dashArray:"6 10",  className:`${styles.animated_line}`}}
      /> 
    )}

    {route != null && 
      (
      <Polyline 
        positions={JSON.parse(route.points)}
        pathOptions={{color: "#3b82f6", weight: 5, lineJoin: "bevel", dashArray:"6 10",  className:`${styles.animated_line}`}} 
        />
      )
    }
  </MapContainer>
}
