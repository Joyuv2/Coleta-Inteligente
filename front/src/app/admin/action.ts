import { getUsers, giveUserFlag, removeUserFlag } from "@/lib/db"

export async function getUsersList(){
    return await getUsers()
}

export async function addFlag(username: string, flag: string) {
    return await giveUserFlag(username, flag)
}

export async function removeFlag(username: string, flag: string) {
    return await removeUserFlag(username, flag)
}