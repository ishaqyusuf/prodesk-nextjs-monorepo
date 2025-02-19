"use client";
import { Icons } from "@/components/_v1/icons";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DealerHeader() {
    const user = useSession();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container flex min-h-16 py-2 items-center">
                <div className="hidden gap-6 lg:flex">
                    <Link href="/" className="">
                        <div className="hidden items-center space-x-2 lg:flex">
                            <Icons.logoLg width={160} />
                            <span className="hidden font-bold lg:inline-block">
                                {/* {siteConfig.name} */}
                            </span>
                            <span className="sr-only">Home</span>
                        </div>
                    </Link>
                    <div className=""></div>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link legacyBehavior passHref href="/quotes">
                                    <NavigationMenuLink
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "h-auto"
                                        )}
                                    >
                                        Quotes
                                    </NavigationMenuLink>
                                </Link>
                                <Link legacyBehavior passHref href="/orders">
                                    <NavigationMenuLink
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "h-auto"
                                        )}
                                    >
                                        Orders
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </header>
    );
}
