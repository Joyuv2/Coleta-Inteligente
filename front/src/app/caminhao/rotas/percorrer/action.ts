import { getRouteTruckById, getRouteTrucks } from "@/lib/db"

export async function getRuns() {
    return await getRouteTrucks()
}

export async function getRun(id: number) {
    return await getRouteTruckById(id)
}