"use client";
import { nav } from "@/lib/navs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
export default function AuthPage({}) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });
    // console.log(session)
    useEffect(() => {
        let sb = nav(session);
        console.log(session);
        if (sb) redirect(sb.homeRoute);
        // else signOut();
    }, [session]);
    return <></>;
}
