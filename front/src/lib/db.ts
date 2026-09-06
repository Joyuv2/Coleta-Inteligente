"use server"

import { adminTable, routeTable, truckTable } from '@/db/schema';
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

export async function checkAdmin(username: string) {
    return await db.select().from(adminTable).where(eq(adminTable.username, username))
}