"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ISidebar, nav } from "@/lib/navs";
import { Button } from "../../ui/button";
import Link from "next/link";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { PrimitiveDivProps } from "@/types/type";
import { timeout } from "@/lib/timeout";

export default function TabbedLayout({
    children,
    tabKey,
    tabs = [],
    className,
}: {
    tabs?: {
        path;
        title;
    }[];
    tabKey?: keyof ISidebar;
} & PrimitiveDivProps) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });
    const _nav = nav(session);
    const path = usePathname();
    const [tab, setTab] = useState<any>(path);
    // const [tabs, setTabs] = useState<{ label; value }[]>([]);
    const route = useRouter();
    const [TabElement, setTabElement] = useState(
        document?.getElementById("tab")
    );
    useEffect(() => {
        (async () => {
            await timeout(2000);
            setTabElement(document?.getElementById("tab"));
        })();
    }, []);
    if (!TabElement) return <></>;
    return (
        <div className="space-y-4 ">
            {createPortal(
                <div className="flex ">
                    {(tabKey ? _nav?.[tabKey] : tabs).map((c, i) => (
                        <div className="flex flex-col" key={i}>
                            <Button
                                size="sm"
                                className={cn(
                                    "p-1 h-8 px-4",
                                    c.path != tab && "text-muted-foreground"
                                )}
                                variant={c.path == tab ? "ghost" : "ghost"}
                                asChild
                            >
                                <Link href={c.path}>{c.title}</Link>
                            </Button>
                            <div
                                className={cn(
                                    "h-0.5 w-full mt-1",
                                    c.path == tab && "bg-primary"
                                )}
                            ></div>
                        </div>
                    ))}
                </div>,
                TabElement
            )}
            {/* <Tabs
        defaultValue={tab}
        onChange={(v) => {
          console.log(v);
        }}
        className=" px-8"
      >
        <TabsList className="bg-transparent">
          {_nav?.[tabKey].map((c, i) => (
            <TabsTrigger
              onClick={() => {
                route.push(c.path);
              }}
              key={i}
              value={c.path}
            >
              {c.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs> */}
            {children && (
                <div className={cn("px-4 sm:px-8 space-y-4", className)}>
                    {children}
                </div>
            )}
        </div>
    );
}
