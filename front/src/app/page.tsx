import Navbar from "@/components/Navbar";
import styles from "@/app/index.module.css"
import { JetBrains_Mono } from "next/font/google";

const JBM = JetBrains_Mono({
  weight: "400"
})

export default function Home() {
  const links = [
    {name: "Mapa", href: "/mapa"},
    {name: "Login", href: "/login"}
    // {name: "Caminhões", href: "/caminhao"}
  ]
  const drops = [
    {name: "Caminhões", ways: [{name: "Lista", href: "/caminhao"}, {name: "Adicionar", href: "/caminhao/add"}, {name: "Rotas", href: "/caminhao/rotas"}]}
  ]

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <Navbar links={links} drops={drops} location={["Início"]} />
      <div className={`relative flex flex-col items-center h-full w-full bg-zinc-50 font-sans dark:bg-black`}>
        <div className={`${styles.backgroundimg} absolute h-full overflow-hidden w-full`}/>
        <h1 className={`${JBM.className} text-[8rem]`}>Colint</h1>
        <h2 className={`${JBM.className} text-[2rem]`}>Coleta Inteligente</h2>
      </div>
    </div>
  );
}
