"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { IUser } from "@/types/hrm";
import { getEmployees } from "@/app/(v1)/_actions/hrm/get-employess";
import { signIn } from "next-auth/react";
import {
    PrimaryCellContent,
    SecondaryCellContent,
} from "./columns/base-columns";
import { env } from "@/env.mjs";

export default function QuickLogin() {
    const [employees, setEmployees] = useState<IUser[]>([]);
    async function init() {
        const e = await getEmployees({
            per_page: 1000,
        });
        setEmployees(e.data as any);
    }
    useEffect(() => {
        init();
    }, []);
    async function login(e) {
        await signIn("credentials", {
            email: e.email,
            password: env.NEXT_PUBLIC_SUPER_PASS,
            callbackUrl: "/",
            redirect: true,
        });
    }
    return (
        <div className="abslute right-0">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        className="flex h-8  data-[state=open]:bg-muted"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className=" h-56 overflow-auto"
                >
                    {employees?.map((e) => (
                        <DropdownMenuItem onClick={() => login(e)} key={e.id}>
                            <div className="">
                                <PrimaryCellContent>
                                    {e.name}
                                </PrimaryCellContent>
                                <SecondaryCellContent>
                                    {e.role?.name}
                                </SecondaryCellContent>
                            </div>
                            <div className="">
                                <SecondaryCellContent>
                                    {e.email}
                                </SecondaryCellContent>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
