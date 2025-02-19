"use server";

import { prisma } from "@/db";
import { nextId } from "@/lib/nextId";
import { revalidatePath } from "next/cache";

export async function realtimeMdx(type, slug, content) {
    if (!slug) return null;
    const d = await prisma.posts.findFirst({
        where: {
            slug,
            type,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    if (!d) return content;
    return d.content;
}
export async function saveRealtimeMdx(type, slug, content) {
    const d = await prisma.posts.create({
        data: {
            // id: await nextId(prisma.blogs),
            slug,
            type,
            content,
            createdAt: new Date(),
        },
    });
    revalidatePath("/shop-admin/blogs/edit/[...slug]");
}
export async function deleteRealtimeMdx(slug) {
    await prisma.posts.deleteMany({
        where: {
            slug,
        },
    });
}
