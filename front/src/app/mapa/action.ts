"use server"

import { getRoutes } from "@/lib/db"

export default async function getRoutesList() {
    const routes = await getRoutes() 
    return routes
}