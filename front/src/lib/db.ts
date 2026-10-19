"use server"

import { routeTable, routeTruckTable, truckTable, userTable } from '@/db/schema';
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise"

const poolConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "colint",
  password: process.env.SENHA!
});

const db = drizzle({ client: poolConnection });


export async function addTruck(plate: FormDataEntryValue) {
    try {
        plate = plate.toString()
        await db.insert(truckTable).values({plate: plate})
        return {message: "success"}
    } catch (error) {
        return {message: "error while trying to insert item"}
    }
}

export async function getTrucks() {
    return await db.select().from(truckTable)
}

export async function updateTruck(id: number, plate: string) {
    try {
        await db.update(truckTable).set({plate: plate}).where(eq(truckTable.id, id))
    } catch (error) {
        return {message: "error trying to update item"}
    }
}

export async function deleteTruck(id: number) {
    try {
        await db.delete(truckTable).where(eq(truckTable.id, id))
    } catch (error) {
        return {message: "error trying to delete item"}
    }
}

export async function addRoute(points: [number,number][]) {
    try {
        const pointsStr = JSON.stringify(points)
        await db.insert(routeTable).values({points: pointsStr})
    } catch (error) {
        return {message: "error while trying to insert item"}
    }
}

export async function getRoutes() {
    return await db.select().from(routeTable)
}

export async function updateRoute(id: number, points: [number,number][]) {
    try {
        const pointsStr = JSON.stringify(points)
        await db.update(routeTable).set({points: pointsStr}).where(eq(routeTable.id, id))
    } catch (error) {
        return {message: "error trying to update item"}
    }
}

export async function deleteRoute(id: number) {
    try {
        await db.delete(routeTable).where(eq(routeTable.id, id))
    } catch (error) {
        return {message: "error trying to delete item"}
    }
}

export async function getTruck(id: number) {
    return await db.select().from(truckTable).where(eq(truckTable.id, id))
}

export async function getRoute(id: number) {
    return await db.select().from(routeTable).where(eq(routeTable.id, id))
}

export async function checkUser(username: string) {
    return await db.select().from(userTable).where(eq(userTable.username, username))
}

export async function registerUser(username: string, passwordHash: string) {
    return await db.insert(userTable).values({username: username, password_hash: passwordHash, flags: "[]"})
}

export async function getUsers() {
    return await db.select().from(userTable)
}

export async function giveUserFlag(username: string, flag: string) {
    const user = await db.select().from(userTable).where(eq(userTable.username, username))
    if (user.length === 0) {
        return {message: "User not found"}
    }
    const userFlags = JSON.parse(user[0].flags!) as string[]
    if (!userFlags.includes(flag)) {
        userFlags.push(flag)
        await db.update(userTable).set({flags: JSON.stringify(userFlags)}).where(eq(userTable.username, username))
    }
    return {message: "success"}
}

export async function removeUserFlag(username: string, flag: string) {
    const user = await db.select().from(userTable).where(eq(userTable.username, username))
    if (user.length === 0) {
        return {message: "User not found"}
    }
    const userFlags = JSON.parse(user[0].flags!) as string[]
    if (userFlags.includes(flag)) {
        const updatedFlags = userFlags.filter(f => f !== flag)
        await db.update(userTable).set({flags: JSON.stringify(updatedFlags)}).where(eq(userTable.username, username))
    }
    return {message: "success"}
}

export async function addRouteTruck(routeId: number, truckId: number) {
    try {
        const pointStr = await getRoute(routeId).then(route => {
            if (route.length === 0) {
                throw new Error("Route not found")
            } else {
                const points = JSON.parse(route[0].points!) as [number, number][]
                return JSON.stringify(points[0])
            }
        })
        await db.insert(routeTruckTable).values({route_id: routeId, truck_id: truckId, point: pointStr, previous_points: pointStr})
    } catch (error) {
        return {message: "error while trying to insert item"}
    }
}

export async function updateRouteTruck(routeTruckId: number, point: [number, number]) {
    try {
        const routeTruck = await db.select().from(routeTruckTable).where(eq(routeTruckTable.id, routeTruckId))
        if (routeTruck.length === 0) {
            return {message: "RouteTruck not found"}
        }
        const previous_points = JSON.parse(routeTruck[0].previous_points ?? "[]") as [number, number][]
        const points = [...previous_points, point]
        await db.update(routeTruckTable)
        .set({point: JSON.stringify(point), previous_points: JSON.stringify(points)})
        .where(eq(routeTruckTable.id, routeTruckId))
    } catch (error) {
        return {message: "error while trying to update item"}
    }
}

export async function deleteRouteTruck(routeTruckId: number) {
    try {
        await db.delete(routeTruckTable).where(eq(routeTruckTable.id, routeTruckId))
    } catch (error) {
        return {message: "error while trying to delete item"}
    }
}

export async function getRouteTruckById(routeTruckId: number) {
    return await db.select().from(routeTruckTable).where(eq(routeTruckTable.id, routeTruckId))
}

export async function getRouteTrucks(){
    return await db.select().from(routeTruckTable)
}