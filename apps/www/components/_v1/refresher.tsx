"use client";

import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Refresher() {
    const router = useRouter();
    const href = useAppSelector(a => a.slicers.href);
    useEffect(() => {
        if (href) router.push(href);
    }, [router, href]);

    return <></>;
}
