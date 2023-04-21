import bcrypt from 'bcrypt'
import { SignJWT, jwtVerify } from "jose"
import { db } from './db'
export const hashPassword = (password: string) => (bcrypt.hash(password, 10))

export const passwordCompare = (textPassword: string, hashedPassword: string) => (bcrypt.compare(textPassword, hashedPassword))

export const createJWT = (user: {id: string, emailId: string}) => {
    const currentTime = Math.floor( Date.now()/1000)
    const expiryDate = currentTime + 60 * 60 * 24 * 7

    return new SignJWT({
        payload : {
            id: user.id,
            email: user.emailId
        }
    })
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setExpirationTime(expiryDate)
    .setIssuedAt(currentTime)
    .setNotBefore(currentTime)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

export const validateJWT = async (jwt : string) => {
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    )
    return payload.payload as {id: string, emailId: string}
}

export const getUserFromCookies = async (cookies: any) =>{
    try {
        const jwt = cookies?.get(process.env.JWT_COOKIE_NAME)
        const { id } = await validateJWT(jwt.value)

        const user = await db.user.findUnique({
            where: {
                id: id as string
            }
        })
        return user
    } catch (error) {
        console.log(error)
    }

}