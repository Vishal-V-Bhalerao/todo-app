import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";

export default async function register(request: NextApiRequest, response: NextApiResponse){
    if(request.method ==="POST"){
        const userInfo : any = request?.body
        db.user.create({
            data:{
                email: userInfo?.email,
                password: await hashPassword(userInfo?.password),
                firstName: userInfo?.firstName,
                lastName: userInfo?.lastName
            }
        })
        const token = await createJWT(userInfo)
        if(process.env.JWT_COOKIE_NAME) {
            response.setHeader('Set-Cookie', serialize(process.env.JWT_COOKIE_NAME || '', token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            }))
        }
        response.status(201)
        response.json({})
    }
} 