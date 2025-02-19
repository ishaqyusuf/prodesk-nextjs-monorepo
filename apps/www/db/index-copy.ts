import { PrismaClient } from "@prisma/client";
// import { Pool } from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { env } from "@/env.mjs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
// const connectionString = `${env.POSTGRESS_URL}`;

// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["error", "warn"]
                : ["error"],
    }).$extends({
        query: {
            $allModels: {
                // async $allOperations({args,operation})
                // {
                // },
                async findFirst({ model, operation, args, query }) {
                    if (!args) args = { where: {} };
                    if (!args.where) args.where = {};

                    if (!Object.keys(args.where).includes("deletedAt"))
                        args.where = { deletedAt: null, ...args.where };
                    // args.where = {};
                    // console.log(args.where);
                    return query(args);
                },
                async findMany({ model, operation, args, query }) {
                    if (!args) args = { where: {} };
                    if (!args.where) args.where = {};

                    if (!Object.keys(args.where).includes("deletedAt"))
                        args.where = { deletedAt: null, ...args.where };
                    // args.where.deletedAt = null;

                    // args.where = {};
                    // console.log(args.where);
                    return query(args);
                },
            },
        },
    });
// const softDelete = Prisma.defineExtension({
//     name: 'softdelete',
//     model: {
//        salesOrders: {
//         delete: async function (pk, query) {
//         //    return this.update({
//         //     where: {
//         //          id: pk
//         //       },
//         //       data
//         //     }
//        }
//     }
// })
// prisma.$extends(softDelete)

if (process.env.NODE_ENV !== "production")
    (globalForPrisma as any).prisma = prisma;
