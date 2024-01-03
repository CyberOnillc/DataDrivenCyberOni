import { PrismaClient } from "@prisma/client";
import { CreateAddressDTO, createCredentialsDTO } from "./DTOs";
import { authorizeWithPassword } from "./user";
import { HttpError } from "@/lib/utils";
import { sign } from "jsonwebtoken";


export async function create(credentials: createCredentialsDTO, prisma: PrismaClient) {
    const user = await authorizeWithPassword(credentials, prisma);
    if (!user) HttpError(401, "Invalid credentials, try reseting your password")
    if (user) {

        const credentials = prisma.apiCredential;
        const accessToken = sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.NEXTAUTH_SECRET as string, {
            expiresIn: "90d"
        })

        const refreshToken = sign({
            token: accessToken
        }, process.env.NEXTAUTH_SECRET as string, {
            expiresIn: '365d'
        })

        const apiCredentials = await credentials.create({
            data: {
                refreshToken: refreshToken,
                token: accessToken,
                user: {
                    connect: {
                        id: user.id
                    }
                },
                refreshTokenExpiry: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
                tokenExpiry: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 90)
            }
        })

        return apiCredentials

    }

}