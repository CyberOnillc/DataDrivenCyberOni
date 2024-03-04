import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { DisplayUserDTO } from "./crud/DTOs";
import { JWT } from "next-auth/jwt";
import { Role, User } from "@prisma/client";
import { ApiError } from "next/dist/server/api-utils";
import { verifyAccess } from "./lib/middleware";

export const config = {
  matcher: ['/api/((?!auth|captcha|sitemap|webhooks|stripe).*)'],

}


type sessionUser = {
  id: string;
  email: string;
  role: Role
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';





export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req: NextRequestWithAuth) {
    // console.log("middleware ",req.nextauth.token)
  },
  {
    callbacks: {
      authorized: async ({ token, req }) => {

        // console.log("authorize",token);
        return verifyAccess(token?.user as DisplayUserDTO, req.nextUrl.pathname, req.method as HttpMethod)
      },

    },


  }
)


function isAdmin(token: JWT | null) {
  return (token?.user as DisplayUserDTO).role === "ADMIN"
}

function isSuper(token: JWT | null) {
  return (token?.user as DisplayUserDTO).role === "SUPERUSER"

}

function isUser(token: JWT | null) {
  return (token?.user as DisplayUserDTO).role === "USER"
}

