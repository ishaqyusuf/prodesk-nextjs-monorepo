"use client";

import { ServerPromiseType } from "@/types";
import { useEffect, useState } from "react";
import { generateRandomString } from "./utils";

interface Props {
    onSuccess?;
    onError?;
    transform?;
}
export default function useEffectLoader<T extends (...args: any) => any>(
    fn: T,
    {}: Props = {}
) {
    type DataType = Awaited<NonNullable<ReturnType<T>>>;
    const [data, setData] = useState<DataType>();
    const [ready, setReady] = useState(false);
    const [refreshToken, setRefreshToken] = useState(null);
    useEffect(() => {
        load();
    }, []);
    async function load(r = false) {
        if (!fn) return;
        const res = await fn();

        (fn as any)()?.then((res) => {
            setData(res);
            setReady(true);
            if (r) setRefreshToken(generateRandomString());
        });
    }
    return {
        data,
        ready,
        refresh: async () => await load(true),
        refreshToken,
    };
}
