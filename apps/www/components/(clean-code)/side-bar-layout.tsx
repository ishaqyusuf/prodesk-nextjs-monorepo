"use client";
import React from "react";
import { Sidebar } from "./nav/sidebar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useSidebarToggle } from "@/app/(clean-code)/(sales)/_common/hooks/use-sidebar-toggle";
import { useStore } from "@/app/(clean-code)/(sales)/_common/hooks/use-store";

export default function SidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sidebar = useStore(useSidebarToggle, (state) => state);
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });
    if (!session?.user) return <></>;
    if (!sidebar) return null;

    return (
        <>
            <Sidebar />
            {/* min-h-[calc(100vh_-_56px)] with footer */}
            <main
                className={cn(
                    "min-h-[calc(100vh)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                {children}
            </main>
        </>
    );
}
