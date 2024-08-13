declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}
export type TableType =
  | "blogs"
  | "services"
  | "softwares"
  | "casestudies"
  | "users"
  | "products"
  | "prompts"
  | "events"
  | "discounts"
  | "referrals";
export type OrderTableBy =
  | "updatedAt"
  | "title"
  | "name"
  | "email"
  | "prefix"
  | "click"
  | "expires"
  | "value"
  | "profitMargin"
  | "timesUsed"
  | "price"
  | "date"
  | "publishDate"
  | "inventory"
  | "status"
  | "pricing"
  ;
export type OrderTable = "desc" | "asc";


export type CategoryType = "product" | "prompt" | "blog" | "service" | "software"

import { Account, Organization, Role } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** Oauth access token */
            role?: Role;
            id?: string;
            orgId?: string;
            organizations? : Organization[]


        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id?: string;
        role?: Role;
        orgId?: string;
        organizations? : Organization[]

    }
}


