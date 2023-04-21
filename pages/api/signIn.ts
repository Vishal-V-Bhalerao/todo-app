import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword, passwordCompare } from "@/lib/auth";
import { serialize } from "cookie";

export default async function signIn(request: NextApiRequest, response: NextApiResponse) {
    if(request.method === 'POST'){
        const userInfo : any = request?.body

        const userDbData = await db.user.findUnique({
            where: {
                email: userInfo?.email
            }
        })
        if(userDbData){
            const isUser = await passwordCompare(userInfo?.password, userDbData?.password)
            const token = await createJWT(userInfo)
            if(isUser && process.env.JWT_COOKIE_NAME){
                    response.setHeader('Set-Cookie', serialize(process.env.JWT_COOKIE_NAME || '', token, {
                        httpOnly: true,
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7
                    }))
                
                response.status(201)
                response.json({})
            }else{
                response.status(403)
                response.json({})
            }
        }
        else{
            response.status(403)
            response.json({})
        }
    }
}