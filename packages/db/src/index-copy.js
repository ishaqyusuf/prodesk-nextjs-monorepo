// export * from "drizzle-orm/sql";
// export { alias } from "drizzle-orm/pg-core";
/* eslint-disable no-restricted-properties */
// Solution for prisma edge: @link https://github.com/prisma/prisma/issues/22050#issuecomment-1821208388
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";
// Learn more about instantiating PrismaClient in Next.js here: https://www.prisma.io/docs/data-platform/accelerate/getting-started
const prismaClientSingleton = () => {
    return new PrismaClient({
        log: process.env.NODE_ENV === "development"
            ? [
                // "query",
                "error",
                "warn",
            ]
            : ["error"],
    });
};
const globalForPrisma = globalThis;
export const db = globalForPrisma.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = db;
