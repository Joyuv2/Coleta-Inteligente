import Navbar from "@/components/Navbar";
import { useSearchParams } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import { getRun, getRuns } from "./action";

export default function Page() {
    const [viagem, setViagem] = useState<any>(null)
    const [viagens, setViagens] = useState<any[]>([])
    const searchParams = useSearchParams()
    const truckRouteId = Number(searchParams.get("id"))
    const links = [
        {name: "Mapa", href: "/mapa"},
        {name: "Cadastrar", href: "/cadastro"},
        {name: "Início", href: "/"}
    ]
    const drops = [
        {name: "Caminhões", ways: [{name: "Lista", href: "/caminhao"}, {name: "Adicionar", href: "/caminhao/add"}, {name: "Rotas", href: "/caminhao/rotas"}]}
    ]

    useEffect(() => {
        getRun(truckRouteId).then(setViagem)
    },[])

    useEffect(() => {
        getRuns().then(setViagens)
    },[])

    return (
        <div className="h-screen flex flex-col">
            <Navbar drops={drops} links={links} location={["Início","Caminhões","Rotas"]} />
            <div className="p-6 w-45/100 h-full flex flex-row gap-6">
                
            </div>
        </div>
    );
}