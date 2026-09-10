"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SideBar from "@/components/Navbar"; 
import Button from "@/components/Button";
import Link from "next/link";
import clsx from "clsx";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

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
    <div className="h-full w-screen flex flex-col items-center">
      <main className="w-full">{children}</main>
    </div>
  );
}