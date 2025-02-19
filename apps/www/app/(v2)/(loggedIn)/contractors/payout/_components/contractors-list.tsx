"use client";

import useEffectLoader from "@/lib/use-effect-loader";
import { getContractorsPayroll } from "../action";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContractorsList({}) {
    const data = useEffectLoader(getContractorsPayroll);
    return (
        <div className="">
            <div className="">
                <ScrollArea className="h-screen f">
                    <div className="flex flex-col">
                        {data.data?.map((c) => (
                            <Button
                                variant="ghost"
                                asChild
                                disabled
                                className="flex-1"
                                key={c.id}
                            >
                                <Link href={`/contractors/payout/${c.id}`}>
                                    <span className="">{c.name}</span>
                                </Link>
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
