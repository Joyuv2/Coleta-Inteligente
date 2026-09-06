"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SideBar from "@/components/Sidebar"; 
import Button from "@/components/Button";
import Link from "next/link";
import clsx from "clsx";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const {data: session, status} = useSession()
    const router = useRouter()
  
  const buttons = [
    {text: "Inicio", href: "/"},
    {text: "Lista", href: "/caminhao"}, 
    {text: "Adicionar", href: "/caminhao/add"},
    {text: "Rotas", href: "/caminhao/rotas", state: "yes"},
  ]

  useEffect(() => {
        if(status === "unauthenticated") {
            router.push("/login")
        } 
  }, [status])

  return (
    <div className="h-screen w-screen flex flex-row items-center">
      <SideBar>
        {
        buttons.map((el, ind) => (
            <Link href={el.href} key={ind} 
            className={
              clsx({
                'cursor-not-allowed': el.state === "no",
              })}
            >
                <Button>
                    {el.text}
                </Button>
            </Link>
        ))
        }
      </SideBar>
      <main className="min-h-full w-full">{children}</main>
    </div>
  );
}