"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { nav } from "@/lib/navs";

export default function AccountLayout({ children }: any) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });

    if (!session?.user) return <></>;
    // if (session.role?.name == "Dealer") redirect("/orders");
    let sb = nav(session);
    if (!sb) return;
    return <>{children}</>;
}
