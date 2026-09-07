import { MapContainer, Marker, TileLayer, Tooltip, Popup, Polyline, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { icon, LatLng, LatLngExpression, marker } from "leaflet"
import { useState } from "react"
import Truck from "@/components/Truck"

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

const garbageIcon = icon({iconUrl: "garbage.svg", iconAnchor: [13,13], iconSize: [30,30]})
const truck1 = {
  color: "#ff0000",
  points: [
    [
      -6.458620397372949,
      -37.096602916717536
    ],
    [
      -6.457405071106426,
      -37.09529399871827
    ],
    [
      -6.443801746552719,
      -37.09152817726136
    ],
    [
      -6.443034149961696,
      -37.09102392196656
    ],
    [
      -6.442788945250394,
      -37.090616226196296
    ],
    [
      -6.441669530932566,
      -37.08702206611634
    ],
    [
      -6.4407100309805,
      -37.08396434783936
    ],
    [
      -6.439505322916688,
      -37.08418965339661
    ],
    [
      -6.437884826144675,
      -37.08450078964234
    ],
    [
      -6.436456226016883,
      -37.08745121955872
    ],
    [
      -6.442458451756337,
      -37.09077715873719
    ],
    [
      -6.442692995548489,
      -37.09098100662232
    ],
    [
      -6.442330518733096,
      -37.092150449752815
    ],
    [
      -6.442447790672294,
      -37.09310531616212
    ],
    [
      -6.4426610123104835,
      -37.093362808227546
    ],
    [
      -6.443055472104922,
      -37.0935881137848
    ],
    [
      -6.443503236905336,
      -37.09369540214539
    ],
    [
      -6.444878512035495,
      -37.093920707702644
    ],
    [
      -6.447650373058277,
      -37.095111608505256
    ],
    [
      -6.451264430630174,
      -37.09672093391419
    ],
    [
      -6.455869917967781,
      -37.09899544715882
    ],
    [
      -6.456136437943824,
      -37.09907054901124
    ],
    [
      -6.456349653823632,
      -37.098898887634284
    ],
    [
      -6.456989300924347,
      -37.09828734397889
    ],
    [
      -6.458620397372949,
      -37.096608281135566
    ]
  ]
}

const truck2 = {
  color: "#0000ff",
  points: [
    [
      -6.458120397372949,
      -37.096102916717536
    ],
    [
      -6.451405071106426,
      -37.09519399871827
    ],
  ]
}
export default function Map(props: any) {
  const { position, zoom, routes }: {position: LatLngExpression, zoom: number, routes: {id: number, points:string}[]} = props
  

  return <MapContainer className="w-full h-full" center={position} zoom={zoom} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* <Marker position={[-6.439378, -37.084235]} icon={garbageIcon} />
    <Marker position={[-6.453619, -37.094212]} icon={garbageIcon} />
    <Truck points={truck1.points} color={truck1.color} />
    <Truck points={truck2.points} color={truck2.color} /> */}
    {routes.map((el, ind) => (
      <Polyline key={ind} positions={JSON.parse(el.points)} pathOptions={{color: "red"}}></Polyline>
    ))}
    <LocationFinder />
  </MapContainer>
}


