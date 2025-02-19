"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { deepCopy } from "../deep-copy";
import { registerPageAnayltic } from "./action";

export default function PageAnalytics() {
    const path = usePathname();
    const searchParams = useSearchParams();
    const [history, setHistory] = useState<
        {
            path;
            searchParams;
        }[]
    >([]);
    useEffect(() => {
        const _history = deepCopy(history);
        // console.log(history.length);
        const data = _history.pop();
        const last = _history.pop();
        if (!data) {
            // console.log("no data", {
            //     data,
            //     last,
            // });
            return;
        }
        const same = data?.path == last?.path;
        const sameRoot =
            (data?.searchParams == "" && last?.searchParams == "page=1") ||
            (data?.searchParams == "page=1" && last?.searchParams == "") ||
            data?.searchParams == last?.searchParams;
        // console.log({
        //     same,
        //     sameRoot,
        //     data,
        //     last,
        // });

        if (!last || data?.path != last.path || (same && !sameRoot)) {
            // console.log("PASSED", data);
            (async () => {
                await registerPageAnayltic(data.path, data.searchParams);
            })();
        }
    }, [history]);
    useEffect(() => {
        setHistory((c) => {
            return [
                ...c,
                {
                    path,
                    searchParams: searchParams.toString(),
                },
            ];
        });
    }, [searchParams, path]);
    // useEffect(() => {
    //     console.log(path);
    // }, [path]);
    // useEffect(() => {
    //     const handleRouteChange = (url) => {
    //         // Perform your analytics tracking or actions here
    //         console.log("App is changing to: ", url);
    //         // For example, send a pageview to your analytics service
    //         // window.analytics.page(url);
    //     };

    //     // Subscribe to route changes
    //     router.events.on("routeChangeComplete", handleRouteChange);

    //     // Cleanup subscription on unmount
    //     return () => {
    //         router.events.off("routeChangeComplete", handleRouteChange);
    //     };
    // }, [router.events]);
    return <></>;
}
