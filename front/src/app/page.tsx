import Image from "next/image";
import SideBar from "@/components/Sidebar";
import Link from "next/link";
import Button from "@/components/Button";

export default function Home() {
  const buttons = [
    {text: "Mapa", href: "/mapa"},
    {text: "Caminhões", href: "/caminhao"}
  ]
  return (
    <div className="h-screen w-screen flex flex-row items-center">
    <SideBar>
        {
        buttons.map((el, ind) => (
            <Link href={el.href} key={ind}>
                <Button>
                    {el.text}
                </Button>
            </Link>
        ))
        }
      </SideBar>
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      </div>
    </div>
  );
}
