"use client";

import useSalesPdf from "@/app/(v2)/printer/sales/use-sales-pdf";
import { Button } from "@/components/ui/button";
// import { useDebounce } from "@/hooks/use-debounce";
import { useDebounce } from "use-debounce";
import { generateRandomString } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function SalesDownload({ id, mode }) {
    const pdf = useSalesPdf();
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 800);
    useEffect(() => {
        setQuery(generateRandomString());
    }, []);
    useEffect(() => {
        pdf.print({
            slugs: id,
            mode: mode as any,
            pdf: true,
        });
    }, [debouncedQuery]);
    async function download() {
        pdf.print({
            slugs: id,
            mode: mode as any,
            pdf: true,
        });
    }
    return (
        <>
            <Button onClick={download}>Download</Button>
        </>
    );
}
