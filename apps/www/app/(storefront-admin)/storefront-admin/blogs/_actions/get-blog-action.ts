"use server";

import { prisma } from "@/db";

export default async function getBlogAction(slug) {
    let blog = await prisma.blogs.findUnique({
        where: {
            slug: slug || "-----",
        },
    });
    type BlogType = NonNullable<typeof blog>;
    let data: BlogType = blog || ({ meta: {} } as any);
    return data;
}
