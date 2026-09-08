import Navbar from "@/components/Navbar";

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
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      </div>
    </div>
  );
}
