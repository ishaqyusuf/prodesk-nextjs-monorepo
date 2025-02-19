import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Prisma, PrismaClient, Roles, Users } from "@gnd/db";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ICan } from "@/types/auth";
import { loginAction } from "@/app/(v1)/_actions/auth";

const prisma = new PrismaClient();
declare module "next-auth" {
    interface User {
        user: Users;
        can: ICan;
        role: Roles;
    }

    interface Session extends DefaultSession {
        // user: {
        user: Users;
        can: ICan;
        role: Roles;
    }
}
declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        user: Users;
        can: ICan;
        role: Roles;
    }
}
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        error: "/login?error=login+failed",
    },
    jwt: {
        secret: "super-secret",
        maxAge: 15 * 24 * 30 * 60,
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    callbacks: {
        jwt: async ({ token, user: cred }) => {
            // console.log("CRED");
            // console.log(token?.jti);
            // console.log(cred)
            if (cred) {
                const { role, can, user } = cred;
                token.user = user;
                token.can = can;
                token.role = role;
            }
            return token;
        },
        session({ session, user, token }) {
            // console.log("Session");
            if (session.user) {
                session.user = token.user;
                session.role = token.role;
                session.can = token.can;
            }
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                const login = await loginAction(credentials);
                return login;
            },
        }),
    ],
};
