import { prefix, province } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"
 
declare module "next-auth" {
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  interface Session {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    supabaseAccessToken?: string
    user: {
      prefix: prefix,
      age: number,
      telphone: string,
      province: province,
      role: string
    } & DefaultSession["user"]
  }
}