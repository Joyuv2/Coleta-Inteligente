"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
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

  return (
    <div className="h-full w-screen flex flex-col items-center">
      <main className="w-full">{children}</main>
    </div>
  );
}