import { MapContainer, Marker, TileLayer, Polyline, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { icon, LatLngExpression, divIcon } from "leaflet"
import { useState } from "react"

function LocationFinder() {
  const [position, setPosition] = useState<LatLngExpression>([0,0])
  const map = useMapEvents ({
    click() {
      map.locate({enableHighAccuracy: true})
    },
    locationfound(e) {
      setPosition(e.latlng)
      console.log(e.latlng, e.accuracy)
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={icon({iconUrl: "home.svg", iconSize: [30,30]})}/>
  )
}

function squareIcon(color: string) {
  return divIcon({
    className: '',
    html: `<div style="width:16px;height:16px;background:${color};border:1px solid #fff3;border-radius:2px;"></div>`,
    iconSize: [16, 16],
  });
}

const garbageIcon = icon({iconUrl: "garbage.svg", iconAnchor: [13,13], iconSize: [30,30]})

export default function Map(props: any) {
  const { position, zoom, routes }: {position: LatLngExpression, zoom: number, routes: {id: number, points:string}[]} = props
  

  return (
    <div className="relative h-full w-full">
      <MapContainer className="w-full h-full" center={position} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[-6.439378, -37.084235]} icon={garbageIcon} />
        <Marker position={[-6.453619, -37.094212]} icon={garbageIcon} /> */}
        {routes.map((el, ind) => {
          const points = JSON.parse(el.points)
          return (
            <div id="sim" key={ind}>
              <Polyline positions={JSON.parse(el.points)} pathOptions={{color: "#3b82f6"}}></Polyline>
              <Marker position={points[0]} icon={squareIcon("#2f6fed")}/>
              <Marker position={points[points.length-1]} icon={squareIcon("#f5a623")}/>
            </div>
          )
        })}
        <LocationFinder />
      </MapContainer>
      <div className="w-[12rem] h-[16rem] bg-background2 rounded-sm border-l-4 outline-2 outline-foreground2 border-blue-400 flex flex-col z-1000 absolute bottom-5 left-5">
      </div>
    </div>
  )
}


