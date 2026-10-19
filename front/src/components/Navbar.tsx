'use client'

import Link from "next/link"
import { IBM_Plex_Mono } from "next/font/google"
import dynamic from "next/dynamic"
import { clsx } from "clsx"
import { useRouter } from "next/dist/client/components/navigation"
import { useEffect, useState } from "react"

const Popup = dynamic(() => import("reactjs-popup"), {ssr: false})

const IPMono = IBM_Plex_Mono({
    weight: "400"
})

function DropDown({name, ways, currentRoute}: {name: string, ways: {name: string, href: string}[], currentRoute: string}) {
    return (
        <Popup
            trigger={<div className={`menu-item ${IPMono.className} cursor-pointer text-xl`}>{name}</div>}
            position="bottom center"
            on="hover"
            closeOnDocumentClick
            mouseLeaveDelay={0}
            mouseEnterDelay={0}
            contentStyle={{ paddingTop: "18px", border: "none"}}
            arrow={false}
        >
            <div className={`${IPMono.className} bg-background2 flex flex-col w-full text-xl pb-1`}>
                {ways.map((way, ind) => {
                    if (ind === 0){
                        return(<Link key={way.href} href={way.href}><div className={clsx("border-b-2 border-foreground3 px-[0.4rem] pb-2 hover:bg-background3", currentRoute === way.href && "bg-background")}>{way.name}</div></Link>)
                    } else if(ind < (ways.length - 1)) {
                        return(<Link key={way.href} href={way.href}><div className={clsx("border-b-2 border-foreground3 px-[0.4rem] py-2 hover:bg-background3", currentRoute === way.href && "bg-background")}>{way.name}</div></Link>)
                    } else {
                        return(<Link key={way.href} href={way.href}><div className={clsx("px-[0.4rem] pt-2 hover:bg-background3", currentRoute === way.href && "bg-background")}>{way.name}</div></Link>)
                    }
                })}
            </div>
        </Popup>
    )
}

export default function Navbar({drops, links, location}: {drops?: {name: string, ways: {name: string, href: string}[]}[], links?: {name: string, href: string}[], location: string[]}) {
    const [currentRoute, setCurrentRoute] = useState<string>("")

    useEffect(() => {
        setCurrentRoute(window.location.pathname)
    }, [])
    return (
    <div className="menu w-screen h-[4rem] p-4 mr-0 bg-background2 text-foreground flex flex-row justify-between gap-[1em] items-center text-lg">
        { location.length === 1 &&
            <div className={`${IPMono.className} border-b-2 border-foreground3 text-xl`}>
                {location[0]}
            </div>
        }
        { location.length > 1 &&
            <div className={`${IPMono.className} flex flex-row gap-[0.5rem]`}>
                {location.map((loc, ind) => {
                    if(ind === 0) {
                        return(<div key={loc}>{loc}</div>)
                    } else if(ind < (location.length - 1)) {
                        return (<div key={loc}>/ {loc}</div>)
                    } else {
                        return (<><span>/ </span><div key={loc} className="font-bold border-b-2 border-foreground3 text-xl">{loc}</div></>)
                    }
                })}    
            </div>
        }
        <div className="flex flex-row gap-[1rem] select-none">
            { drops &&
                drops.map((drop, ind) => (
                    <DropDown key={ind} name={drop.name} ways={drop.ways} currentRoute={currentRoute}/>
                ))
            }
            { links && 
                links.map((link, ind) => (
                    <Link key={link.href} href={link.href}><div className={clsx(`${IPMono.className} duration-100 text-xl hover:border-b-2 hover:border-foreground3`, currentRoute === link.href && "border-b-2 border-foreground3")}>{link.name}</div></Link>
                ))
            }
        </div>
    </div>    
    )
}