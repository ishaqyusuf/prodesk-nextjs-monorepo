"use client";

import { ICan } from "@/types/auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type AuthPermissions = (keyof ICan | (keyof ICan)[])[];
interface Props {
    can?: AuthPermissions;
    // somePermissions?: AuthPermissions;
    roles?: string[];
    permissionType?: "every" | "some" | "none";
    children?;
    className?;
}
export default function AuthGuard({
    can = [],
    className,
    children,
    permissionType = "every",
    roles = [],
}: Props) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });

    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const gn = (v) =>
            Array.isArray(v)
                ? v.some((p) => session?.can?.[p])
                : session?.can?.[v];
        const fn = permissionType == "every" ? can?.every(gn) : can?.some(gn);

        let res = !can?.length ? true : fn;
        if (permissionType == "none") res = !res;
        const permission = !can.length || res;
        const rolePermission =
            !roles.length || roles?.some((r) => r == session?.role?.name);

        const _visible =
            (permission && rolePermission) || session?.role.name == "Admin";
        setVisible(_visible);
        if (!_visible) {
            redirect("/");
        }
    }, []);

    return <div className={cn(className)}>{visible && children}</div>;
}
