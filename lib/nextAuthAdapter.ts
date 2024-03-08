import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions, RequestInternal, SessionOptions } from "next-auth";
import { authorizeWithPassword, createWithPassword, getUserByEmail, getUserByAccount as getAccount, read as getUser, update, remove, link, unLink } from "@/crud/user";
import prisma from "@/lib/prisma";
import { PrismaClient, Role } from "@prisma/client";
import { Adapter, AdapterAccount, AdapterSession, AdapterUser } from "next-auth/adapters";
import { CreateUserDTO, DisplayUserDTO } from "@/crud/DTOs";
import { create as createSession, getSessionBytoken, read as getSession, update as updateSessionWithId } from "@/crud/sessions"
import { HttpError } from "./utils";
import Github from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
    //adapter: MyAdapter(prisma),
    providers: [
        Credentials({
            name: "credentials",
            type: 'credentials',
            credentials: {
                username: { label: "Email", type: "text", placeholder: "jsmith@email.com" },
                password: { label: "Password", type: "password" }
            },
            authorize,

        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true


        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true

        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
    ],
    pages: {
        signIn: '/auth/signin',

    },

    session: {
        strategy: "jwt",

    },

    useSecureCookies: process.env.NODE_ENV ==='production',
    callbacks: {
        jwt: async ({ token, user, session, trigger }) => {
            user && (token.user = user)
            if (trigger === "update" && session?.name) {
                // Note, that `session` can be any arbitrary object, remember to validate it!
                token.name = session.name
                //token.user = user
            }
            return token
        },

        session: async ({ session, token }) => {
            
            token && token.user && (session.user = token.user)

            //console.log("session callback",session, token);
            return session
        },
        redirect:async ({url, baseUrl}) => {
            return url || baseUrl
            
        }



    },
    adapter: MyAdapter(prisma)
};



async function authorize(credentials: Record<"password" | "username", string> | undefined, req: Pick<RequestInternal, "query" | "body" | "headers" | "method">) {
    try {
        const user = await authorizeWithPassword({ email: credentials?.username!, password: credentials?.password! }, prisma)
        if (user) {
            return user
        }
        else return null
        // console.log(user);
    } catch (error) {
        console.log(error);
        return null

    }
    // If no error and we have user data, return it

}

export default function MyAdapter(client: PrismaClient, options = {}): Adapter {
    return {
        async createUser(user: Omit<AdapterUser, "id">) {
            //console.log("create users/...");
            const createUser: CreateUserDTO = {
                ...user,
                role: Role.USER,
                image: {
                    src: user.image as string
                }
            }
            const newUser = await createWithPassword(createUser, client);
            return newUser as AdapterUser
        },
        async getUser(id: string) {
            //console.log("find user...");
            try {

                const user = await getUser(id, client);
                return user as CreateUserDTO & AdapterUser

            } catch (error) {

                return null
            }

        },
        async getUserByEmail(email: string) {
            try {
                const user = await getUserByEmail(email, client);
                return user
            } catch (error) {
                return null

            }
        },
        async getUserByAccount({ providerAccountId, provider }: { providerAccountId: string, provider: string }) {
            const account = await getAccount({ providerAccountId, provider }, prisma)
           // console.log("get  Account/...", account);
            if (!account) return null;
            return account as AdapterUser
        },
        async updateUser(user) {
            const updatedUser = await update(user.id, user as CreateUserDTO, client)
            return updatedUser
        },
        async deleteUser(userId: string) {
            const deleted = await remove(userId, client);
            return
        },
        async linkAccount(account: AdapterAccount) {
            // console.log("Link  Account/...", account);

            const linkedAccount = await link(account, client)
            return linkedAccount as AdapterAccount
        },
        async unlinkAccount({ providerAccountId, provider }) {
            const unLinked = await unLink({ provider, providerAccountId }, client)
            return unLinked as AdapterAccount
        },
        async createSession({ sessionToken, userId, expires }) {
            // console.log("create session  Token/...");
            const session = await createSession({ sessionToken, userId, expires }, client)
            // console.log(session)
            return session as AdapterSession
        },
        async getSessionAndUser(sessionToken) {
            try {
                const session = (await getSessionBytoken(sessionToken, client))
                // console.log("Get sessiosn .....", session)

                return { session: session as AdapterSession, user: session?.user as  AdapterUser }

            } catch (error) {
                const { message } = error as HttpError;
                console.log(message);
            }

            return null
        },
        async updateSession({ sessionToken }) {
            // console.log("update sesssion called");

            const session = await updateSessionWithId(sessionToken, client)
            return session
        },
        async deleteSession(sessionToken) {
            return
        },
        // async createVerificationToken({ identifier, expires }) {
        //     const token = await createVerifyToken({ identifier, expires }, client)
        //     return token
        // },
        // async useVerificationToken({ identifier, token }) {
        //     const usedToken = await useToken({ identifier, token }, client);
        //     return usedToken as VerificationToken
        // },
    }
}