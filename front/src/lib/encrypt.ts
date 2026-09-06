import { hash, verify, HashOptions } from "argon2";

const options: HashOptions = {
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
}

export async function hashPassword(password: string): Promise<string> {
    return await hash(password, options);
}

export async function verifyPassword(password: string, hashString: string): Promise<boolean> {
    try{
        return await verify(hashString, password)
    } catch (error) {
        console.log(error)
        return false
    }
}