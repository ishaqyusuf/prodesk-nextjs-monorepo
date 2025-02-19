"use client";

import { AlertTriangle, Archive, Bell, Dot } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import React, { useEffect, useState, useTransition } from "react";
import { Badge } from "../ui/badge";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import {
    INotification,
    archiveAction,
    getNotificationCountAction,
    loadNotificationsAction,
    markAsReadAction,
} from "@/app/(v1)/_actions/notifications";
import { ToolTip } from "./tool-tip";
import Link from "next/link";
import dayjs from "@/lib/dayjs";
import Btn from "./btn";
import { useAppSelector } from "@/store";
import { dispatchSlice } from "@/store/slicers";
import { deepCopy } from "@/lib/deep-copy";
import { ScrollArea } from "../ui/scroll-area";
import LinkableNode from "./link-node";

export default function NotificationComponent({}) {
    const [notificationCount, setNotificationCount] = useState(0);
    const notifications = useAppSelector(
        (state) => state.slicers?.notifications
    );

    useEffect(() => {
        // Fetch notification count from the server
        const fetchNotificationCount = async () => {
            const count = await getNotificationCountAction();
            setNotificationCount(count as any);
        };
        fetchNotificationCount();
        const intervalId = setInterval(fetchNotificationCount, 1000 * 60 * 30);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (open) loadNotifications();
    }, [open]);
    async function loadNotifications() {
        const list = await loadNotificationsAction();
        const items = list.map((item) => {
            const { archivedAt, createdAt, updatedAt, ..._item } = item;
            _item.time = dayjs(createdAt).fromNow();
            _item.archived = archivedAt != null;
            if (_item.alert && !_item.deliveredAt) {
                if (typeof window !== "undefined" && "Notification" in window) {
                    Notification.requestPermission().then(() => {
                        if (Notification.permission === "granted") {
                            new Notification(_item.message, {
                                body: `${item.message}`,
                                // icon: "/icons/notification-icon.png", // Optional: Add an icon
                            });
                        }
                    });
                }
            }
            return _item;
        });

        dispatchSlice("notifications", items);
    }
    return (
        <div>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-label="Notification"
                        variant="outline"
                        size="sm"
                        className={cn(
                            "rounded-full relative h-auto  space-x-2",
                            notificationCount > 0 ? "p-1" : "p-1"
                        )}
                    >
                        <Bell className="size-4 text-muted-foreground" />
                        {notificationCount > 0 && (
                            <Badge
                                variant="default"
                                className="p-0.5 leading-none px-1"
                            >
                                {notificationCount}
                            </Badge>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-[400px] bg-white relative shadow-xl rounded-lg z-[999]"
                >
                    <Tabs defaultValue="inbox" className="">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="inbox">Inbox</TabsTrigger>
                            <TabsTrigger value="archive">Archive</TabsTrigger>
                        </TabsList>
                        <TabsContent value="inbox">
                            <NotificationList type="inbox" setOpen={setOpen} />
                            <div className="flex border-t justify-center items-center p-2">
                                <Button variant="ghost">Archive All</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="archive">
                            <NotificationList
                                setOpen={setOpen}
                                type="archive"
                            />
                        </TabsContent>
                    </Tabs>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
function NotificationList({
    type,
    setOpen,
}: {
    type: "inbox" | "archive";
    setOpen;
}) {
    const notifications = useAppSelector(
        (state) => state.slicers.notifications
    );

    return (
        <ScrollArea className="  -mt-2 min-h-[400px] h-[350px] ">
            <div className="divide-y">
                {
                    // Array(30)
                    //   .fill(null)
                    //   .map((a) => notifications?.[0] as any)
                    //   .filter(Boolean)
                    notifications?.map((item, index) => (
                        <NotificationItem
                            type={type}
                            onClick={() => {
                                setOpen(false);
                            }}
                            key={index}
                            index={index}
                            item={item}
                        />
                    ))
                }
            </div>
        </ScrollArea>
    );
}
function NotificationItem({
    item,
    index,
    type,
    onClick,
}: {
    item: INotification;
    index;
    onClick;
    type;
}) {
    const visible = type == "inbox" ? !item.archived : item.archived;
    const notifications = useAppSelector(
        (state) => state.slicers.notifications
    );
    const [archiving, startTransition] = useTransition();
    if (!visible) return null;
    function archive() {
        startTransition(async () => {
            await archiveAction(item.id, item.seenAt);
            let len = notifications.length;
            if (!item.seenAt)
                dispatchSlice("notifications", [
                    ...notifications.slice(0, len - index),
                    {
                        ...deepCopy(item),
                        archived: true,
                    },
                    ...notifications.slice(index + 1),
                ]);
        });
    }
    return (
        <div className="relative group" key={item.id}>
            <Button variant="ghost" className="border-b w-full h-full p-4 py-3">
                <LinkableNode
                    href={item.link
                        ?.replace("/hrm/jobs", "/contractor/jobs")
                        ?.replace("/jobs", "/contractor/jobs")}
                    onClick={async () => {
                        if (!item.seenAt) await markAsReadAction(item.id);
                        onClick();
                    }}
                    className="mr-10 flex w-full items-center justify-start text-start"
                >
                    <div className="">
                        <div className=" rounded-full border p-1.5 bg-amber-50">
                            <AlertTriangle className="text-amber-500 h-5 w-5" />
                        </div>
                    </div>
                    <div className="ml-4 space-y-1 ">
                        <p
                            className={cn(
                                "text-sm  leading-snug",
                                !item.seenAt ? "font-medium" : "font-normal"
                            )}
                        >
                            {item.message}
                        </p>
                        <p className="text-sm leading-none text-muted-foreground">
                            {item.time}
                        </p>
                    </div>
                </LinkableNode>
            </Button>
            {type == "inbox" && (
                <div className="ml-auto absolute right-0 top-0 m-4 font-medium flex flex-col items-end">
                    <div className="group-hover:block hidden">
                        <ToolTip info="Archive">
                            <Btn
                                isLoading={archiving}
                                onClick={archive}
                                variant="secondary"
                                size="icon"
                            >
                                <Archive className="size-4" />
                            </Btn>
                        </ToolTip>
                    </div>
                    {!item.seenAt && (
                        <Dot className="w-10 h-10 text-blue-700" />
                    )}
                </div>
            )}
        </div>
    );
}
