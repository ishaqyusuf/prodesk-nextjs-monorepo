import { db, Prisma as BasePrisma } from "@gnd/db";

export const prisma = db;
export const Prisma = BasePrisma;
