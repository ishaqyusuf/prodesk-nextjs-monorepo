import { unstable_cache } from "next/cache";

export const getNotes = async () => {
    return unstable_cache(async () => {}, ["notes"], {
        tags: ["notes_${}"],
        revalidate: 3600,
    });
};
