// server
import { prisma } from "@/utils/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword:{
        enabled:true
    },
    session:{
        cookieCache:{
            enabled:true,
            maxAge:60*2 
        }
    },
    plugins:[nextCookies()],
    socialProviders:{
        facebook:{
            clientId: process.env.FACEBOOK_CLIENT_ID as string, 
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string, 
        }
    }
});