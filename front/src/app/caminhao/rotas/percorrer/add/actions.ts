import { addRouteTruck, getRoutes, getTrucks } from "@/lib/db";

export async function addRun(truck_id: number, route_id: number, points: { lat: number; lng: number }[]) {
    try {
        await addRouteTruck(route_id, truck_id)
    } catch (error) {
        return {message: "error while trying to insert item"}
    }
}

export async function trucksSelect() {
    return await getTrucks()
}

export async function routesSelect() {
    return await getRoutes()
}