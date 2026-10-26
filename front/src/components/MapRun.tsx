"use client"

import { MapContainer, TileLayer, Polyline, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useEffect, useState } from "react"
import { getRouteTruckById, updateRouteTruck, getRoute, undoLastPointRouteTruck } from "@/lib/db"
import styles from "@/components/line.module.css"

function HandleClick({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng)
    }
  })

  return null
}

type LatLngPoint = [number, number]

function parsePolylinePoints(value: unknown): LatLngPoint[] {
  if (value == null) return []

  const source = typeof value === "string" ? JSON.parse(value) : value

  if (!Array.isArray(source)) return []

  return source.filter(
    (point): point is LatLngPoint =>
      Array.isArray(point) &&
      point.length >= 2 &&
      typeof point[0] === "number" &&
      typeof point[1] === "number"
  )
}

export default function MapPoints(props: any) {
  const [points, setPoints] = useState<LatLngPoint[]>([])
  const [route, setRoute] = useState<LatLngPoint[]>([])
  const { position, zoom, id } = props

  async function handleMapClick(lat: number, lng: number) {
    await updateRouteTruck(id, [lat, lng]).then(() => {
      setPoints((prevPoints) => [...prevPoints, [lat, lng]])
    })
  }

  useEffect(() => {
    let isMounted = true

    if (!id) {
      setPoints([])
      setRoute([])
      return () => {
        isMounted = false
      }
    }

    getRouteTruckById(id).then((routeTruck) => {
      if (!routeTruck || !Array.isArray(routeTruck) || routeTruck.length === 0) {
        if (isMounted) {
          setPoints([])
          setRoute([])
        }
        return
      }

      const truck = routeTruck[0]
      const previousPoints = truck?.previous_points

      try {
        const parsedPoints = parsePolylinePoints(previousPoints)

        if (isMounted) {
          setPoints(parsedPoints)
        }
      } catch (error) {
        console.error("Erro ao parsear previous_points:", error)
        if (isMounted) setPoints([])
      }

      if (truck?.route_id) {
        getRoute(truck.route_id).then((routeData) => {
          const nextRoute = routeData?.[0]?.points
          const parsedRoute = parsePolylinePoints(nextRoute)

          if (isMounted) {
            setRoute(parsedRoute)
          }
        })
      } else if (isMounted) {
        setRoute([])
      }
    })

    return () => {
      isMounted = false
    }
  }, [id])

  if (!id) {
    return <div>Selecione uma viagem</div>
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if((e.ctrlKey || e.metaKey) && e.key == 'z') {
        e.preventDefault()
        undoLastPointRouteTruck(id).then(() => {
          setPoints((prevPoints) => prevPoints.slice(0, -1))
        })
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <MapContainer className="w-full h-full" center={position} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HandleClick onMapClick={handleMapClick} />

      {points.length > 1 && (
        <Polyline
          positions={points}
          pathOptions={{
            color: "orange",
            weight: 5,
            lineJoin: "bevel",
            dashArray: "6 10",
            className: `${styles.animated_line} z-10`
          }}
        />
      )}

      {route.length > 1 && (
        <Polyline
          positions={route}
          pathOptions={{
            color: "#3b82f6",
            weight: 5,
            lineJoin: "bevel",
            dashArray: "6 10",
            className: `${styles.animated_line}`
          }}
        />
      )}
    </MapContainer>
  )
}
